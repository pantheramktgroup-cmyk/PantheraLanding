import { useEffect, useRef } from 'react'

/**
 * useGhlLeadCapture
 *
 * Escucha mensajes postMessage provenientes del iframe de GHL (variante B).
 * Valida origen, tipo de mensaje y campos mínimos.
 * Aplica debounce y deduplicación antes de enviar a /api/partial-lead.
 *
 * Solo activo cuando ?variant=B está presente en la URL.
 */

// ─── Orígenes autorizados ────────────────────────────────────────────────────
// El calendario de GHL está servido desde links.iqautomated.io.
// Actualizar si el embed cambia de dominio.
const AUTHORIZED_ORIGINS = [
  'https://links.iqautomated.io',
  // Si GHL usa su propio dominio también:
  // 'https://app.gohighlevel.com',
]

const IS_DEV = import.meta.env.DEV
const DEBOUNCE_MS = 2500

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isOriginAllowed(origin) {
  if (IS_DEV) {
    // En desarrollo aceptamos localhost para poder probar con el script de GHL localmente
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return true
    }
  }
  return AUTHORIZED_ORIGINS.some((o) => origin === o)
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizePayload(data) {
  const phone = typeof data.phone === 'string'
    ? data.phone.trim().replace(/[\s\-().]/g, '')
    : ''
  return {
    fullName: (data.fullName || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    phone,
    instagram: (data.instagram || '').trim().replace(/^@/, ''),
    role: (data.role || '').trim(),
    mainProblem: (data.mainProblem || '').trim(),
    revenue: (data.revenue || '').trim(),
    answers: (typeof data.answers === 'object' && !Array.isArray(data.answers))
      ? data.answers
      : {},
    pageUrl: window.location.href,
    variant: 'B',
    capturedAt: new Date().toISOString(),
  }
}

function fingerprint(payload) {
  // Excluye capturedAt y pageUrl para evitar falsos "cambios"
  return JSON.stringify({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    instagram: payload.instagram,
    role: payload.role,
    mainProblem: payload.mainProblem,
    revenue: payload.revenue,
    answers: payload.answers,
  })
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGhlLeadCapture() {
  const timerRef = useRef(null)
  const lastFingerprintRef = useRef(null)

  useEffect(() => {
    // Solo activo para variante B
    const variant = new URLSearchParams(window.location.search).get('variant')
    if (variant !== 'B') return

    function sendToApi(payload) {
      fetch('/api/partial-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Error silencioso — no interrumpe la experiencia del usuario
      })
    }

    function handleMessage(event) {
      // 1. Validar origen estrictamente
      if (!isOriginAllowed(event.origin)) return

      // 2. Validar tipo de mensaje
      const data = event.data
      if (!data || typeof data !== 'object') return
      if (data.type !== 'ghl-form-progress') return

      // 3. Validar campos mínimos
      const fullName = (data.fullName || '').trim()
      const email = (data.email || '').trim()

      if (fullName.split(/\s+/).filter(Boolean).length < 2) return
      if (!isValidEmail(email)) return

      // 4. Normalizar
      const payload = normalizePayload(data)

      // 5. Deduplicación
      const fp = fingerprint(payload)
      if (fp === lastFingerprintRef.current) return

      // 6. Debounce
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        lastFingerprintRef.current = fp
        sendToApi(payload)
        timerRef.current = null
      }, DEBOUNCE_MS)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])
}

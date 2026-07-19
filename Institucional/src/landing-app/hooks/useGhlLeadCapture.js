import { useEffect, useRef } from 'react'

/**
 * useGhlLeadCapture
 *
 * Escucha mensajes postMessage provenientes del iframe de GHL.
 * Valida origen, tipo de mensaje y campos mínimos.
 * Aplica debounce y deduplicación antes de enviar a /api/partial-lead.
 *
 * Siempre activo — la landing está forzada a variante A.
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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || '').trim()
  )
}

function normalizePhone(value) {
  const raw = String(value || '').trim()
  const hasPlus = raw.startsWith('+')
  const digits = raw.replace(/\D/g, '')

  if (!digits) return ''

  return hasPlus ? `+${digits}` : digits
}

function isValidPhone(value) {
  return normalizePhone(value).replace(/\D/g, '').length >= 7
}

function normalizePayload(data) {
  const eventType =
    data.eventType === 'update'
      ? 'update'
      : 'initial'
  const answers = (typeof data.answers === 'object' && !Array.isArray(data.answers))
    ? data.answers
    : {}
  const rawEmail = String(data.email || '').trim().toLowerCase()
  const email = isValidEmail(rawEmail) ? rawEmail : ''
  const phone = normalizePhone(data.phone)

  return {
    eventType,
    fullName: (data.fullName || '').trim(),
    email,
    phone,
    instagram: (data.instagram || '').trim().replace(/^@/, ''),
    role: (data.role || '').trim(),
    mainProblem: (data.mainProblem || '').trim(),
    revenue: (data.revenue || '').trim(),
    urgency: (data.urgency || '').trim(),
    investment: (data.investment || '').trim(),
    answers,
    pageUrl: window.location.href,
    variant: 'A',
    capturedAt: data.capturedAt || new Date().toISOString(),
  }
}

function fingerprint(payload) {
  // Excluye capturedAt y pageUrl para evitar falsos "cambios"
  return JSON.stringify({
    eventType: payload.eventType,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    answers: payload.answers,
  })
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGhlLeadCapture() {
  const timerRef = useRef(null)
  const lastFingerprintRef = useRef(null)

  useEffect(() => {
    // Variante A forzada: la captura permanece siempre activa en la landing.

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
      const fullName = String(data.fullName || '').trim()
      const rawEmail = String(data.email || '').trim().toLowerCase()
      const email = isValidEmail(rawEmail) ? rawEmail : ''
      const phone = normalizePhone(data.phone)

      if (!email && !isValidPhone(phone)) {
        return
      }

      // 4. Normalizar
      const payload = normalizePayload({
        ...data,
        fullName,
        email,
        phone,
      })

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

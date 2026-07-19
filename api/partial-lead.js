/**
 * POST /api/partial-lead
 *
 * Recibe datos parciales de un lead capturados desde el formulario de GHL
 * (via postMessage), los valida, los sanitiza y los reenvía al webhook de n8n.
 *
 * Variables de entorno requeridas (configurar en Vercel):
 *   N8N_PARTIAL_LEAD_WEBHOOK_URL     — URL privada del webhook de n8n
 *   PARTIAL_LEAD_WEBHOOK_SECRET      — Token de autenticación para n8n
 *
 * Variables de entorno opcionales:
 *   PARTIAL_LEAD_ALLOWED_ORIGINS     — Lista separada por comas de orígenes permitidos
 *                                      (por defecto usa DEFAULT_ALLOWED_ORIGINS)
 */

// ─── Configuración ────────────────────────────────────────────────────────────

const N8N_WEBHOOK_URL = process.env.N8N_PARTIAL_LEAD_WEBHOOK_URL
const WEBHOOK_SECRET = process.env.PARTIAL_LEAD_WEBHOOK_SECRET
const ALLOWED_ORIGINS_ENV = process.env.PARTIAL_LEAD_ALLOWED_ORIGINS
const VERCEL_ENV = process.env.VERCEL_ENV // 'production' | 'preview' | 'development'

// Dominios de la landing en producción — actualizar si cambia el dominio
const DEFAULT_ALLOWED_ORIGINS = [
  'https://pantheramktgroup.com',
  'https://www.pantheramktgroup.com',
]

function getAllowedOrigins() {
  if (ALLOWED_ORIGINS_ENV) {
    return ALLOWED_ORIGINS_ENV.split(',').map((s) => s.trim()).filter(Boolean)
  }
  return DEFAULT_ALLOWED_ORIGINS
}

// ─── Rate limiting (en memoria, se resetea por cold start) ───────────────────

const rateMap = new Map()
const RATE_WINDOW_MS = 60_000 // 1 minuto
const RATE_MAX_PER_WINDOW = 20

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + RATE_WINDOW_MS }
  if (now > entry.reset) {
    entry.count = 1
    entry.reset = now + RATE_WINDOW_MS
  } else {
    entry.count += 1
  }
  rateMap.set(ip, entry)
  return entry.count > RATE_MAX_PER_WINDOW
}

// ─── Helpers de validación y sanitización ────────────────────────────────────

function isValidEmail(str) {
  return typeof str === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim())
}

function sanitize(val, maxLen = 200) {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen)
}

function sanitizeAnswers(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const out = {}
  const entries = Object.entries(raw).slice(0, 20)
  for (const [k, v] of entries) {
    const sk = sanitize(String(k), 80)
    const sv = sanitize(String(v ?? ''), 500)
    if (sk) out[sk] = sv
  }
  return out
}

// ─── Handler ─────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Validación de origen (no exponemos URLs internas)
  const origin = req.headers['origin'] || req.headers['referer'] || ''
  const isAllowedEnv = VERCEL_ENV === 'development' || VERCEL_ENV === 'preview'
  const isAllowedOrigin = getAllowedOrigins().some(
    (o) => origin === o || origin.startsWith(o + '/')
  )

  if (!isAllowedEnv && !isAllowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  // Rate limiting por IP
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  // Validación del body
  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid body' })
  }

  const fullName = sanitize(body.fullName, 120)
  const email = sanitize(body.email, 120)

  if (fullName.split(/\s+/).filter(Boolean).length < 2) {
    return res.status(400).json({ error: 'fullName must include first and last name' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  // Validación de configuración requerida
  if (!N8N_WEBHOOK_URL || !WEBHOOK_SECRET) {
    const missing = []
    if (!N8N_WEBHOOK_URL) missing.push('N8N_PARTIAL_LEAD_WEBHOOK_URL')
    if (!WEBHOOK_SECRET) missing.push('PARTIAL_LEAD_WEBHOOK_SECRET')
    console.error('[partial-lead] Missing configuration:', missing.join(', '))
    return res.status(500).json({ error: 'Service configuration incomplete' })
  }

  // Preservar eventType tal cual viene; por defecto 'initial'
  const eventType = body.eventType || 'initial'
  
  // Preservar answers tal cual viene; validar estructura
  const answers = sanitizeAnswers(body.answers)

  const payload = {
    eventType,
    fullName,
    email: email.toLowerCase(),
    phone: sanitize(body.phone, 30),
    instagram: sanitize(body.instagram, 80),
    role: sanitize(body.role, 120),
    mainProblem: sanitize(body.mainProblem, 500),
    revenue: sanitize(body.revenue, 80),
    answers,
    pageUrl: sanitize(body.pageUrl, 300),
    variant: 'B',
    capturedAt: body.capturedAt || new Date().toISOString(),
  }

  // Debug en desarrollo
  if (VERCEL_ENV === 'development') {
    console.debug('[partial-lead] Payload to n8n:', JSON.stringify(payload, null, 2))
  }

  try {
    const webhookRes = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
    })

    if (!webhookRes.ok) {
      console.error('[partial-lead] Webhook error:', webhookRes.status, webhookRes.statusText)
      return res.status(502).json({ error: 'Upstream error' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[partial-lead] Fetch failed:', err?.message)
    return res.status(500).json({ error: 'Internal error' })
  }
}

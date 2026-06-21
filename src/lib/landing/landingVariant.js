export const LANDING_VARIANT_KEY = 'landing_variant'

const VARIANT_A = 'A'
const VARIANT_B = 'B'

function isBrowser() {
  return typeof window !== 'undefined'
}

function normalizeVariant(value) {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toUpperCase()
  return normalized === VARIANT_A || normalized === VARIANT_B ? normalized : null
}

export function getVariantFromUrl(search = isBrowser() ? window.location.search : '') {
  if (!search) return null
  const params = new URLSearchParams(search)
  return normalizeVariant(params.get('variant'))
}

export function getStoredLandingVariant() {
  if (!isBrowser()) return null

  try {
    return normalizeVariant(window.localStorage.getItem(LANDING_VARIANT_KEY))
  } catch {
    return null
  }
}

export function setStoredLandingVariant(variant) {
  if (!isBrowser()) return
  const normalized = normalizeVariant(variant)
  if (!normalized) return

  try {
    window.localStorage.setItem(LANDING_VARIANT_KEY, normalized)
  } catch {
    // Ignore storage errors and keep runtime behavior resilient.
  }
}

function randomVariant() {
  return Math.random() < 0.5 ? VARIANT_A : VARIANT_B
}

export function resolveLandingVariant(search = isBrowser() ? window.location.search : '') {
  if (!isBrowser()) {
    return { variant: VARIANT_A, source: 'server' }
  }

  const fromUrl = getVariantFromUrl(search)
  if (fromUrl) {
    setStoredLandingVariant(fromUrl)
    return { variant: fromUrl, source: 'url' }
  }

  const stored = getStoredLandingVariant()
  if (stored) {
    return { variant: stored, source: 'storage' }
  }

  const assigned = randomVariant()
  setStoredLandingVariant(assigned)
  return { variant: assigned, source: 'random' }
}

export const LANDING_VARIANT_KEY = 'landing_variant'

const VARIANT_A = 'A'
const VARIANT_B = 'B'

export function getVariantFromUrl() {
  if (typeof window === 'undefined') return VARIANT_A
  const param = new URLSearchParams(window.location.search).get('variant')
  return param === VARIANT_B ? VARIANT_B : VARIANT_A
}

export function getStoredLandingVariant() {
  return getVariantFromUrl()
}

export function setStoredLandingVariant() {
  // Controlled via URL param ?variant=B — no-op for storage.
}

export function resolveLandingVariant() {
  const variant = getVariantFromUrl()
  return { variant, source: variant === VARIANT_B ? 'url' : 'default' }
}

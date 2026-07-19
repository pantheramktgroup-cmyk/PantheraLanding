export const LANDING_VARIANT_KEY = 'landing_variant'

const VARIANT_A = 'A'
const VARIANT_B = 'B'

export function getVariantFromUrl() {
  return VARIANT_A
}

export function getStoredLandingVariant() {
  return VARIANT_A
}

export function setStoredLandingVariant() {
  // Variant is pinned to A in production.
}

export function resolveLandingVariant() {
  return { variant: VARIANT_A, source: 'forced' }
}

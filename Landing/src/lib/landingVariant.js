export const LANDING_VARIANT_KEY = 'landing_variant'

const VARIANT_A = 'A'

export function getVariantFromUrl() {
  return VARIANT_A
}

export function getStoredLandingVariant() {
  return VARIANT_A
}

export function setStoredLandingVariant() {
  // Variants are disabled: keep API as no-op for compatibility.
}

export function resolveLandingVariant() {
  return { variant: VARIANT_A, source: 'forced' }
}

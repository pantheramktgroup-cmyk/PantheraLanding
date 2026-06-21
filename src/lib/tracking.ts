import { track } from '@vercel/analytics'

type TrackingPayload = Record<string, string | number | boolean | null | undefined>

export function trackEvent(name: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    track(name, payload)
  } catch {
    // Analytics should never break the UI.
  }
}

export function trackCtaClick(label: string, href: string, page: string) {
  trackEvent('button_click', { label, href, page })

  if (href.includes('/contacto') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    trackEvent('contact_cta_click', { label, href, page })
  }
}
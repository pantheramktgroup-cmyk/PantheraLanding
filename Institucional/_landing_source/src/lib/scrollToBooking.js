import { getLenis } from './lenis'
import { getStoredLandingVariant } from './landingVariant'
import { trackEvent } from './tracking'

/**
 * Scrolls smoothly to the #booking section.
 * Uses Lenis if available, falls back to native scrollIntoView.
 */
export function scrollToBooking() {
  if (typeof window === 'undefined') return

  trackEvent('booking_cta_click', {
    variant: getStoredLandingVariant() ?? 'A',
    page_path: window.location.pathname,
  })

  const isLandingPath = window.location.pathname === '/' || window.location.pathname === ''
  if (!isLandingPath) {
    window.location.href = '/#booking'
    return
  }

  const booking = document.getElementById('booking')
  if (!booking) {
    window.location.hash = 'booking'
    return
  }

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(booking, {
      offset: -80,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    booking.scrollIntoView({ behavior: 'smooth' })
  }
}

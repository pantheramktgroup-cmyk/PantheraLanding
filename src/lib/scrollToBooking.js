import { getLenis } from './lenis'

/**
 * Scrolls smoothly to the #booking section.
 * Uses Lenis if available, falls back to native scrollIntoView.
 */
export function scrollToBooking() {
  const booking = document.getElementById('booking')
  if (!booking) return

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

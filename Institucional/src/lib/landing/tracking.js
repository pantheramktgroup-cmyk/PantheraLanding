export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined' || !eventName) return

  const eventPayload = { event: eventName, ...payload }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload)
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }

  window.dispatchEvent(
    new CustomEvent('panthera_tracking_event', {
      detail: eventPayload,
    })
  )
}

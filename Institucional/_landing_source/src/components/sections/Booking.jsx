import { useMemo, useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import { getStoredLandingVariant } from '../../lib/landingVariant'

const { booking } = landingCopy

function resolveLandingVariant(variant) {
  if (variant === 'A' || variant === 'B') return variant

  if (typeof window === 'undefined') return 'A'

  const urlVariant = new URLSearchParams(window.location.search).get('variant')
  if (urlVariant === 'A' || urlVariant === 'B') return urlVariant

  const storedVariant = getStoredLandingVariant?.()
  if (storedVariant === 'A' || storedVariant === 'B') return storedVariant

  return 'A'
}

function buildCalendarSrc(calendarSrc, variant) {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://pantheramktgroup.com'

  const url = new URL(calendarSrc, base)

  if (typeof window !== 'undefined') {
    const currentParams = new URLSearchParams(window.location.search)

    const passthroughParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_id',
      'fbclid',
      'gclid',
      'gbraid',
      'wbraid',
      'msclkid',
    ]

    passthroughParams.forEach((param) => {
      const value = currentParams.get(param)

      if (value && !url.searchParams.has(param)) {
        url.searchParams.set(param, value)
      }
    })
  }

  // Campos clave para diferenciar A/B en GHL
  url.searchParams.set('landing_variant', variant)
  url.searchParams.set('utm_content', `variant_${variant}`)

  // Fallbacks si la visita no trae UTMs desde anuncios
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', 'landing_panthera')
  }

  if (!url.searchParams.has('utm_medium')) {
    url.searchParams.set('utm_medium', 'ab_test')
  }

  if (!url.searchParams.has('utm_campaign')) {
    url.searchParams.set('utm_campaign', 'landing_principal')
  }

  return url.toString()
}

export default function Booking({ variant }) {
  const containerRef = useRef(null)
  const calendarRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  const landingVariant = resolveLandingVariant(variant)

  const calendarSrcWithTracking = useMemo(
    () => buildCalendarSrc(booking.calendarSrc, landingVariant),
    [landingVariant]
  )

  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.from(calendarRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: calendarRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section id="booking" className="bg-[#000000]">
      <div ref={containerRef} className="container-panthera pt-24 md:pt-28 pb-16 md:pb-14">
        {/* Eyebrow + headline above calendar — minimal */}
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            Agendar
          </p>

          <h2
            className="font-serif text-panthera-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Agendar una llamada de diagnóstico
          </h2>
        </div>

        {/* Calendar — full width, no overflow hidden, no fixed heights that clip */}
        <div
          ref={calendarRef}
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            overflow: 'visible',
          }}
        >
          <iframe
            src={calendarSrcWithTracking}
            title="Calendario de diagnóstico Panthera"
            id={`${booking.calendarId}_booking`}
            className="booking-iframe"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
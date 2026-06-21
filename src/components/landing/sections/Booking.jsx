import { useEffect, useMemo, useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'
import { landingCopy } from '../../../content/landing/landingCopy'
import { getStoredLandingVariant } from '../../../lib/landing/landingVariant'

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

  const iframeId = useMemo(
    () => `${booking.calendarId}_${Date.now()}`,
    []
  )

  // Load GHL's form_embed.js *after* the iframe is in the DOM, mirroring the
  // original embed where the <script> follows the <iframe>. GHL's script scans
  // for booking iframes when it runs; in this SPA the iframe is mounted by
  // React after initial load, so loading the script here lets GHL natively
  // initialize it (iframe-resizer handshake => correct auto height and proper
  // embedded rendering, identical to the original embed — no white strip).
  useEffect(() => {
    if (typeof document === 'undefined') return

    const src = 'https://links.iqautomated.io/js/form_embed.js'
    if (document.querySelector(`script[src="${src}"]`)) return

    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    document.body.appendChild(script)
  }, [])

  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.from(calendarRef.current, {
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
            id={iframeId}
            className="booking-iframe"
            scrolling="no"
            style={{
              width: '100%',
              border: 'none',
              overflow: 'hidden',
            }}
          />
        </div>
      </div>
    </section>
  )
}
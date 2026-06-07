import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'

const { booking } = landingCopy

export default function Booking() {
  const containerRef = useRef(null)
  const calendarRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

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
    <section
      id="booking"
      className="bg-panthera-black"
    >
      <div ref={containerRef} className="container-panthera pt-20 md:pt-28 pb-20">
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
            src={booking.calendarSrc}
            title="Calendario de diagnóstico Panthera"
            id={`${booking.calendarId}_booking`}
            className="booking-iframe"
            loading="lazy"
          />
        </div>

        {/* Closing text below calendar */}
        <div className="max-w-xl mx-auto text-center mt-10">
          <p className="font-sans text-sm text-panthera-ash/60 leading-relaxed">
            {booking.closingText}
          </p>
        </div>
      </div>
    </section>
  )
}

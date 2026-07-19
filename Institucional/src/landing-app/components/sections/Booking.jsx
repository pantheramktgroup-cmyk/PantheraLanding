import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useGhlLeadCapture } from '../../hooks/useGhlLeadCapture'
import { landingCopy } from '../../content/landingCopy'

const { booking } = landingCopy
const CALENDAR_EMBED_SRC = booking.calendarSrc
const CALENDAR_IFRAME_ID = '7Sk8mmne4xexnAx1tKYA_1783992943155'

export default function Booking() {
  const containerRef = useRef(null)
  const calendarRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  // Captura progresiva de leads — solo activo en variante B
  useGhlLeadCapture()

  useEffect(() => {
    if (typeof document === 'undefined') return

    // Re-run GHL embed initialization after the iframe is mounted.
    const existingScript = document.querySelector(
      'script[src="https://links.iqautomated.io/js/form_embed.js"][data-booking-reinit="true"]'
    )

    let script = existingScript
    let appendedByThisEffect = false

    if (!script) {
      script = document.createElement('script')
      script.src = 'https://links.iqautomated.io/js/form_embed.js'
      script.type = 'text/javascript'
      script.async = true
      script.dataset.bookingReinit = 'true'
      document.body.appendChild(script)
      appendedByThisEffect = true
    }

    return () => {
      if (appendedByThisEffect && script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

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
      <div ref={containerRef} className="container-panthera pt-16 md:pt-20 pb-12 md:pb-12">
        {/* Eyebrow + headline above calendar — minimal */}
        <div className="text-center mb-6 md:mb-7">
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

        {/* Sidebar hardcodeada + widget GHL */}
        <div ref={calendarRef} className="booking-embed-shell booking-layout">
          <aside className="booking-sidebar">
            <p className="booking-sidebar-kicker">Llamada estratégica</p>
            <h3 className="booking-sidebar-title">Diagnóstico Panthera</h3>
            <p className="booking-sidebar-meta">Duración: 30 min</p>
            <div className="booking-sidebar-copy">
              <p>
                Si estás buscando una estrategia sólida para escalar tu negocio, esta llamada es clave.
              </p>
              <p>
                Te mostraremos cómo en Panthera integramos automatización, procesos optimizados y un equipo de expertos{' '}
                <strong>para escalar tu negocio de forma exponencial</strong>.
              </p>
              <p>No es magia, es ingeniería aplicada a las ventas.</p>
              <p>
                <strong>Agendá y analicemos juntos en qué situación te encontrás.</strong>
              </p>
            </div>
          </aside>

          <div className="booking-widget-col">
            <iframe
              src={CALENDAR_EMBED_SRC}
              title="Calendario de diagnóstico Panthera"
              id={CALENDAR_IFRAME_ID}
              className="booking-iframe"
              scrolling="yes"
              style={{ width: '100%', border: 'none', overflow: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
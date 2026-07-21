import { useEffect } from 'react'

const LOGO_SRC = '/logos/01.%20PNG/Recurso%209.png'
const CALENDAR_EMBED_SRC = 'https://links.iqautomated.io/widget/booking/ZsgZERh6Hs9OqMOMPdKH'
const CALENDAR_IFRAME_ID = 'ZsgZERh6Hs9OqMOMPdKH_1784637102785'

export default function SecondValidationPage() {
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

  return (
    <div className="landing-root min-h-screen bg-panthera-black text-panthera-white">
      <header className="border-b border-[rgba(245,245,245,0.08)]">
        <div className="container-panthera flex h-14 md:h-16 items-center justify-center">
          <a
            href="https://pantheramktgroup.com"
            aria-label="Panthera Group"
            className="opacity-80 transition-opacity duration-200 hover:opacity-100"
          >
            <img
              src={LOGO_SRC}
              alt="Panthera Group"
              className="h-[18px] w-auto brightness-0 invert md:h-[22px]"
              loading="eager"
            />
          </a>
        </div>
      </header>

      <main className="container-panthera pt-10 pb-14 md:pt-14 md:pb-16">
        <div className="mx-auto w-full max-w-[1040px] text-center mb-6 md:mb-7">
          <h1
            className="font-serif text-panthera-white leading-tight"
            style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.6rem)' }}
          >
            Completá nuevamente tus datos para continuar
          </h1>

          <p className="mx-auto mt-4 max-w-[720px] font-sans text-sm leading-relaxed text-panthera-white/72 md:text-base">
            Esta información nos permitirá comprender mejor tu situación y brindarte una atención adecuada.
          </p>
        </div>

        <div className="booking-embed-shell booking-layout">
          <aside className="booking-sidebar">
            <p className="booking-sidebar-kicker">Llamada estratégica</p>
            <h2 className="booking-sidebar-title">Diagnóstico Panthera</h2>
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

          <div className="booking-widget-col booking-frame-mask">
            <iframe
              src={CALENDAR_EMBED_SRC}
              title="Calendario de segunda validación Panthera"
              id={CALENDAR_IFRAME_ID}
              className="booking-iframe"
              scrolling="no"
              style={{ width: '100%', border: 'none', overflow: 'hidden' }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
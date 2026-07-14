import Button from '../ui/Button'
import VslPlayer from '../ui/VslPlayer'

const HERO_EYEBROW =
  'Para coaches y consultores que ya venden su oferta high-ticket y facturan +$10K al mes'
const HERO_HEADLINE =
  'Te instalamos un sistema que genera 45 citas calificadas al mes, activo en menos de 30 días, o seguimos trabajando gratis hasta lograrlo'
const HERO_SUBHEADLINE =
  'El mismo sistema que les suma entre $6,000 y $20,000 extra al mes a nuestros clientes, construido, conectado y operado por nosotros.'
const HERO_QUESTION = '¿Ya facturas $10K+ al mes?'
const HERO_CTA = 'Agenda tu llamada estratégica'

export default function Hero() {
  return (
    <section className="landing-hero relative w-full overflow-hidden bg-black lg:overflow-visible">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040404] via-[#070707] to-[#000000]" />
        <div className="absolute inset-0 panthera-grid-bg opacity-[0.18]" />
        <div className="absolute inset-0 noise-overlay opacity-[0.28]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,247,141,0.12),rgba(227,247,141,0.04)_42%,transparent_74%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/58 to-black/92" />
      </div>

      <div className="landing-hero-shell container-panthera relative z-10">
        <div className="landing-hero-content mx-auto w-full text-center">
          <div className="hero-copy w-full">
            <p
              className="hero-eyebrow font-sans text-panthera-green uppercase leading-[1.38]"
            >
              <span className="hero-eyebrow-line">PARA COACHES Y CONSULTORES QUE YA VENDEN</span>{' '}
              <span className="hero-eyebrow-line">SU OFERTA HIGH-TICKET Y FACTURAN +$10K AL MES</span>
            </p>

            <h1
              className="hero-headline mx-auto font-serif text-panthera-white text-balance"
            >
              <span className="hero-headline-line">Te instalamos un sistema que genera 45 citas</span>{' '}
              <span className="hero-headline-line">calificadas al mes, activo en menos de 30 días,</span>{' '}
              <span className="hero-headline-line">o seguimos trabajando gratis hasta lograrlo</span>
            </h1>

            <p
              className="hero-subheadline mx-auto font-sans text-panthera-white/72"
            >
              <span className="hero-subline-desktop">
                El mismo sistema que les suma entre <span className="hero-subheadline-highlight">$6,000 y $20,000 extra al mes</span>
              </span>{' '}
              <span className="hero-subline-desktop">
                a nuestros clientes, construido, conectado y operado por nosotros.
              </span>
            </p>
          </div>

          <div className="hero-media landing-hero-vsl-wrap mx-auto w-full flex justify-center">
            <VslPlayer
              className="landing-hero-vsl"
              title="Video principal Panthera"
            />
          </div>

          <div className="hero-action w-full">
            <p
              className="landing-hero-question font-sans text-panthera-white text-center"
            >
              {HERO_QUESTION}
            </p>

            <div className="hero-cta-wrap flex justify-center">
              <Button variant="primary" href="#booking" aria-label={HERO_CTA} className="hero-cta-btn">
                {HERO_CTA}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

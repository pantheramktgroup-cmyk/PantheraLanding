import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { apexSystem } = landingCopy

const PANEL_IMAGES = [
  '/images/apex_phase_01_diagnostico.webp',
  '/images/apex_phase_02_auditoria.webp',
  '/images/apex_phase_03_estrategia.webp',
  '/images/apex_phase_04_infraestructura.webp',
  '/images/apex_phase_05_implementacion.webp',
  '/images/apex_phase_06_medicion.webp',
  '/images/apex_phase_07_optimizacion.webp',
]

const TOTAL_PANELS = apexSystem.phases.length + 1

const METHOD_IMAGE_FILTER = 'brightness(0.46) contrast(1.08) saturate(0.64) blur(0.9px)'

const CLOSING_IMAGE_CLASS =
  'absolute inset-[-6%] w-[112%] h-[112%] max-w-none object-cover'

const CLOSING_IMAGE_STYLE = {
  objectPosition: 'center center',
  transform: 'scale(0.9) translateY(9%)',
  transformOrigin: 'center',
  filter: METHOD_IMAGE_FILTER,
}

function MethodAtmosphereOverlay() {
  return (
    <>
      {/* Oscurecimiento general, apenas más liviano */}
      <div className="absolute inset-0 bg-panthera-deep/84" />

      {/* Menos oscuridad en el centro */}
      <div className="absolute inset-0 bg-black/16" />

      {/* Profundidad inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-panthera-deep via-panthera-deep/58 to-black/12" />

      {/* Viñeta atmosférica: mantiene bordes oscuros, pero libera un poco el centro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 54% at 50% 46%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.38) 66%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Refuerzo lateral, un poco más suave */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/38 via-transparent to-black/38" />

      {/* Refuerzo superior/inferior, más suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/26 via-transparent to-black/28" />

      {/* Grano más sutil */}
      <div className="grain-overlay opacity-[0.11]" />
    </>
  )
}

export default function ApexSystem() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const pin = pinRef.current
        const track = trackRef.current

        if (!pin || !track) return

        const ctx = gsap.context(() => {
          const vw = () => document.documentElement.clientWidth
          const totalDist = () => vw() * (TOTAL_PANELS - 1)

          const lastPanel = track.children[TOTAL_PANELS - 1]

          const tl = gsap.timeline()

          tl.to(track, {
            x: () => -lastPanel.offsetLeft,
            ease: 'none',
            duration: TOTAL_PANELS - 1,
          })

          tl.to({}, { duration: 1 })

          ScrollTrigger.create({
            animation: tl,
            trigger: pin,
            start: 'top top',
            end: () => `+=${(totalDist() * TOTAL_PANELS) / (TOTAL_PANELS - 1)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value) => {
                const step = 1 / TOTAL_PANELS
                return Math.round(value / step) * step
              },
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * TOTAL_PANELS),
                TOTAL_PANELS - 1
              )

              setCurrentPhase(idx)

              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          })

          gsap.from('.phase-content', {
            opacity: 0,
            y: 26,
            stagger: 0.08,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pin,
              start: 'top 78%',
              once: true,
            },
          })

          gsap.to('.phase-bg', {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${(totalDist() * TOTAL_PANELS) / (TOTAL_PANELS - 1)}`,
              scrub: true,
            },
          })
        })

        return () => ctx.revert()
      })

      return () => mm.revert()
    },
    { scope: pinRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="bg-[#080808] overflow-hidden">
      <div className="container-panthera pt-28 md:pt-36 pb-20 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-panthera-white/88 mb-5">
          {apexSystem.eyebrow}
        </p>

        <h2
          className="font-serif text-panthera-white leading-tight mb-6 max-w-3xl"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
        >
          {apexSystem.headline}
        </h2>

        <p className="font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">
          {apexSystem.subheadline}
        </p>
      </div>

      <div
        ref={pinRef}
        className="relative hidden md:block"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <div
          className="absolute left-0 right-0 z-30 pointer-events-none"
          style={{ top: 'calc(88px + 2.4rem)' }}
        >
          <div className="container-panthera flex items-center justify-between">
            <div className="text-panthera-white/82 font-sans text-[11px] uppercase tracking-[0.15em] font-semibold">
              {apexSystem.eyebrow}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl text-panthera-white/90 tabular-nums leading-none">
                {String(Math.min(currentPhase + 1, apexSystem.phases.length)).padStart(2, '0')}
              </span>

              <span className="text-sm text-panthera-ash/45">/</span>

              <span className="font-sans text-xs text-panthera-ash/45">
                {String(apexSystem.phases.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="mt-3 h-px bg-[rgba(245,245,245,0.06)] overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-panthera-green origin-left"
              style={{ transform: 'scaleX(0)', transition: 'none' }}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-nowrap h-full bg-panthera-deep"
          style={{ willChange: 'transform' }}
        >
          {apexSystem.phases.map((phase, i) => (
            <div
              key={phase.number}
              className="relative overflow-hidden bg-panthera-deep h-full"
              style={{
                flex: '0 0 100vw',
                width: '100vw',
                minWidth: '100vw',
                maxWidth: 'none',
              }}
            >
              <div className="absolute inset-0" aria-hidden="true">
                <img
                  src={PANEL_IMAGES[i % PANEL_IMAGES.length]}
                  alt=""
                  className="phase-bg w-full h-full object-cover object-center"
                  style={{ filter: METHOD_IMAGE_FILTER }}
                  loading="lazy"
                />

                <MethodAtmosphereOverlay />
              </div>

              <div className="phase-content absolute z-10 bottom-0 left-0 right-0 container-panthera pb-10 md:pb-14">
                <div className="max-w-2xl">
                  <p
                    className="mb-5 tabular-nums tracking-[0.08em] text-[#E3F78D]/55"
                    style={{
                      fontFamily: "'Helvetica Now Display', Helvetica, Arial, sans-serif",
                      fontWeight: 200,
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.25rem, 1.7vw, 1.65rem)',
                      lineHeight: 1,
                    }}
                  >
                    Fase {phase.number}
                  </p>

                  <div className="border-t border-[rgba(245,245,245,0.10)] pt-7">
                    <h3
                      className="font-serif text-panthera-white leading-tight mb-5"
                      style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}
                    >
                      {phase.title}
                    </h3>

                    <p className="font-sans text-sm text-panthera-white/60 leading-relaxed max-w-lg">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            className="relative flex items-center justify-center text-center h-full overflow-hidden"
            style={{
              flex: '0 0 100vw',
              width: '100vw',
              minWidth: '100vw',
              maxWidth: 'none',
            }}
          >
            <img
              src="/images/creation_panthera_hand.webp"
              alt=""
              aria-hidden="true"
              className={CLOSING_IMAGE_CLASS}
              style={CLOSING_IMAGE_STYLE}
              loading="lazy"
            />

            <MethodAtmosphereOverlay />

            <div
              className="relative z-10 w-full max-w-2xl mx-auto px-6"
              style={{ transform: 'translateY(72px)' }}
            >
              <p
                className="font-serif text-panthera-white leading-tight mb-16"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 3rem)' }}
              >
                {apexSystem.closingSlide.text}
              </p>

              <Button variant="fullScreen" href="#booking">
                {apexSystem.closingSlide.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {apexSystem.phases.map((phase, i) => (
          <div
            key={`mob-${phase.number}`}
            className="relative border-t border-[rgba(245,245,245,0.08)] py-16 px-6"
            style={{ minHeight: '70vh' }}
          >
            <div className="absolute inset-0" aria-hidden="true">
              <img
                src={PANEL_IMAGES[i % PANEL_IMAGES.length]}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: METHOD_IMAGE_FILTER }}
                loading="lazy"
              />

              <MethodAtmosphereOverlay />
            </div>

            <div className="relative z-10 max-w-lg">
              <p
                className="mb-5 tabular-nums tracking-[0.08em] text-[#E3F78D]/55"
                style={{
                  fontFamily: "'Helvetica Now Display', Helvetica, Arial, sans-serif",
                  fontWeight: 200,
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  lineHeight: 1,
                }}
              >
                Fase {phase.number}
              </p>

              <div className="border-t border-[rgba(245,245,245,0.10)] pt-6">
                <h3
                  className="font-serif text-panthera-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  {phase.title}
                </h3>

                <p className="font-sans text-sm text-panthera-white/60 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
          <img
            src="/images/creation_panthera_hand.webp"
            alt=""
            aria-hidden="true"
            className={CLOSING_IMAGE_CLASS}
            style={CLOSING_IMAGE_STYLE}
            loading="lazy"
          />

          <MethodAtmosphereOverlay />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p
              className="font-serif text-panthera-white leading-tight mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              {apexSystem.closingSlide.text}
            </p>

            <Button variant="fullScreen" href="#booking">
              {apexSystem.closingSlide.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
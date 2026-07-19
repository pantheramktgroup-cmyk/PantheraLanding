import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import { resolveLandingVariant } from '../../lib/landingVariant'
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

const MURAL_BG = '/images/panthera.webp'
const MURAL_SHIFT_X = 0.28
const MURAL_SHIFT_Y = 0.28
const MURAL_SCALE_X = 4.3
const MURAL_SCALE_Y = 2.2

const getMuralPosition = (col, row) => {
  const x = ((col + MURAL_SHIFT_X) / (MURAL_SCALE_X - 1)) * 100
  const y = ((row + MURAL_SHIFT_Y) / (MURAL_SCALE_Y - 1)) * 100
  return `${x}% ${y}%`
}

const MURAL_CARD_POSITIONS = [
  getMuralPosition(0, 0),
  getMuralPosition(1, 0),
  getMuralPosition(2, 0),
  getMuralPosition(3, 0),
  getMuralPosition(0, 1),
  getMuralPosition(1, 1),
  getMuralPosition(2, 1),
  getMuralPosition(3, 1),
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
      {/* Oscurecimiento general, apenas mas liviano */}
      <div className="absolute inset-0 bg-panthera-deep/84" />

      {/* Menos oscuridad en el centro */}
      <div className="absolute inset-0 bg-black/16" />

      {/* Profundidad inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-panthera-deep via-panthera-deep/58 to-black/12" />

      {/* Vineta atmosferica: mantiene bordes oscuros, pero libera un poco el centro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 54% at 50% 46%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.38) 66%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Refuerzo lateral, un poco mas suave */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/38 via-transparent to-black/38" />

      {/* Refuerzo superior/inferior, mas suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/26 via-transparent to-black/28" />

      {/* Grano mas sutil */}
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
  const { variant } = resolveLandingVariant()
  const isVariantB = variant === 'B'
  const apexCardsB = [
    ...apexSystem.phasesB,
    {
      number: '08',
      title: 'APEX SYSTEM',
      description: '',
      isFiller: true,
    },
  ]

  useGSAP(
    () => {
      if (prefersReduced || isVariantB) return

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
    { scope: pinRef, dependencies: [prefersReduced, isVariantB] }
  )

  return (
    <section className="bg-[#080808] overflow-hidden">
      {/* Header compartido */}
      <div className="container-panthera pt-20 md:pt-36 pb-12 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-panthera-white/88 mb-5">
          {apexSystem.eyebrow}
        </p>

        <h2 className="md:hidden font-serif text-panthera-white leading-tight mb-6 max-w-3xl" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
          {apexSystem.headline.replace(/\n/g, ' ')}
        </h2>

        <h2 className="hidden md:block font-serif text-panthera-white leading-tight mb-6 max-w-3xl" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
          {apexSystem.headline}
        </h2>

        <p className="md:hidden font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">
          {apexSystem.subheadline.replace(/\n/g, ' ')}
        </p>

        <p className="hidden md:block font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">
          {apexSystem.subheadline}
        </p>
      </div>

      {/* -- VARIANTE A - scroll horizontal pinneado ------------------------- */}
      {!isVariantB && (
        <>
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
                  style={{ flex: '0 0 100vw', width: '100vw', minWidth: '100vw', maxWidth: 'none' }}
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
                style={{ flex: '0 0 100vw', width: '100vw', minWidth: '100vw', maxWidth: 'none' }}
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
                    className="font-serif text-panthera-white leading-tight mb-16 whitespace-pre-line max-w-4xl"
                    style={{ fontSize: 'clamp(1.45rem, 2.6vw, 2.4rem)' }}
                  >
                    {apexSystem.closingSlide.text}
                  </p>
                  <div className="flex justify-center">
                    <Button variant="fullScreen" href="#booking">
                      {apexSystem.closingSlide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile - scroll horizontal compacto */}
          <div className="md:hidden">
            <div className="relative overflow-hidden border-t border-[rgba(245,245,245,0.07)]">
              <div className="absolute inset-0" aria-hidden="true">
                <img
                  src="/images/apex_phase_01_diagnostico.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ filter: 'brightness(0.26) contrast(1.08) saturate(0.55) blur(1.4px)', transform: 'scale(1.05)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/72" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/28 to-black/78" />
                <div className="grain-overlay opacity-[0.1]" aria-hidden="true" />
              </div>

              <div className="relative z-10 px-6 py-8">
                <div className="mb-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">
                    Deslizá para conocer el método
                  </p>
                </div>

                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 apex-mobile-scroll">
                  {apexSystem.phases.map((phase, i) => (
                    <article
                      key={`mob-${phase.number}`}
                      className="relative shrink-0 snap-start w-[82%] min-h-[250px] border border-[rgba(245,245,245,0.08)] bg-black/46 p-5 overflow-hidden"
                    >
                      <div className="absolute inset-0" aria-hidden="true">
                        <img
                          src={PANEL_IMAGES[i % PANEL_IMAGES.length]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ filter: 'brightness(0.34) contrast(1.08) saturate(0.55) blur(0.8px)' }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/66" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/34 to-black/36" />
                        <div className="grain-overlay opacity-[0.07]" aria-hidden="true" />
                      </div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                          <p
                            className="tabular-nums tracking-[0.08em] text-[#E3F78D]/60"
                            style={{
                              fontFamily: "'Helvetica Now Display', Helvetica, Arial, sans-serif",
                              fontWeight: 200, fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1,
                            }}
                          >
                            Fase {phase.number}
                          </p>
                          <span className="w-6 h-px bg-panthera-green/55" />
                        </div>
                        <div className="mt-auto">
                          <h3 className="font-serif text-panthera-white leading-tight mb-3" style={{ fontSize: 'clamp(1.25rem, 5.8vw, 1.65rem)' }}>
                            {phase.title}
                          </h3>
                          <p className="font-sans text-[12.5px] text-panthera-white/66 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
                  {apexSystem.phases.map((phase) => (
                    <span key={`dot-${phase.number}`} className="h-1 w-6 bg-panthera-green/25" />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden border-t border-[rgba(245,245,245,0.07)]">
              <img src="/images/creation_panthera_hand.webp" alt="" aria-hidden="true" className={CLOSING_IMAGE_CLASS} style={CLOSING_IMAGE_STYLE} loading="lazy" />
              <MethodAtmosphereOverlay />
              <div className="absolute inset-0 bg-black/34" aria-hidden="true" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="font-serif text-panthera-white leading-tight mb-8" style={{ fontSize: 'clamp(1.3rem, 6.6vw, 1.9rem)' }}>
                  {apexSystem.closingSlide.text.replace(/\n/g, ' ')}
                </p>
                <div className="flex justify-center">
                  <Button variant="fullScreen" href="#booking">
                    {apexSystem.closingSlide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            .apex-mobile-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .apex-mobile-scroll::-webkit-scrollbar { display: none; }
          `}</style>
        </>
      )}

      {/* -- VARIANTE B - cards grid estilo Sistema Completo ----------------- */}
      {isVariantB && (
        <div className="container-panthera pb-16 md:pb-28">
          {/* Desktop: grid 4 columnas x 2 filas */}
          <div className="hidden md:grid grid-cols-4 border-t border-l border-[rgba(245,245,245,0.06)]">
            {apexCardsB.map((phase, i) => (
              <div
                key={phase.number}
                className="group relative border-r border-b border-[rgba(245,245,245,0.06)] overflow-hidden p-8 cursor-default"
                style={{ minHeight: '240px' }}
              >
                <div
                  className="absolute inset-0 transition-[filter] duration-700 ease-out group-hover:[filter:brightness(1.08)_contrast(1.12)_saturate(1.04)]"
                  style={{
                    backgroundImage: `url('${MURAL_BG}')`,
                    backgroundSize: `${MURAL_SCALE_X * 100}% ${MURAL_SCALE_Y * 100}%`,
                    backgroundPosition: MURAL_CARD_POSITIONS[i % MURAL_CARD_POSITIONS.length],
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.3) contrast(1.04) saturate(0.66)',
                  }}
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.93)] group-hover:bg-[rgba(0,0,0,0.03)] transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/70 via-black/34 to-transparent z-10" aria-hidden="true" />
                <div className="grain-overlay opacity-[0.05]" aria-hidden="true" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="pt-[58%]">
                    <div className="h-[16px] mb-3">
                      <p
                        className="tabular-nums tracking-[0.06em] text-[#E3F78D]/45 group-hover:text-[#E3F78D]/80 transition-colors duration-300"
                        style={{
                          fontFamily: "'Helvetica Now Display', Helvetica, Arial, sans-serif",
                          fontWeight: 200, fontStyle: 'italic', fontSize: '0.72rem',
                        }}
                      >
                        {!phase.isFiller && `Fase ${phase.number}`}
                      </p>
                    </div>
                    <div className="w-5 h-px bg-panthera-green mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-serif text-sm md:text-base text-panthera-white group-hover:text-panthera-cream transition-colors duration-300 mb-2 leading-tight">
                      {phase.title}
                    </h3>
                    {!phase.isFiller && (
                      <p className="font-sans text-[10px] text-panthera-ash/70 group-hover:text-panthera-ash/88 leading-relaxed transition-opacity duration-400 delay-100 opacity-0 group-hover:opacity-100">
                        {phase.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: grid 2 columnas EXACTA tipo Sistema Completo A */}
          <div className="md:hidden mb-12">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0" aria-hidden="true">
                <img
                  src={MURAL_BG}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: '78% center',
                    filter: 'brightness(0.48) contrast(1.04) saturate(0.78) blur(0.6px)',
                    transform: 'scale(1.03)',
                  }}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/54" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/18 to-black/62" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/44" />
                <div className="grain-overlay opacity-[0.06]" aria-hidden="true" />
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-3">
                {apexCardsB.map((phase, i) => (
                  <div
                    key={`b-mob-${phase.number}`}
                    className="piece-card relative overflow-hidden border border-[rgba(245,245,245,0.075)] bg-black/42 backdrop-blur-[1px]"
                    style={{ minHeight: '220px' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-white/[0.015]" />
                    <div className="grain-overlay opacity-[0.035]" aria-hidden="true" />

                    <div className="relative z-10 h-full p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-sans text-[10px] text-panthera-green/85 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <span className="w-5 h-px bg-panthera-green/65" />
                      </div>

                      <h3 className="font-serif text-[1.05rem] leading-tight text-panthera-white mb-3">
                        {phase.title}
                      </h3>

                      {!phase.isFiller && (
                        <p className="font-sans text-[12px] leading-[1.5] text-panthera-white/86">
                          {phase.description.replace(/\n/g, ' ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cierre + CTA */}
          <div className="mt-12 md:mt-14 flex flex-col items-center text-center px-4">
            <p className="md:hidden font-serif italic text-panthera-cream leading-snug mb-8 max-w-2xl" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)' }}>
              {apexSystem.closingSlide.text.replace(/\n/g, ' ')}
            </p>
            <p className="hidden md:block font-serif italic text-panthera-cream leading-snug mb-8 max-w-2xl whitespace-pre-line" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)' }}>
              {apexSystem.closingSlide.text}
            </p>
            <Button variant="primary" href="#booking">
              {apexSystem.closingSlide.cta}
            </Button>
          </div>

          <style>{`
            .apex-mobile-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .apex-mobile-scroll::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
      )}
    </section>
  )
}

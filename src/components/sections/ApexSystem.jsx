import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { apexSystem } = landingCopy

// Renacentista images for panel backgrounds (cycle through available ones)
const PANEL_IMAGES = [
  '/renacentismo/2.png',
  '/renacentismo/4.png',
  '/renacentismo/6.png',
  '/renacentismo/8.png',
  '/renacentismo/2.png',
  '/renacentismo/4.png',
  '/renacentismo/6.png',
]

// Total panels = phases + 1 closing CTA panel
const TOTAL_PANELS = apexSystem.phases.length + 1

export default function ApexSystem() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const container = containerRef.current
        const track = trackRef.current
        if (!container || !track) return

        const ctx = gsap.context(() => {
          const totalWidth = (TOTAL_PANELS - 1) * window.innerWidth

          gsap.to(track, {
            x: () => -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  Math.floor(self.progress * TOTAL_PANELS),
                  TOTAL_PANELS - 1
                )
                setCurrentPhase(idx)
                // Animate progress bar
                if (progressRef.current) {
                  progressRef.current.style.transform = `scaleX(${self.progress})`
                }
              },
            },
          })
        })

        return () => ctx.revert()
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section
      ref={containerRef}
      className="relative bg-panthera-deep overflow-hidden"
    >
      {/* Fixed header overlay on the section */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none hidden md:block">
        <div className="container-panthera pt-8 flex items-center justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">
              {apexSystem.eyebrow}
            </p>
            <h2
              className="font-serif text-panthera-white leading-none mt-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {apexSystem.headline}
            </h2>
          </div>
          {/* Phase counter */}
          <div className="flex items-center gap-2 text-panthera-ash shrink-0">
            <span className="font-serif text-4xl text-panthera-white tabular-nums leading-none">
              {String(Math.min(currentPhase + 1, apexSystem.phases.length)).padStart(2, '0')}
            </span>
            <span className="text-sm text-panthera-ash/50">/</span>
            <span className="font-sans text-xs text-panthera-ash/50">
              {String(apexSystem.phases.length).padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-px bg-[rgba(245,245,245,0.06)] overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-panthera-green origin-left"
            style={{ transform: 'scaleX(0)', transition: 'none' }}
          />
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden container-panthera pt-16 pb-0">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-2">
          {apexSystem.eyebrow}
        </p>
        <h2
          className="font-serif text-panthera-white leading-tight mb-0"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          {apexSystem.headline}
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-nowrap md:flex-row"
        style={{ willChange: 'transform' }}
      >
        {apexSystem.phases.map((phase, i) => (
          <div
            key={phase.number}
            className="flex-shrink-0 w-full md:w-screen relative"
            style={{ minHeight: '100vh' }}
          >
            {/* Full-panel renacentista background */}
            <div className="absolute inset-0" aria-hidden="true">
              <img
                src={PANEL_IMAGES[i % PANEL_IMAGES.length]}
                alt=""
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Dark overlay for legibility */}
              <div className="absolute inset-0 bg-panthera-deep/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-panthera-deep/90 via-transparent to-panthera-deep/60" />
              <div className="grain-overlay" />
            </div>

            {/* Phase content — bottom anchored */}
            <div className="absolute bottom-0 left-0 right-0 container-panthera pb-14 md:pb-16">
              {/* Big ghost number */}
              <p
                className="font-serif text-[20vw] md:text-[18vw] text-panthera-white/[0.04] leading-none select-none -mb-8 pointer-events-none"
                aria-hidden="true"
              >
                {phase.number}
              </p>

              <div className="border-t border-[rgba(245,245,245,0.12)] pt-6 max-w-2xl">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-3">
                  Fase {phase.number}
                </p>
                <h3
                  className="font-serif text-panthera-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
                >
                  {phase.title}
                </h3>
                <p className="font-sans text-sm text-panthera-white/60 leading-relaxed max-w-lg">
                  {phase.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Closing CTA panel — last horizontal panel */}
        <div
          className="flex-shrink-0 w-full md:w-screen relative flex items-center justify-center text-center px-6"
          style={{ minHeight: '100vh' }}
        >
          {/* creation_panthera_hand.webp background — fallback to renacentismo */}
          <picture>
            <source srcSet="/images/creation_panthera_hand.webp" type="image/webp" />
            <img
              src="/renacentismo/2.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'grayscale(40%) brightness(0.35)' }}
            />
          </picture>
          <div className="absolute inset-0 bg-panthera-black/70" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="font-serif text-panthera-white leading-tight mb-12"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
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

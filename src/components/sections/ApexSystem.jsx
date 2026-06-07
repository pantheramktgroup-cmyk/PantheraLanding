import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { apexSystem } = landingCopy

const PANEL_IMAGES = [
  '/images/renaissance_hands_mirror.webp',
  '/images/renaissance_watch.webp',
  '/images/apex_system_renaissance_mural.webp',
  '/renacentismo/8.png',
  '/images/system_table_top_view.webp',
  '/images/renaissance_hands_mirror.webp',
  '/images/renaissance_watch.webp',
]

const TOTAL_PANELS = apexSystem.phases.length + 1

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
          const totalWidth = (TOTAL_PANELS - 1) * window.innerWidth

          // -- ST1: Pin + Snap — NO scrub, NO animation
          ScrollTrigger.create({
            trigger: pin,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (TOTAL_PANELS - 1),
              duration: { min: 0.4, max: 0.8 },
              delay: 0.2,
              ease: 'power2.inOut',
            },
          })

          // -- ST2: Animation — scrub, NO pin, NO snap
          gsap.to(track, {
            x: () => -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(Math.floor(self.progress * TOTAL_PANELS), TOTAL_PANELS - 1)
                setCurrentPhase(idx)
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
    { scope: pinRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="bg-panthera-deep">
      {/* INTRO */}
      <div className="container-panthera pt-28 md:pt-36 pb-20 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">{apexSystem.eyebrow}</p>
        <h2 className="font-serif text-panthera-white leading-tight mb-6 max-w-3xl" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
          {apexSystem.headline}
        </h2>
        <p className="font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">{apexSystem.subheadline}</p>
      </div>

      {/* PINNED HORIZONTAL SCROLL — desktop */}
      <div ref={pinRef} className="relative hidden md:block" style={{ height: '100vh', overflow: 'clip' }}>
        {/* Counter + progress bar — sits inside pinned area, below navbar */}
        <div className="absolute left-0 right-0 z-30 pointer-events-none" style={{ top: 'calc(88px + 1.5rem)' }}>
          <div className="container-panthera flex items-center justify-between">
            <div className="text-panthera-ash/40 font-sans text-[11px] uppercase tracking-[0.15em]">
              {apexSystem.eyebrow}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl text-panthera-white tabular-nums leading-none">
                {String(Math.min(currentPhase + 1, apexSystem.phases.length)).padStart(2, '0')}
              </span>
              <span className="text-panthera-ash/40">/</span>
              <span className="font-sans text-xs text-panthera-ash/40">
                {String(apexSystem.phases.length).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="mt-3 h-px bg-[rgba(245,245,245,0.06)] overflow-hidden">
            <div ref={progressRef} className="h-full bg-panthera-green origin-left" style={{ transform: 'scaleX(0)', transition: 'none' }} />
          </div>
        </div>

        {/* Track */}
        <div ref={trackRef} className="flex flex-nowrap h-full" style={{ willChange: 'transform' }}>
          {apexSystem.phases.map((phase, i) => (
            <div key={phase.number} className="flex-shrink-0 w-screen h-full relative">
              <div className="absolute inset-0" aria-hidden="true">
                <img src={PANEL_IMAGES[i % PANEL_IMAGES.length]} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-panthera-deep/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-panthera-deep via-panthera-deep/40 to-transparent" />
                <div className="grain-overlay" />
              </div>
              {/* Phase content — lower third */}
              <div className="absolute bottom-0 left-0 right-0 container-panthera pb-16 md:pb-20">
                <p className="font-serif text-[18vw] text-panthera-white/[0.04] leading-none select-none -mb-6 pointer-events-none" aria-hidden="true">
                  {phase.number}
                </p>
                <div className="border-t border-[rgba(245,245,245,0.12)] pt-7 max-w-2xl">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">Fase {phase.number}</p>
                  <h3 className="font-serif text-panthera-white leading-tight mb-5" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}>
                    {phase.title}
                  </h3>
                  <p className="font-sans text-sm text-panthera-white/60 leading-relaxed max-w-lg">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA panel */}
          <div className="flex-shrink-0 w-screen h-full relative flex items-center justify-center text-center px-6">
            <img src="/images/creation_panthera_hand.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(40%) brightness(0.35)' }} />
            <div className="absolute inset-0 bg-panthera-black/70" aria-hidden="true" />
            <div className="grain-overlay" aria-hidden="true" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="font-serif text-panthera-white leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
                {apexSystem.closingSlide.text}
              </p>
              <Button variant="fullScreen" href="#booking">{apexSystem.closingSlide.cta}</Button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {apexSystem.phases.map((phase, i) => (
          <div key={`mob-${phase.number}`} className="relative border-t border-[rgba(245,245,245,0.08)] py-16 px-6" style={{ minHeight: '70vh' }}>
            <div className="absolute inset-0" aria-hidden="true">
              <img src={PANEL_IMAGES[i % PANEL_IMAGES.length]} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-panthera-deep/85" />
              <div className="grain-overlay" />
            </div>
            <div className="relative z-10 max-w-lg">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">Fase {phase.number}</p>
              <h3 className="font-serif text-panthera-white leading-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{phase.title}</h3>
              <p className="font-sans text-sm text-panthera-white/60 leading-relaxed">{phase.description}</p>
            </div>
          </div>
        ))}
        <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
          <img src="/images/creation_panthera_hand.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(40%) brightness(0.35)' }} />
          <div className="absolute inset-0 bg-panthera-black/70" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-serif text-panthera-white leading-tight mb-10" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>{apexSystem.closingSlide.text}</p>
            <Button variant="fullScreen" href="#booking">{apexSystem.closingSlide.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

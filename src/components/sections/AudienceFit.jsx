import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const filtroAplicacionBg = '/images/renaissance_watch.webp'
const { audience } = landingCopy

export default function AudienceFit() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const yesItems = containerRef.current.querySelectorAll('.yes-item')
      gsap.from(yesItems, {
        opacity: 0,
        x: -16,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
      })

      const noItems = containerRef.current.querySelectorAll('.no-item')
      gsap.from(noItems, {
        opacity: 0,
        x: 16,
        stagger: 0.07,
        duration: 0.7,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-[#070707] section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
  <img
    src={filtroAplicacionBg}
    alt=""
    className="absolute inset-0 h-full w-full object-cover object-center"
    style={{
      opacity: 0.1,
      filter: 'grayscale(1) brightness(0.5) contrast(1.5) saturate(0.08)',
    }}
    loading="lazy"
  />

  {/* Oscurecimiento lateral general */}
  <div className="absolute inset-0 bg-gradient-to-l from-black/18 via-black/46 to-black/82" />

  {/* Top oscuro, pero no mata toda la sección */}
  <div
    className="absolute inset-x-0 top-0 h-[340px]"
    style={{
      background:
        'linear-gradient(to bottom, #000000 0%, #000000 24%, rgba(0,0,0,0.82) 48%, rgba(0,0,0,0.36) 76%, rgba(0,0,0,0) 100%)',
    }}
  />

  {/* Oscuridad suave en el medio, mucho más leve */}
  <div
    className="absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse 82% 64% at 50% 42%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 46%, rgba(0,0,0,0.34) 100%)',
    }}
  />

  {/* Gradiente inferior — NO TOCAR */}
  <div
    className="absolute inset-x-0 bottom-0 h-[240px]"
    style={{
      background:
        'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.2) 34%, rgba(5,5,5,0.42) 56%, rgba(5,5,5,0.72) 78%, #050505 100%)',
    }}
  />

  <div className="absolute inset-0 bg-black/4" />
  <div className="grain-overlay opacity-[0.06]" aria-hidden="true" />
</div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        <div className="max-w-2xl mb-14">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            {audience.eyebrow}
          </p>
          <h2
            className="font-serif text-panthera-white leading-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
          >
            {audience.headline}
          </h2>
          <p className="font-sans text-sm text-panthera-ash leading-relaxed">
            {audience.subheadline}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-14">
          <div className="yes-col relative bg-[rgba(10,14,10,0.48)] backdrop-blur-[2px] p-10 md:p-14 border border-[rgba(227,247,141,0.25)] shadow-[inset_0_0_0_1px_rgba(227,247,141,0.08),inset_0_0_48px_rgba(149,171,84,0.08)] overflow-hidden">
            <div className="absolute inset-0 grain-overlay opacity-[0.18]" aria-hidden="true" />
            <div className="absolute left-0 top-8 bottom-8 w-px bg-panthera-green/40" aria-hidden="true" />
            <p className="relative z-10 font-sans text-[10px] uppercase tracking-[0.24em] text-panthera-green mb-8 font-semibold">
              {audience.yesTitle}
            </p>
            <ol className="relative z-10 space-y-5">
              {audience.yesItems.map((item, i) => (
                <li key={i} className="yes-item flex items-start gap-4">
                  <span className="font-sans text-xs text-panthera-green tabular-nums shrink-0 pt-0.5 font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-panthera-white/92 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="no-col bg-[rgba(10,10,10,0.58)] p-10 md:p-14 border border-[rgba(245,245,245,0.08)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FF4A4ACC] mb-8">
              {audience.noTitle}
            </p>
            <ol className="space-y-5 opacity-100">
              {audience.noItems.map((item, i) => (
                <li key={i} className="no-item flex items-start gap-4">
                  <span className="font-sans text-xs text-[#FF4A4ACC] tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-[#FF7171CC] leading-snug line-through decoration-[#FF4A4A]/45 decoration-[0.5px]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Button variant="primary" href="#booking">
          {audience.cta}
        </Button>
      </div>
    </section>
  )
}
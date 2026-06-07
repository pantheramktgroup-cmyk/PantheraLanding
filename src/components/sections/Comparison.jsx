import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { comparison } = landingCopy

export default function Comparison() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const leftItems = containerRef.current.querySelectorAll('.traditional-item')
      gsap.from(leftItems, {
        opacity: 0,
        x: -16,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 72%', once: true },
      })

      const rightItems = containerRef.current.querySelectorAll('.panthera-item')
      gsap.from(rightItems, {
        opacity: 0,
        x: 16,
        stagger: 0.07,
        duration: 0.7,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 72%', once: true },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative overflow-hidden bg-panthera-black section-pad">
      {/* panthera_vs_agency_contrast.webp background — fallback to renacentismo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <picture>
          <source srcSet="/images/panthera_vs_agency_contrast.webp" type="image/webp" />
          <img
            src="/renacentismo/6.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(50%) brightness(0.25)' }}
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-panthera-black/70" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            {comparison.eyebrow}
          </p>
          <h2
            className="font-serif text-panthera-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {comparison.headline}
          </h2>
          <p className="font-sans text-sm text-panthera-ash leading-relaxed">
            {comparison.subheadline}
          </p>
        </div>

        {/* Manifesto two-panel — better contrast on both sides */}
        <div className="grid md:grid-cols-2 gap-px bg-[rgba(245,245,245,0.08)] mb-16">
          {/* Traditional — visible but dimmed / secondary hierarchy */}
          <div className="bg-[rgba(18,18,17,0.85)] p-10 md:p-14 backdrop-blur-sm">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-ash/70 mb-8">
              {comparison.traditional.title}
            </p>
            <ul className="space-y-5">
              {comparison.traditional.items.map((item, i) => (
                <li key={i} className="traditional-item flex items-start gap-4">
                  <span className="font-sans text-xs text-panthera-ash/50 tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-panthera-ash/70 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panthera — illuminated, higher hierarchy */}
          <div className="bg-[rgba(227,247,141,0.04)] p-10 md:p-14 backdrop-blur-sm border-l border-[rgba(227,247,141,0.12)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-8">
              {comparison.panthera.title}
            </p>
            <ul className="space-y-5">
              {comparison.panthera.items.map((item, i) => (
                <li key={i} className="panthera-item flex items-start gap-4">
                  <span className="font-sans text-xs text-panthera-green tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-panthera-white leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing + CTA */}
        <div className="max-w-2xl mb-10">
          <p
            className="font-serif italic text-panthera-cream leading-snug"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
          >
            {comparison.closing}
          </p>
        </div>

        <Button variant="primary" href="#booking">
          {comparison.cta}
        </Button>
      </div>
    </section>
  )
}

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
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/panthera_vs_agency_transition.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            filter:
              'grayscale(1) brightness(0.06) contrast(1.03) saturate(0.08) blur(1.2px)',
          }}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/98 to-black/96" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-transparent to-black/96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.76)_100%)]" />

        <div
          className="grain-overlay opacity-[0.06]"
          style={{ mixBlendMode: 'soft-light' }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse 60% 90% at 100% 90%, #000000 0%, #000000 26%, rgba(0,0,0,0.98) 40%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.48) 74%, rgba(0,0,0,0.16) 88%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="grain-overlay opacity-[0.08] md:opacity-[0.2]" aria-hidden="true" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-16">
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

        {/* Two-panel comparison */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-16">
          {/* Traditional */}
          <div className="bg-[rgba(12,12,11,0.84)] p-7 md:p-14 border border-[rgba(245,245,245,0.06)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-panthera-ash/65 md:text-panthera-ash/80 mb-6 md:mb-8 font-medium">
              {comparison.traditional.title}
            </p>

            <ul className="space-y-4 md:space-y-5">
              {comparison.traditional.items.map((item, i) => (
                <li key={i} className="traditional-item flex items-start gap-3 md:gap-4">
                  <span className="font-sans text-[11px] md:text-xs text-panthera-ash/45 md:text-panthera-ash/60 tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-sans text-[13px] md:text-sm text-panthera-ash/58 md:text-panthera-ash/75 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panthera */}
          <div className="bg-[linear-gradient(160deg,rgba(227,247,141,0.08)_0%,rgba(227,247,141,0.04)_56%,rgba(10,10,10,0.52)_100%)] p-7 md:p-14 border border-panthera-green/20 shadow-[inset_0_0_0_1px_rgba(227,247,141,0.08)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-panthera-green mb-6 md:mb-8 font-medium">
              {comparison.panthera.title}
            </p>

            <ul className="space-y-4 md:space-y-5">
              {comparison.panthera.items.map((item, i) => (
                <li key={i} className="panthera-item flex items-start gap-3 md:gap-4">
                  <span className="font-sans text-[11px] md:text-xs text-panthera-green tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-sans text-[13px] md:text-sm text-panthera-white leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing + CTA */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p
            className="font-serif italic text-panthera-cream leading-snug"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.5rem)' }}
          >
            {comparison.closing}
          </p>
        </div>

        <Button
          variant="primary"
          href="#booking"
          className="w-full md:w-auto text-[11px] md:text-sm px-6 md:px-8"
        >
          {comparison.cta}
        </Button>
      </div>
    </section>
  )
}
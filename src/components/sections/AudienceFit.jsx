import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

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
    <section className="relative bg-panthera-deep section-pad overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/renacentismo/8.png"
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-cover opacity-[0.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-panthera-deep/90" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Header */}
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

        {/* Full-width two panels, flush */}
        <div className="grid md:grid-cols-2 gap-px bg-[rgba(245,245,245,0.06)] mb-14">
          {/* YES */}
          <div className="yes-col bg-panthera-deep p-10 md:p-14">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-8">
              {audience.yesTitle}
            </p>
            <ol className="space-y-5">
              {audience.yesItems.map((item, i) => (
                <li key={i} className="yes-item flex items-start gap-4">
                  <span className="font-sans text-xs text-panthera-green tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-panthera-white/80 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* NO — more visible, admission filter aesthetic */}
          <div className="no-col bg-panthera-black p-10 md:p-14 border border-[rgba(245,245,245,0.1)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-panthera-ash mb-8">
              {audience.noTitle}
            </p>
            <ol className="space-y-5">
              {audience.noItems.map((item, i) => (
                <li key={i} className="no-item flex items-start gap-4">
                  <span className="font-sans text-xs text-panthera-ash/70 tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-sm text-panthera-ash/85 leading-snug">
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

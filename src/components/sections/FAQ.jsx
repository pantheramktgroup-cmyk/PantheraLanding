import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'

const { faq } = landingCopy

export default function FAQ() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const els = containerRef.current.querySelectorAll('.faq-reveal')
      gsap.from(els, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-panthera-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/last_night.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(1.16) rotate(-0.4deg) translate3d(1%, -0.4%, 0)',
            transformOrigin: 'center',
            filter: 'grayscale(1) saturate(0.42) brightness(0.3) contrast(1.1) blur(7px)',
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-panthera-black/94 via-panthera-black/86 to-panthera-black/74" />
        <div className="absolute inset-0 bg-gradient-to-t from-panthera-black/82 via-panthera-black/46 to-panthera-black/24" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_6%,rgba(240,240,240,0.08)_0%,rgba(185,164,106,0.04)_36%,rgba(10,10,10,0)_70%)]" />
        <div className="grain-overlay opacity-[0.12]" aria-hidden="true" />
      </div>
      <div ref={containerRef} className="relative z-10 container-panthera">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="faq-reveal font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
              {faq.eyebrow}
            </p>
            <h2
              className="faq-reveal font-serif text-panthera-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              {faq.headline}
            </h2>
          </div>

          {/* Accordion */}
          <div className="faq-reveal">
            <Accordion items={faq.items} />
          </div>

          {/* CTA below accordion */}
          <div className="faq-reveal mt-14">
            <Button variant="primary" href="#booking">
              {faq.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

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
        {/* Fondo único difuminado */}
        <img
          src="/images/faqs.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
            transform: 'scale(1.01)',
            transformOrigin: 'center',
            filter: 'brightness(0.52) contrast(1.08) saturate(0.72) blur(3px)',
          }}
          loading="lazy"
        />

        {/* Overlay lateral para lectura */}
        <div className="absolute inset-0 bg-gradient-to-r from-panthera-black/84 via-panthera-black/66 to-panthera-black/48" />

        {/* Overlay vertical */}
        <div className="absolute inset-0 bg-gradient-to-t from-panthera-black/76 via-panthera-black/36 to-panthera-black/18" />

        {/* Viñeta suave */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 55% 42%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.18) 48%, rgba(0,0,0,0.64) 100%)',
          }}
        />

        {/* Grano */}
        <div className="grain-overlay opacity-[0.18]" aria-hidden="true" />
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
          <div className="faq-reveal faq-question-layer">
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

      <style>{`
        .faq-question-layer > * > * {
  position: relative;
  background: transparent;
  border: none;
}

.faq-question-layer > * > *::before {
  content: '';
  position: absolute;
  inset: 0 -32px;
  background: rgba(5, 5, 5, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: -1;
  transition: background-color 300ms ease, border-color 300ms ease;
}

        .faq-question-layer > * > *:hover::before {
  background: rgba(5, 5, 5, 0.34);
  border-color: rgba(255, 255, 255, 0.07);
}

        .faq-question-layer > * > * + * {
          margin-top: 8px;
        }
      `}</style>
    </section>
  )
}
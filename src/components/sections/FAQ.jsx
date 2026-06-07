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
    <section className="bg-panthera-black section-pad overflow-hidden">
      <div ref={containerRef} className="container-panthera">
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

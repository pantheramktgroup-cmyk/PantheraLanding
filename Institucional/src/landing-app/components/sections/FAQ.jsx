import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'

const { faq } = landingCopy
const SHOW_FAQ_CTA = false

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
    <section className="faq-section is-variant-b relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Fondo único difuminado */}
        <img
          src="/images/faqs.webp"
          alt=""
          className="faq-bg-img absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay lateral para lectura */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/68 to-black/50" />

        {/* Overlay vertical general */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/34 to-black/22" />

        {/* Viñeta redonda */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 52% at 50% 45%, rgba(255,255,255,0.035) 0%, rgba(0,0,0,0.08) 36%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.88) 100%)',
          }}
        />

        {/* Fade superior */}
        <div
          className="absolute inset-x-0 top-0 h-[180px]"
          style={{
            background:
              'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.86) 30%, rgba(0,0,0,0.38) 68%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Fade inferior */}
        <div
          className="absolute inset-x-0 bottom-0 h-[210px]"
          style={{
            background:
              'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.86) 32%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="grain-overlay opacity-[0.2]" aria-hidden="true" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="faq-header mb-14 md:mb-12">
            <p className="faq-reveal font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
              {faq.eyebrow}
            </p>

            <h2 className="faq-reveal md:hidden font-serif text-panthera-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              {faq.headline.replace(/\n/g, ' ')}
            </h2>

            <h2 className="faq-reveal hidden md:block font-serif text-panthera-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              {faq.headline}
            </h2>
          </div>

          {/* Accordion */}
          <div className="faq-reveal faq-question-layer">
            <Accordion items={faq.items} />
          </div>

          {/* CTA below accordion (temporarily disabled, keep code for easy restore) */}
          {SHOW_FAQ_CTA && (
            <div className="faq-reveal faq-cta mt-14">
              <div className="flex justify-center md:justify-start">
                <Button
                  variant="primary"
                  href="#booking"
                >
                  {faq.cta}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .faq-bg-img {
          object-position: center center;
          transform: scale(1.01);
          transform-origin: center;
          filter: brightness(0.62) contrast(1.08) saturate(1.25) blur(3px);
        }

        .faq-section.is-variant-b .faq-bg-img {
          filter: grayscale(1) brightness(0.62) contrast(1.08) blur(3px);
        }

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

        @media (max-width: 767px) {
          .faq-section {
            padding-top: 5.25rem;
            padding-bottom: 5rem;
          }

        .faq-bg-img {
          object-position: 66% center;
          transform: translateY(12%) scale(1.1);
          transform-origin: center;
          filter: brightness(0.54) contrast(1.08) saturate(1.12) blur(3.5px);
        }

        .faq-section.is-variant-b .faq-bg-img {
          filter: grayscale(1) brightness(0.54) contrast(1.08) blur(3.5px);
        }

          .faq-header {
            margin-bottom: 2.25rem;
          }

          .faq-header h2 {
            font-size: clamp(1.75rem, 7.2vw, 2.15rem) !important;
            line-height: 1.12;
            max-width: 18ch;
          }

          .faq-question-layer > * > *::before {
            inset: 0 -18px;
            background: rgba(5, 5, 5, 0.34);
            border-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
          }

          .faq-question-layer > * > *:hover::before {
            background: rgba(5, 5, 5, 0.4);
          }

          .faq-question-layer > * > * + * {
            margin-top: 7px;
          }

          .faq-question-layer button,
          .faq-question-layer [role='button'] {
            padding-top: 1rem;
            padding-bottom: 1rem;
            font-size: 13px;
            line-height: 1.35;
          }

          .faq-cta {
            margin-top: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
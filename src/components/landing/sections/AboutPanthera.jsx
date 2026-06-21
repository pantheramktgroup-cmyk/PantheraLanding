import { useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'
import { landingCopy } from '../../../content/landing/landingCopy'
import Button from '../ui/Button'

const { about } = landingCopy

export default function AboutPanthera() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const bodyEls = containerRef.current.querySelectorAll('.about-reveal')

      gsap.from(bodyEls, {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.9,
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
    <section className="about-panthera-section bg-panthera-black section-pad overflow-hidden">
      <div ref={containerRef} className="container-panthera">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] gap-12 lg:gap-20 items-center">
          {/* Copy column */}
          <div>
            <p className="about-reveal font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
              {about.eyebrow}
            </p>

            <h2
              className="about-reveal md:hidden font-serif text-panthera-white leading-tight mb-10"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
            >
              {about.headline.replace(/\n/g, ' ')}
            </h2>

            <h2
              className="about-reveal hidden md:block font-serif text-panthera-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
            >
              {about.headline}
            </h2>

            <div className="space-y-5 mb-8 max-w-4xl">
              <p className="about-reveal font-sans text-sm text-panthera-ash leading-relaxed">
                {about.body}
              </p>

              <p className="about-reveal font-sans text-sm text-panthera-ash leading-relaxed">
                {about.body2}
              </p>
            </div>

            {/* CTA desktop only */}
            <div className="about-reveal hidden md:flex justify-start">
              <Button variant="primary" href="#booking">
                {about.cta}
              </Button>
            </div>

            {/* Mobile image */}
            <div className="about-reveal lg:hidden mt-10">
              <div className="relative overflow-hidden border border-[rgba(245,245,245,0.08)] bg-black/40">
                <img
                  src="/images/fundadores.webp"
                  alt="Fundadores de Panthera"
                  className="w-full h-auto object-cover"
                  style={{
                    filter: 'grayscale(1) brightness(0.64) contrast(1.12)',
                  }}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-panthera-black/18" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                <div className="grain-overlay opacity-[0.05]" aria-hidden="true" />
              </div>
            </div>

            {/* CTA mobile only - debajo de la foto */}
            <div className="about-reveal flex justify-center mt-8 md:hidden">
              <Button variant="primary" href="#booking">
                {about.cta}
              </Button>
            </div>
          </div>

          {/* Desktop collage column */}
          <div className="hidden lg:block relative max-w-[440px] mx-auto lg:mx-0 lg:self-center">
            <div className="grid grid-cols-2 gap-x-4 md:gap-x-5">
              {/* Columna izquierda */}
              <div className="flex flex-col gap-4 md:gap-5 pt-8 md:pt-10">
                {/* Founder 1 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <img
                    src={about.founders[0].src}
                    alt={about.founders[0].name}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-[1.08]"
                    style={{ filter: 'grayscale(1) brightness(0.5) contrast(1.18)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-panthera-black/34" />
                  <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
                  <div className="absolute inset-0 border border-[rgba(245,245,245,0.08)]" />
                </div>

                {/* Fundador 1 */}
                <div className="relative aspect-[3/4] overflow-hidden -ml-3 md:-ml-5 z-20 bg-black/40">
                  <img
                    src="/images/fundador_1.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-[1.08]"
                    style={{ filter: 'grayscale(1) brightness(0.5) contrast(1.18)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-panthera-black/24" />
                  <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
                  <div className="absolute inset-0 border border-[rgba(245,245,245,0.07)]" />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="flex flex-col gap-4 md:gap-5 -translate-y-4 md:-translate-y-7">
                {/* Fundador 2 */}
                <div className="relative aspect-[3/4] overflow-hidden -mr-3 md:-mr-5 z-20 bg-black/40">
                  <img
                    src="/images/fundador_2.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-[1.08]"
                    style={{ filter: 'grayscale(1) brightness(0.5) contrast(1.18)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-panthera-black/24" />
                  <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
                  <div className="absolute inset-0 border border-[rgba(245,245,245,0.07)]" />
                </div>

                {/* Founder 2 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40 z-10">
                  <img
                    src={about.founders[1].src}
                    alt={about.founders[1].name}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-[1.08]"
                    style={{ filter: 'grayscale(1) brightness(0.5) contrast(1.18)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-panthera-black/34" />
                  <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
                  <div className="absolute inset-0 border border-[rgba(245,245,245,0.08)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-panthera-section {
            padding-top: 4.75rem;
            padding-bottom: 4.75rem;
          }
        }
      `}</style>
    </section>
  )
}
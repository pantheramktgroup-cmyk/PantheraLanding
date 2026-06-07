import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
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
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
      })

      // Parallax on collage images
      const imgs = containerRef.current.querySelectorAll('.collage-img')
      imgs.forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -6 : 6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="bg-panthera-black section-pad overflow-hidden">
      <div ref={containerRef} className="container-panthera">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Copy column */}
          <div>
            <p className="about-reveal font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
              {about.eyebrow}
            </p>
            <h2
              className="about-reveal font-serif text-panthera-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
            >
              {about.headline}
            </h2>

            <div className="space-y-5 mb-8">
              <p className="about-reveal font-sans text-sm text-panthera-ash leading-relaxed">
                {about.body}
              </p>
              <p className="about-reveal font-sans text-sm text-panthera-ash leading-relaxed">
                {about.body2}
              </p>
              <p className="about-reveal font-sans text-sm text-panthera-ash leading-relaxed">
                {about.body3}
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="about-reveal border-l-2 border-panthera-gold pl-6 mb-10">
              <p
                className="font-serif italic text-panthera-cream leading-snug"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
              >
                {about.pullQuote}
              </p>
            </blockquote>

            <div className="about-reveal">
              <Button variant="secondary" href="#booking">
                {about.cta}
              </Button>
            </div>
          </div>

          {/* Collage column: 2 founders + 2 renacentista */}
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {/* Founder 1 */}
            <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
              <img
                src={about.founders[0].src}
                alt={about.founders[0].name}
                className="collage-img absolute inset-0 w-full h-full object-cover object-top grayscale contrast-110 scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.08)]" />
            </div>

            {/* Renacentismo 1 — offset top */}
            <div className="relative overflow-hidden mt-8" style={{ minHeight: '260px' }}>
              <img
                src="/renacentismo/4.png"
                alt=""
                aria-hidden="true"
                className="collage-img absolute inset-0 w-full h-full object-cover grayscale opacity-60 scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-panthera-deep/30" />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.06)]" />
            </div>

            {/* Renacentismo 2 */}
            <div className="relative overflow-hidden -mt-4" style={{ minHeight: '200px' }}>
              <img
                src="/renacentismo/6.png"
                alt=""
                aria-hidden="true"
                className="collage-img absolute inset-0 w-full h-full object-cover grayscale opacity-40 scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-panthera-black/50" />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.06)]" />
            </div>

            {/* Founder 2 */}
            <div className="relative overflow-hidden" style={{ minHeight: '200px' }}>
              <img
                src={about.founders[1].src}
                alt={about.founders[1].name}
                className="collage-img absolute inset-0 w-full h-full object-cover object-top grayscale contrast-110 scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.08)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

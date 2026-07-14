import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const renaissanceWatch = '/images/renaissance_watch.webp'
const { transformation } = landingCopy

export default function TransformationStatement() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const imgRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const split = new SplitType(headlineRef.current, { types: 'lines' })

      split.lines.forEach((line) => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode.insertBefore(wrap, line)
        wrap.appendChild(line)
      })

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.09,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 80%', once: true },
      })

      const ideas = containerRef.current.querySelectorAll('.idea-item')
      gsap.from(ideas, {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: ideas[0], start: 'top 82%', once: true },
      })

      gsap.to(imgRef.current, {
        yPercent: 8,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => split.revert()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-black overflow-hidden section-pad">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          ref={imgRef}
          src={renaissanceWatch}
          alt=""
          className="w-full h-full object-cover object-right"
          style={{
            opacity: 0.34,
            transform: 'scale(1.04)',
            filter: 'grayscale(1) brightness(0.72) contrast(1.12)',
          }}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30" />

        <div
          className="absolute inset-x-0 top-0 h-[260px]"
          style={{
            background:
              'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[300px]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(10,9,9,0.82) 62%, #0A0909 100%)',
          }}
        />

        <div className="grain-overlay opacity-[0.12]" aria-hidden="true" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        <h2 className="md:hidden font-serif text-panthera-white leading-tight mb-12 max-w-5xl" style={{ fontSize: 'clamp(1.55rem, 3.2vw, 2.7rem)' }}>
          {transformation.headline.replace(/\n/g, ' ')}
        </h2>

        <h2
          ref={headlineRef}
          className="hidden md:block font-serif text-panthera-white leading-tight md:mb-12 max-w-5xl"
          style={{ fontSize: 'clamp(1.55rem, 3.2vw, 2.7rem)' }}
        >
          {transformation.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12 max-w-6xl mx-auto">
          {transformation.ideas.map((idea) => (
            <article
              key={idea.number}
              className="idea-item group relative overflow-hidden border border-[rgba(227,247,141,0.18)] bg-[#0a0a09]/85 px-5 py-6 md:px-6 md:py-7 transformation-card"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40" aria-hidden="true" />
              <div className="grain-overlay opacity-[0.08]" aria-hidden="true" />
              {/* Diagonal shine sweep on hover */}
              <div className="transformation-shine pointer-events-none" aria-hidden="true" />

              <div className="relative z-10">
                <p className="font-sans text-[1.2rem] md:text-[1.55rem] text-panthera-green tabular-nums mb-4 tracking-[0.06em] leading-none font-bold">
                  {idea.number}
                </p>
                <p className="font-sans text-sm text-panthera-white/76 leading-relaxed">
                  {idea.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="body-reveal flex justify-center md:justify-start">
          <Button variant="primary" href="#booking">
            {transformation.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
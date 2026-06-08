import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'
import renaissanceWatch from '../../assets/images/renaissance_watch.webp'

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
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-24 items-start">
          <div>
            <h2
              ref={headlineRef}
              className="font-serif text-panthera-white leading-tight mb-14"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.4rem)' }}
            >
              {transformation.headline}
            </h2>

            <div className="body-reveal">
              <Button variant="secondary" href="#booking">
                {transformation.cta}
              </Button>
            </div>
          </div>

          <div className="space-y-8 pt-1">
            {transformation.ideas.map((idea) => (
              <div key={idea.number} className="idea-item flex gap-4 items-start">
                <span className="font-sans text-xs text-panthera-green tabular-nums shrink-0 pt-0.5">
                  {idea.number}
                </span>
                <p className="font-sans text-sm text-panthera-ash leading-relaxed">
                  {idea.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
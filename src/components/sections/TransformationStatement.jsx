import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

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
        y: 20,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: ideas[0], start: 'top 82%', once: true },
      })

      // Parallax on image
      gsap.to(imgRef.current, {
        yPercent: 10,
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
    <section className="relative bg-panthera-black overflow-hidden section-pad">
      {/* Right-side renacentista image */}
      <div className="absolute inset-y-0 right-0 w-[45%] overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
        <img
          ref={imgRef}
          src="/images/renaissance_watch.webp"
          alt=""
          className="w-full h-full object-cover object-left grayscale opacity-20 scale-[1.1]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-panthera-black to-panthera-black/20" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        <div className="grid lg:grid-cols-[1fr_380px] gap-14 lg:gap-24 items-start">
          {/* Left: headline */}
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

          {/* Right: 3 numbered ideas */}
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

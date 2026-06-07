import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { problem } = landingCopy

export default function CoreProblem() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      // Headline split animation
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
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      // Symptoms stagger in
      const symptoms = containerRef.current.querySelectorAll('.symptom-item')
      gsap.from(symptoms, {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: symptoms[0],
          start: 'top 80%',
          once: true,
        },
      })

      // Closing text
      const closing = containerRef.current.querySelector('.closing-text')
      gsap.from(closing, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: closing,
          start: 'top 82%',
          once: true,
        },
      })

      return () => split.revert()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-panthera-deep section-pad overflow-hidden">
      {/* Renacentista image — subtle background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/renacentismo/4.png"
          alt=""
          className="absolute right-0 top-0 w-1/2 h-full object-cover object-left opacity-[0.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-panthera-deep via-panthera-deep/90 to-panthera-deep/60" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        <div className="max-w-4xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            {problem.eyebrow}
          </p>

          <h2
            ref={headlineRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-panthera-white leading-tight mb-10"
          >
            {problem.headline}
          </h2>

          {/* Body */}
          <div className="space-y-5 mb-12 max-w-2xl">
            <p className="font-sans text-base md:text-lg text-panthera-ash leading-relaxed">
              {problem.body}
            </p>
            <p className="font-sans text-base md:text-lg text-panthera-ash leading-relaxed">
              {problem.body2}
            </p>
          </div>

          {/* Symptom list */}
          <ul className="space-y-3 mb-12">
            {problem.symptoms.map((s, i) => (
              <li key={i} className="symptom-item flex items-start gap-4">
                <span className="shrink-0 mt-2 w-px h-4 bg-panthera-green" aria-hidden="true" />
                <span className="font-sans text-sm md:text-base text-panthera-white/70 leading-snug">
                  {s}
                </span>
              </li>
            ))}
          </ul>

          {/* Closing statement */}
          <p className="closing-text font-serif italic text-xl md:text-2xl text-panthera-cream mb-10">
            {problem.closing}
          </p>

          <Button variant="primary" href="#booking">
            {problem.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

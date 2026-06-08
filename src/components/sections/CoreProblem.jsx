import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const cuelloBotella = '/images/cuello_botella.webp'
const { problem } = landingCopy

export default function CoreProblem() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
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
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 78%',
          once: true,
        },
      })

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
    <section className="relative bg-[#050505] section-pad overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
  <img
    src={cuelloBotella}
    alt=""
    className="absolute right-0 top-0 h-full w-[54%] object-cover object-left opacity-[0.42]"
    style={{
      filter: 'brightness(0.78) contrast(1.08) saturate(0.82)',
    }}
    loading="lazy"
  />

  {/* Base: mantiene el inicio negro y termina en #050505 */}
  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(to bottom, #000000 0%, #000000 7%, rgba(3,3,3,0.94) 18%, rgba(10,8,6,0.72) 34%, rgba(20,15,11,0.54) 52%, rgba(9,7,6,0.76) 78%, #050505 100%)',
    }}
  />

  {/* Fusión izquierda: mantiene el copy sobre negro sin cortar la imagen */}
  <div
    className="absolute inset-y-0 left-0 w-[76%]"
    style={{
      background:
        'linear-gradient(to right, #000000 0%, rgba(0,0,0,0.98) 30%, rgba(6,5,4,0.9) 52%, rgba(18,13,10,0.54) 74%, rgba(18,13,10,0) 100%)',
    }}
  />

  {/* Puente cálido sutil hacia la imagen, sin ocupar toda la pantalla */}
  <div
    className="absolute inset-y-0 right-0 w-[58%]"
    style={{
      background:
        'radial-gradient(circle at 54% 52%, rgba(42,32,23,0.28) 0%, rgba(25,18,13,0.18) 34%, rgba(0,0,0,0) 72%)',
    }}
  />

  {/* Top suave: no generar franja dura */}
  <div
    className="absolute top-0 left-0 right-0 h-[260px]"
    style={{
      background:
        'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.88) 32%, rgba(5,5,5,0.46) 66%, rgba(5,5,5,0) 100%)',
    }}
  />

  {/* Bottom limpio hacia #050505 */}
  <div
    className="absolute bottom-0 left-0 right-0 h-[340px]"
    style={{
      background:
        'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.72) 58%, #050505 100%)',
    }}
  />

  <div className="grain-overlay opacity-[0.05]" aria-hidden="true" />

</div>

      <div ref={containerRef} className="relative z-20 container-panthera">
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

          <div className="space-y-5 mb-12 max-w-2xl">
            <p className="font-sans text-base md:text-lg text-panthera-ash leading-relaxed">
              {problem.body}
            </p>
            <p className="font-sans text-base md:text-lg text-panthera-ash leading-relaxed">
              {problem.body2}
            </p>
          </div>

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
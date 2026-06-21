import { useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'
import { landingCopy } from '../../../content/landing/landingCopy'
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

      const headlineLines = containerRef.current.querySelectorAll('.problem-headline-line')

      gsap.from(headlineLines, {
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

      return () => {}
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-[#050505] py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img
          src={cuelloBotella}
          alt=""
          className="absolute right-0 top-0 h-full w-[70%] md:w-[54%] object-cover object-left opacity-[0.28] md:opacity-[0.42]"
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
        <div className="max-w-5xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            {problem.eyebrow}
          </p>

          <h2 className="md:hidden font-serif text-[1.35rem] text-panthera-white leading-[1.12] mb-8">
            {problem.headline.replace(/\n/g, ' ')}
          </h2>

          <h2
            ref={headlineRef}
            className="hidden md:block font-serif md:text-[2rem] lg:text-[2.45rem] text-panthera-white md:leading-[1.14] md:mb-10"
          >
            {problem.headline.split('\n').map((line, index) => (
              <span key={index} className="block overflow-hidden">
                <span className="problem-headline-line block">{line}</span>
              </span>
            ))}
          </h2>

          <div className="space-y-4 md:space-y-5 mb-8 md:mb-12 max-w-3xl">
            <p className="font-sans text-[13.5px] md:text-lg text-panthera-ash leading-relaxed">
              {problem.body}
            </p>

            <p className="hidden md:block font-sans text-base md:text-lg text-panthera-ash leading-relaxed">
              {problem.body2}
            </p>
          </div>

          <ul className="space-y-3 mb-8 md:mb-12">
            {problem.symptoms.map((s, i) => (
              <li
                key={i}
                className={`symptom-item ${
                  i > 2 ? 'hidden md:flex' : 'flex'
                } items-start gap-3 md:gap-4`}
              >
                <span className="shrink-0 mt-2 w-px h-4 bg-panthera-green" aria-hidden="true" />
                <span className="font-sans text-[13px] md:text-base text-panthera-white/70 leading-snug">
                  {s}
                </span>
              </li>
            ))}
          </ul>

          <p className="closing-text md:hidden font-serif italic text-[0.96rem] text-panthera-cream mb-10 max-w-[440px] leading-snug">
            {problem.closing.replace(/\n/g, ' ')}
          </p>

          <p className="closing-text hidden md:block font-serif italic md:text-[1.35rem] text-panthera-cream md:mb-10 md:max-w-[760px] leading-snug whitespace-pre-line">
            {problem.closing}
          </p>

          <div className="flex justify-center md:justify-start">
            <Button
              variant="primary"
              href="#booking"
            >
              {problem.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
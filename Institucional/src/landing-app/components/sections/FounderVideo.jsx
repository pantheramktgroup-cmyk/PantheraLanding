import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'
import VslPlayer from '../ui/VslPlayer'

const { video } = landingCopy

export default function FounderVideo() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  const videoEyebrow = video.eyebrow
  const videoHeadline = video.headline
  const videoMobileHeadline = video.mobileHeadline ?? video.headline
  const videoCta = video.cta

  useGSAP(
    () => {
      if (prefersReduced) return

      const els = containerRef.current.querySelectorAll('.reveal-el')
      gsap.from(els, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.fromTo(
        '.video-shell',
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.video-shell',
            start: 'top 80%',
            once: true,
          },
        }
      )
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #000000 0%, #050505 28%, #0b0c0b 70%, #141514 100%)',
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(185,164,106,0.08),transparent_56%)]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)',
          }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_76%,rgba(227,247,141,0.05),transparent_52%)]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)',
          }}
        />
      </div>

      <div
        className="grain-overlay"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 16%, black 38%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 16%, black 38%, black 100%)',
        }}
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Centered header */}
        <div className="text-center mb-14 md:mb-12 reveal-el">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">
            {videoEyebrow}
          </p>

          {/* Mobile headline */}
          <div
            className="md:hidden font-serif text-panthera-white leading-[1.12] mx-auto text-center max-w-[390px]"
            style={{ fontSize: 'clamp(1.55rem, 6.2vw, 1.9rem)' }}
          >
            <p>{videoMobileHeadline.replace(/\n/g, ' ')}</p>
          </div>

          {/* Desktop headline */}
          <div
            className="hidden md:block font-serif text-panthera-white leading-[1.18] mx-auto text-center"
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.65rem)' }}
          >
            {videoHeadline.split('\n').map((line, i) => (
              <p
                key={i}
                className="block"
                style={{ opacity: 1 }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Video player */}
        <div className="reveal-el video-shell max-w-[980px] mx-auto">
          <VslPlayer className="w-full transition-all duration-400 hover:brightness-110 hover:contrast-105" />
        </div>

        {/* CTA below */}
        <div className="text-center mt-14 md:mt-12 reveal-el">
          <div className="flex justify-center">
            <Button variant="primary" href="#booking">
              {videoCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
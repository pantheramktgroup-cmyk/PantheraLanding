import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { video } = landingCopy

export default function FounderVideo() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

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
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-panthera-deep section-pad overflow-hidden">
      {/* Subtle renacentista bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/renacentismo/8.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-panthera-deep/80" />
        <div className="grain-overlay" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Centered header */}
        <div className="text-center mb-12 reveal-el">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">
            {video.eyebrow}
          </p>
          <h2
            className="font-serif text-panthera-white leading-tight max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {video.headline}
          </h2>
        </div>

        {/* Video — centered, large, premium frame */}
        <div className="reveal-el max-w-[980px] mx-auto">
          <div
            className="relative w-full overflow-hidden"
            style={{ border: '1px solid rgba(245,245,245,0.1)', borderRadius: '2px' }}
          >
            <video
              controls
              playsInline
              poster={video.videoPoster}
              className="w-full block bg-panthera-black"
              style={{ aspectRatio: '16/9' }}
            >
              <source src={video.videoSrc} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>

        {/* Pull quote + CTA below */}
        <div className="text-center mt-12 space-y-8 reveal-el">
          <blockquote className="max-w-2xl mx-auto">
            <p
              className="font-serif italic text-panthera-cream leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              &#8220;{video.pullQuote}&#8221;
            </p>
          </blockquote>

          <Button variant="primary" href="#booking">
            {video.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

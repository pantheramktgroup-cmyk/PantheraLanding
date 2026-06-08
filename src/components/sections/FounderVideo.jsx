import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { video } = landingCopy

const vslThumbnail = '/images/vsl_thumbnail_manu.webp'

export default function FounderVideo() {
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #000000 0%, #050505 28%, #0b0c0b 70%, #141514 100%)' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(185,164,106,0.08),transparent_56%)]"
          style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)' }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_76%,rgba(227,247,141,0.05),transparent_52%)]"
          style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 14%, black 34%, black 100%)' }}
        />
      </div>
      <div className="grain-overlay" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 16%, black 38%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 16%, black 38%, black 100%)' }} aria-hidden="true" />

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

        {/* Video player — centered, large, premium frame */}
        <div className="reveal-el video-shell max-w-[980px] mx-auto">
          <div
            className="relative w-full overflow-hidden transition-all duration-400 hover:brightness-110 hover:contrast-105"
            style={{
              aspectRatio: '16/9',
              border: '1px solid rgba(245,245,245,0.14)',
              borderRadius: '2px',
              background: '#000',
              boxShadow: '0 0 0 1px rgba(245,245,245,0.06), 0 14px 42px rgba(0,0,0,0.42)',
            }}
          >
            {!playing ? (
              /* Thumbnail overlay with play button */
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                aria-label="Reproducir video"
              >
                {/* Thumbnail image */}
                <img
                  src={vslThumbnail}
                  alt="Miniatura del video Manifiesto Panthera"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-panthera-black/50 group-hover:bg-panthera-black/40 transition-colors duration-300" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Label */}
                <p className="absolute bottom-6 left-0 right-0 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Ver manifiesto
                </p>
              </button>
            ) : (
              /* Google Drive iframe */
              <iframe
                src={video.videoEmbedUrl}
                title="Manifiesto Panthera"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            )}
          </div>
        </div>

        {/* Pull quote + CTA below */}
        <div className="text-center mt-12 space-y-8 reveal-el">
          <blockquote className="max-w-2xl mx-auto">
            <p
              className="font-serif italic text-panthera-cream leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              <span className="block">&#8220;Escalar no deber&#237;a exigirte m&#225;s esfuerzo.</span>
              <span className="block ml-5 md:ml-10">Deber&#237;a exigirte mejor infraestructura.&#8221;</span>
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

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
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-panthera-black section-pad overflow-hidden">
      <div className="grain-overlay" aria-hidden="true" />

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
        <div className="reveal-el max-w-[980px] mx-auto">
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '16/9',
              border: '1px solid rgba(245,245,245,0.1)',
              borderRadius: '2px',
              background: '#000',
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

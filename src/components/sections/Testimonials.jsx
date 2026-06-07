import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { testimonials } = landingCopy

// Renacentista images mapped per case for card backgrounds
const CARD_IMAGES = ['/renacentismo/2.png', '/renacentismo/4.png', '/renacentismo/6.png', '/renacentismo/8.png', '/renacentismo/2.png']

export default function Testimonials() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [currentCard, setCurrentCard] = useState(0)
  const prefersReduced = usePrefersReducedMotion()

  // Total panels = cases + 1 CTA panel
  const totalPanels = testimonials.cases.length + 1

  useGSAP(
    () => {
      if (prefersReduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const container = containerRef.current
        const track = trackRef.current
        if (!container || !track) return

        const ctx = gsap.context(() => {
          const totalWidth = (totalPanels - 1) * window.innerWidth

          gsap.to(track, {
            x: () => -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  Math.floor(self.progress * totalPanels),
                  totalPanels - 1
                )
                setCurrentCard(idx)
              },
            },
          })
        })

        return () => ctx.revert()
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section ref={containerRef} className="relative bg-panthera-black overflow-hidden">
      {/* Section header — overlays the track */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none md:block hidden">
        <div className="container-panthera pt-10 pb-0 flex items-center justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">
              {testimonials.eyebrow}
            </p>
          </div>
          {/* Counter */}
          <div className="flex items-center gap-2 text-panthera-ash">
            <span className="font-serif text-3xl text-panthera-white tabular-nums">
              {String(Math.min(currentCard + 1, testimonials.cases.length)).padStart(2, '0')}
            </span>
            <span className="text-sm">/</span>
            <span className="font-sans text-xs">
              {String(testimonials.cases.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden container-panthera pt-16 pb-0">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-2">
          {testimonials.eyebrow}
        </p>
        <h2
          className="font-serif text-panthera-white leading-tight mb-10"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          {testimonials.headline}
        </h2>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex flex-col md:flex-nowrap md:flex-row" style={{ willChange: 'transform' }}>
        {testimonials.cases.map((c, i) => (
          <div
            key={c.name}
            className="flex-shrink-0 w-full md:w-screen"
            style={{ minHeight: '100vh' }}
          >
            <div className="relative w-full h-full flex flex-col md:flex-row min-h-screen">
              {/* Left: image / video */}
              <div className="relative md:w-1/2 w-full" style={{ minHeight: '45vh' }}>
                {c.youtubeEmbedUrl ? (
                  <iframe
                    src={`${c.youtubeEmbedUrl}?rel=0&modestbranding=1`}
                    title={c.videoTitle}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={CARD_IMAGES[i % CARD_IMAGES.length]}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-panthera-black/60" />
                    {/* Placeholder label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full border border-panthera-white/30 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-panthera-white/50 ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-panthera-white/30">
                        Video próximamente
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Right: case info */}
              <div className="md:w-1/2 w-full flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 bg-panthera-black border-t md:border-t-0 md:border-l border-[rgba(245,245,245,0.06)]">
                <span
                  className="font-serif text-[120px] md:text-[160px] text-[rgba(245,245,245,0.03)] leading-none select-none -ml-2 -mt-6"
                  aria-hidden="true"
                >
                  &#8220;
                </span>
                <p
                  className="font-sans text-panthera-white/80 leading-relaxed mb-8 -mt-10"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
                >
                  {c.description}
                </p>
                <div className="border-t border-[rgba(245,245,245,0.08)] pt-6">
                  <p className="font-sans font-medium text-sm text-panthera-white">{c.name}</p>
                  <p className="font-sans text-xs text-panthera-green mt-1">{c.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Last panel: CTA fullscreen — part of the same horizontal track */}
        <div
          className="flex-shrink-0 w-full md:w-screen flex flex-col items-center justify-center relative bg-panthera-black px-6 text-center py-24 md:py-0"
          style={{ minHeight: '100vh' }}
        >
          {/* mask_filter_application.webp background — fallback to renacentismo */}
          <picture>
            <source srcSet="/images/mask_filter_application.webp" type="image/webp" />
            <img
              src="/renacentismo/6.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
              loading="lazy"
            />
          </picture>
          <div className="absolute inset-0 bg-panthera-black/75" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="font-serif text-panthera-white leading-tight mb-12"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
            >
              {testimonials.closingPanel.text}
            </p>
            <Button variant="fullScreen" href="#booking">
              {testimonials.closingPanel.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState, useCallback } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { testimonials } = landingCopy

function TestimonialCard({ c, onPlay }) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = useCallback((e) => {
    e.stopPropagation()
    setPlaying(true)
    onPlay?.()
  }, [onPlay])

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row">
      <div className="relative md:w-1/2 w-full bg-panthera-black" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0">
          {!playing ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label={`Reproducir ${c.videoTitle}`}
            >
              <img src={c.coverImage} alt={c.videoTitle} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-panthera-black/60" />
              <div className="grain-overlay" aria-hidden="true" />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.07)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                <p className="font-serif text-panthera-white leading-tight mb-1" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.75rem)' }}>
                  {c.coverTitle}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">{c.name}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300" style={{ width: '68px', height: '68px' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={`${c.youtubeEmbedUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={c.videoTitle}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-center px-10 md:px-14 lg:px-20 py-14 bg-panthera-black border-t md:border-t-0 md:border-l border-[rgba(245,245,245,0.06)]">
        <span className="font-serif text-[100px] md:text-[140px] text-[rgba(245,245,245,0.03)] leading-none select-none -ml-2 -mt-4 block" aria-hidden="true">&#8220;</span>
        <p className="font-sans text-panthera-white/80 leading-relaxed mb-8 -mt-8" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
          {c.description}
        </p>
        <div className="border-t border-[rgba(245,245,245,0.08)] pt-6">
          <p className="font-sans font-medium text-sm text-panthera-white">{c.name}</p>
          <p className="font-sans text-xs text-panthera-green mt-1">{c.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [currentCard, setCurrentCard] = useState(0)
  const prefersReduced = usePrefersReducedMotion()
  const totalPanels = testimonials.cases.length + 1

  const handlePlay = useCallback(() => {}, [])

  useGSAP(
    () => {
      if (prefersReduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return
        const ctx = gsap.context(() => {
          const totalWidth = (totalPanels - 1) * window.innerWidth
          gsap.to(track, {
            x: () => -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 0.3,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: 1 / (totalPanels - 1),
                duration: { min: 0.3, max: 0.6 },
                delay: 0.1,
                ease: 'power2.out',
              },
              onUpdate: (self) => {
                const idx = Math.min(Math.floor(self.progress * totalPanels), totalPanels - 1)
                setCurrentCard(idx)
              },
            },
          })
        })
        return () => ctx.revert()
      })
      return () => mm.revert()
    },
    { scope: pinRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="bg-panthera-black">
      <div className="container-panthera pt-28 md:pt-36 pb-20 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">{testimonials.eyebrow}</p>
        <h2 className="font-serif text-panthera-white leading-tight mb-6 max-w-2xl" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
          {testimonials.headline}
        </h2>
        <p className="font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">{testimonials.subheadline}</p>
      </div>

      <div ref={pinRef} className="relative hidden md:block" style={{ height: '100vh' }}>
        <div className="absolute top-8 right-0 z-20 pointer-events-none w-full flex justify-end" style={{ paddingRight: 'clamp(24px, 5vw, 80px)' }}>
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl text-panthera-white tabular-nums leading-none">
              {String(Math.min(currentCard + 1, testimonials.cases.length)).padStart(2, '0')}
            </span>
            <span className="text-sm text-panthera-ash/50">/</span>
            <span className="font-sans text-xs text-panthera-ash/50">
              {String(testimonials.cases.length).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div ref={trackRef} className="flex flex-nowrap h-full" style={{ willChange: 'transform' }}>
          {testimonials.cases.map((c) => (
            <div key={c.name} className="flex-shrink-0 w-screen h-full">
              <TestimonialCard c={c} onPlay={handlePlay} />
            </div>
          ))}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative bg-panthera-black px-6 text-center">
            <img src="/images/testimonial_cta_case_table.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.25)' }} loading="lazy" />
            <div className="absolute inset-0 bg-panthera-black/70" aria-hidden="true" />
            <div className="grain-overlay" aria-hidden="true" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="font-serif text-panthera-white leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
                {testimonials.closingPanel.text}
              </p>
              <Button variant="fullScreen" href="#booking">{testimonials.closingPanel.cta}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {testimonials.cases.map((c) => (
          <div key={`mob-${c.name}`} className="border-t border-[rgba(245,245,245,0.06)]" style={{ minHeight: '100svh' }}>
            <TestimonialCard c={c} />
          </div>
        ))}
        <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-panthera-black border-t border-[rgba(245,245,245,0.06)]">
          <img src="/images/testimonial_cta_case_table.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.25)' }} loading="lazy" />
          <div className="absolute inset-0 bg-panthera-black/70" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="font-serif text-panthera-white leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              {testimonials.closingPanel.text}
            </p>
            <Button variant="fullScreen" href="#booking">{testimonials.closingPanel.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

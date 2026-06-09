import { useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const testimonialCtaCaseTable = '/images/testimonial_cta_case_table.webp'
const { testimonials } = landingCopy

function TestimonialCard({ c, onPlay }) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = useCallback(
    (e) => {
      e.stopPropagation()
      setPlaying(true)
      onPlay?.()
    },
    [onPlay]
  )

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row">
      <div className="relative md:w-1/2 w-full bg-[#121312] overflow-hidden h-[390px] sm:h-[440px] md:h-auto md:min-h-[50vh]">
        <div className="absolute inset-0 overflow-hidden">
          {!playing ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label={`Reproducir ${c.videoTitle}`}
            >
              <img
                src={c.coverImage}
                alt={c.videoTitle}
                className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ease-out group-hover:brightness-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-panthera-black/60" />
              <div className="grain-overlay" aria-hidden="true" />
              <div className="absolute inset-0 border border-[rgba(245,245,245,0.07)] pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 z-10">
                {c.coverTitle && (
                  <p
                    className="font-serif text-panthera-white leading-tight mb-1"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.75rem)' }}
                  >
                    {c.coverTitle}
                  </p>
                )}

                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">
                  {c.name}
                </p>

                <p className="md:hidden font-sans text-[11px] text-panthera-green/90 mt-1">
                  {c.role}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div
                  className="flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                  style={{ width: '62px', height: '62px' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
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

      <div className="md:w-1/2 w-full flex flex-col justify-center px-6 md:px-14 lg:px-20 py-8 md:py-14 bg-[#121312] border-t md:border-t-0 md:border-l border-[rgba(245,245,245,0.06)]">
        <span
          className="hidden md:block font-serif text-[140px] text-[rgba(245,245,245,0.03)] leading-none select-none -ml-2 -mt-4"
          aria-hidden="true"
        >
          &#8220;
        </span>

        <p
          className="font-sans text-panthera-white/80 leading-relaxed mb-0 md:mb-8 md:-mt-8"
          style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
        >
          {c.description}
        </p>

        <div className="hidden md:block border-t border-[rgba(245,245,245,0.08)] pt-6">
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
          const vw = () => window.innerWidth
          const totalDist = () => vw() * (totalPanels - 1)

          const lastPanel = track.children[totalPanels - 1]
          const tl = gsap.timeline()

          tl.to(track, {
            x: () => -lastPanel.offsetLeft,
            ease: 'none',
            duration: totalPanels - 1,
          })

          tl.to({}, { duration: 1 })

          ScrollTrigger.create({
            animation: tl,
            trigger: pin,
            start: 'top top',
            end: () => `+=${(totalDist() * totalPanels) / (totalPanels - 1)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value) => {
                const step = 1 / totalPanels
                return Math.round(value / step) * step
              },
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const idx = Math.min(Math.floor(self.progress * totalPanels), totalPanels - 1)
              setCurrentCard(idx)
            },
          })

          gsap.from('.testimonial-panel', {
            opacity: 0,
            scale: 0.985,
            stagger: 0.07,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pin,
              start: 'top 78%',
              once: true,
            },
          })

          gsap.to('.testimonial-cta-bg', {
            scale: 1.08,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${(totalDist() * totalPanels) / (totalPanels - 1)}`,
              scrub: true,
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
    <section className="relative overflow-hidden bg-[#141514]">
      <div className="relative z-10 container-panthera pt-20 md:pt-36 pb-10 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">
          {testimonials.eyebrow}
        </p>

        <h2
          className="font-serif text-panthera-white leading-tight mb-6 max-w-2xl text-[clamp(1.75rem,7.5vw,2.35rem)] md:text-[clamp(2rem,3.5vw,3rem)]"
        >
          {testimonials.headline}
        </h2>

        <p className="font-sans text-sm text-panthera-ash leading-relaxed max-w-xl">
          {testimonials.subheadline}
        </p>
      </div>

      <div
        ref={pinRef}
        className="relative z-10 hidden md:block"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <div
          className="absolute right-0 z-20 pointer-events-none w-full flex justify-end"
          style={{ top: 'calc(88px + 12px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
        >
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

        <div ref={trackRef} className="flex flex-nowrap h-full bg-[#141514]" style={{ willChange: 'transform' }}>
          {testimonials.cases.map((c) => (
            <div
              key={c.name}
              className="testimonial-panel h-full"
              style={{
                flex: '0 0 100vw',
                width: '100vw',
                minWidth: '100vw',
                maxWidth: 'none',
                overflow: 'hidden',
              }}
            >
              <TestimonialCard c={c} onPlay={handlePlay} />
            </div>
          ))}

          <div
            className="testimonial-panel flex flex-col items-center justify-center relative bg-black text-center"
            style={{
              flex: '0 0 100vw',
              width: '100vw',
              minWidth: '100vw',
              maxWidth: 'none',
              overflow: 'hidden',
            }}
          >
            <img
              src={testimonialCtaCaseTable}
              alt=""
              aria-hidden="true"
              className="testimonial-cta-bg absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.14) saturate(0.58) contrast(1)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-panthera-black/84" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-panthera-black via-panthera-black/86 to-panthera-black/76" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent via-black/78 to-black" aria-hidden="true" />
            <div className="grain-overlay" aria-hidden="true" />

            <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
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
      </div>

      <div className="relative z-10 md:hidden">
        {testimonials.cases.map((c) => (
          <div key={`mob-${c.name}`} className="border-t border-[rgba(245,245,245,0.06)]">
            <TestimonialCard c={c} onPlay={handlePlay} />
          </div>
        ))}

        <div className="relative flex flex-col items-center justify-center px-6 py-20 text-center bg-black border-t border-[rgba(245,245,245,0.06)]">
          <img
            src="/images/testimonial_cta_case_table.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.14) saturate(0.58) contrast(1)' }}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-panthera-black/84" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-panthera-black via-panthera-black/86 to-panthera-black/76" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent via-black/78 to-black" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="font-serif text-panthera-white leading-tight mb-10 text-[clamp(1.55rem,7vw,2.25rem)]"
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
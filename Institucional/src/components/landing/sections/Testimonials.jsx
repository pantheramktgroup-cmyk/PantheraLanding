import { useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'
import { landingCopy } from '../../../content/landing/landingCopy'
import Button from '../ui/Button'

const testimonialCtaCaseTable = '/images/testimonial_cta_case_table.webp'
const { testimonials } = landingCopy

// --- Card compacta tipo thank-you page (Variante A) -------------------------
function GridCard({ c }) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = useCallback((e) => {
    e.stopPropagation()
    setPlaying(true)
  }, [])

  return (
    <div className="group relative flex flex-col h-full min-h-[440px] md:min-h-[470px] bg-[#0c0c0b] border border-[rgba(245,245,245,0.07)] overflow-hidden">
      <div className="relative w-full aspect-video overflow-hidden">
        {!playing ? (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Reproducir ${c.videoTitle}`}
          >
            <img
              src={c.coverImage}
              alt={c.videoTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-panthera-black/55" />
            <div className="grain-overlay" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="inline-flex h-14 w-14 items-center justify-center border border-panthera-green/65 bg-black/72 text-panthera-green shadow-[0_0_30px_rgba(227,247,141,0.18)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-panthera-green">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
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

      <div className="flex flex-col p-5 md:p-6 flex-1">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-panthera-green mb-1">
          Resultado
        </p>
        <p className="font-sans font-medium text-sm text-panthera-white mb-1">{c.name}</p>
        <p className="font-sans text-[11px] text-panthera-green/80 mb-3">{c.role}</p>
        <p className="font-sans text-xs text-panthera-white/65 leading-relaxed">{c.description}</p>
      </div>
    </div>
  )
}

// --- Card fullscreen para scroll horizontal (Variante B) ---------------------
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
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#111211] md:bg-transparent">
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
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green">
                  {c.name}
                </p>
                <p className="md:hidden font-sans text-[11px] text-panthera-green/90 mt-1">
                  {c.role}
                </p>
              </div>

              <span className="absolute inset-0 z-10 flex items-center justify-center" aria-hidden="true">
                <span className="inline-flex h-14 w-14 items-center justify-center border border-panthera-green/65 bg-black/72 text-panthera-green shadow-[0_0_30px_rgba(227,247,141,0.18)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-panthera-green">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
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

      <div className="md:w-1/2 w-full flex flex-col justify-center px-6 md:px-14 lg:px-20 py-7 md:py-14 bg-[#111211] md:bg-[#121312] border-t md:border-t-0 md:border-l border-[rgba(245,245,245,0.06)]">
        <span
          className="hidden md:block font-serif text-[140px] text-[rgba(245,245,245,0.03)] leading-none select-none -ml-2 -mt-4"
          aria-hidden="true"
        >
          &#8220;
        </span>

        <div className="md:hidden mb-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-3">
            Resultado
          </p>
          <div className="w-6 h-px bg-panthera-green/55" />
        </div>

        <p
          className="font-sans text-panthera-white/78 md:text-panthera-white/80 leading-relaxed mb-0 md:mb-8 md:-mt-8"
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

// --- Layout Variante A: grid de cards -----------------------------------------
function TestimonialsGridA({ cases, closingPanel }) {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const cards = containerRef.current.querySelectorAll('.grid-card')

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        stagger: 0.06,
        duration: 0.8,
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

  const fullRowsCount = Math.floor(cases.length / 3) * 3
  const regularCards = cases.slice(0, fullRowsCount)
  const trailingCards = cases.slice(fullRowsCount)

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 md:gap-5 mb-4 md:mb-5">
        {regularCards.map((c) => (
          <div key={c.name} className="grid-card h-full">
            <GridCard c={c} />
          </div>
        ))}
      </div>

      {trailingCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 md:gap-5 max-w-4xl mx-auto mb-12 md:mb-14">
          {trailingCards.map((c) => (
            <div key={`trailing-${c.name}`} className="grid-card h-full">
              <GridCard c={c} />
            </div>
          ))}
        </div>
      )}

      <div className="relative flex flex-col items-center justify-center px-6 py-14 md:py-16 text-center overflow-hidden border-t border-[rgba(245,245,245,0.06)] max-w-5xl mx-auto w-full">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="md:hidden font-serif text-panthera-white leading-[1.16] mb-10 text-[clamp(1.05rem,4.8vw,1.35rem)] max-w-[320px] mx-auto">
            {closingPanel.text.replace(/\n/g, ' ')}
          </p>

          <p className="hidden md:block font-serif text-panthera-white leading-[1.14] mb-10 whitespace-pre-line md:text-[clamp(1.55rem,3vw,2.25rem)]">
            {closingPanel.text}
          </p>

          <div className="flex justify-center">
            <Button variant="fullScreen" href="#booking">
              {closingPanel.cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Layout Variante B: scroll horizontal pinneado ----------------------------
function TestimonialsScrollB({ cases, closingPanel }) {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [currentCard, setCurrentCard] = useState(0)
  const prefersReduced = usePrefersReducedMotion()
  const totalPanels = cases.length + 1
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
    { scope: pinRef, dependencies: [prefersReduced, totalPanels] }
  )

  return (
    <>
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
              {String(Math.min(currentCard + 1, cases.length)).padStart(2, '0')}
            </span>
            <span className="text-sm text-panthera-ash/50">/</span>
            <span className="font-sans text-xs text-panthera-ash/50">
              {String(cases.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div ref={trackRef} className="flex flex-nowrap h-full bg-[#141514]" style={{ willChange: 'transform' }}>
          {cases.map((c) => (
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
                className="font-serif text-panthera-white leading-tight mb-12 whitespace-pre-line"
                style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}
              >
                {closingPanel.text}
              </p>

              <div className="flex justify-center">
                <Button variant="fullScreen" href="#booking">
                  {closingPanel.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="relative z-10 md:hidden">
        {cases.map((c) => (
          <div key={`mob-${c.name}`} className="border-t border-[rgba(245,245,245,0.06)] bg-[#111211]">
            <TestimonialCard c={c} onPlay={handlePlay} />
          </div>
        ))}

        <div className="relative flex flex-col items-center justify-start px-6 pt-36 pb-24 text-center bg-[#111211] border-t border-[rgba(245,245,245,0.06)]">
          <div className="grain-overlay opacity-[0.045]" aria-hidden="true" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="font-serif text-panthera-white leading-[1.16] mb-10 text-[clamp(1.05rem,4.8vw,1.35rem)] max-w-[320px] mx-auto">
              {closingPanel.text.replace(/\n/g, ' ')}
            </p>

            <div className="flex justify-center">
              <Button variant="fullScreen" href="#booking">
                {closingPanel.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// --- Componente principal ---------------------------------------------------
export default function Testimonials({ variant = 'A' }) {
  const isVariantA = variant !== 'B'
  const isVariantB = variant === 'B'
  const headline = isVariantB ? testimonials.headlineVariantB : testimonials.headline

  return (
    <section className="relative overflow-hidden bg-[#141514]">
      {isVariantA && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 premium-flow-bg" />
          <div className="absolute -left-[18%] top-[6%] h-[320px] w-[320px] rounded-full premium-flow-blob premium-flow-blob-a" />
          <div className="absolute -right-[14%] bottom-[4%] h-[340px] w-[340px] rounded-full premium-flow-blob premium-flow-blob-b" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/88" />
          <div className="grain-overlay opacity-[0.07]" />
        </div>
      )}

      <div className="relative z-10 container-panthera pt-24 md:pt-36 pb-14 md:pb-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-5">
          {testimonials.eyebrow}
        </p>

        <h2 className="md:hidden font-serif text-panthera-white leading-[1.08] mb-6 text-[clamp(1.45rem,6.4vw,1.95rem)] max-w-[370px]">
          {headline.replace(/\n/g, ' ')}
        </h2>

        <h2 className="hidden md:block font-serif text-panthera-white leading-tight mb-6 whitespace-pre-line text-[clamp(1.95rem,3.2vw,2.75rem)] max-w-4xl">
          {headline}
        </h2>

        <p className="hidden md:block font-sans text-sm text-panthera-ash leading-relaxed max-w-xl whitespace-pre-line">
          {testimonials.subheadline}
        </p>

        <p className="md:hidden font-sans text-sm text-panthera-ash leading-relaxed max-w-[340px]">
          {testimonials.subheadline.replace(/\n/g, ' ')}
        </p>
      </div>

      {isVariantA && (
        <div className="relative z-10 container-panthera pb-0">
          <TestimonialsGridA
            cases={testimonials.cases}
            closingPanel={testimonials.closingPanel}
          />
        </div>
      )}

      {isVariantB && (
        <TestimonialsScrollB
          cases={testimonials.cases}
          closingPanel={testimonials.closingPanel}
        />
      )}
    </section>
  )
}
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { systemPieces } = landingCopy

const muralBg = '/images/panthera.webp'

// 4-column × 2-row grid: each card shows a different region of the mural
// background-size: 400% wide × 200% tall (4 cols × 2 rows)
const MURAL_POSITIONS = [
  '8% 6%',
  '38% 6%',
  '68% 6%',
  '98% 6%',
  '8% 98%',
  '38% 98%',
  '68% 98%',
  '98% 98%',
]

export default function SystemPieces() {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      const cards = containerRef.current.querySelectorAll('.piece-card')
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

  return (
    <section className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black" />
        <div
          className="absolute inset-x-0 top-0 h-[280px]"
          style={{
            background:
              'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.99) 46%, rgba(0,0,0,0.34) 84%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[320px]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.95) 72%, #000000 100%)',
          }}
        />
        <div className="grain-overlay opacity-[0.12]" aria-hidden="true" />
      </div>

      <div ref={containerRef} className="relative z-10 container-panthera">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-green mb-4">
            {systemPieces.eyebrow}
          </p>
          <h2
            className="font-serif text-panthera-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {systemPieces.headline}
          </h2>
          <p className="font-sans text-sm text-panthera-ash leading-relaxed">
            {systemPieces.subheadline}
          </p>
        </div>

        {/* Mural grid — 4×2, each card is one fragment of the same image */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[rgba(245,245,245,0.04)]">
          {systemPieces.pieces.map((piece, i) => (
            <div
              key={piece.title}
              className="piece-card group relative border-r border-b border-[rgba(245,245,245,0.04)] overflow-hidden cursor-default"
              style={{ minHeight: '240px' }}
            >
              {/* Mural fragment — no zoom to avoid distortion */}
              <div
                className="absolute inset-0 transition-[filter] duration-700 ease-out group-hover:[filter:brightness(1.08)_contrast(1.12)_saturate(1.04)]"
                style={{
                  backgroundImage: `url('${muralBg}')`,
                  backgroundSize: '400% 200%',
                  backgroundPosition: MURAL_POSITIONS[i],
                  filter: 'brightness(0.3) contrast(1.04) saturate(0.66)',
                }}
              />
              {/* Overlay: very dark at rest, almost removed on hover */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.93)] group-hover:bg-[rgba(0,0,0,0.03)] transition-colors duration-700" />
              {/* Local text backdrop to preserve readability without covering the whole tile */}
              <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/70 via-black/34 to-transparent z-10" aria-hidden="true" />
              <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />

              {/* Content */}
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full" style={{ minHeight: '240px' }}>
                <span className="font-sans text-[10px] text-panthera-green/55 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-auto">
                  <div className="w-5 h-px bg-panthera-green mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="font-serif text-xl md:text-2xl text-panthera-white group-hover:text-panthera-cream transition-colors duration-300 mb-2">
                    {piece.title}
                  </h3>
                  <p className="font-sans text-xs text-panthera-ash/70 group-hover:text-panthera-ash/88 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                    {piece.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Button variant="primary" href="#booking">
            {systemPieces.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

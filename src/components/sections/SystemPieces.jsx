import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { systemPieces } = landingCopy

const muralBg = '/images/apex_system_renaissance_mural.webp'

// 4-column × 2-row grid: each card shows a different region of the mural
// background-size: 400% wide × 200% tall (4 cols × 2 rows)
const MURAL_POSITIONS = [
  '0% 0%',     // row 1, col 1
  '33.33% 0%', // row 1, col 2
  '66.66% 0%', // row 1, col 3
  '100% 0%',   // row 1, col 4
  '0% 100%',   // row 2, col 1
  '33.33% 100%',
  '66.66% 100%',
  '100% 100%',
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
    <section className="bg-panthera-black section-pad overflow-hidden">
      <div ref={containerRef} className="container-panthera">
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
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[rgba(245,245,245,0.06)]">
          {systemPieces.pieces.map((piece, i) => (
            <div
              key={piece.title}
              className="piece-card group relative border-r border-b border-[rgba(245,245,245,0.06)] overflow-hidden cursor-default"
              style={{ minHeight: '240px' }}
            >
              {/* Mural fragment — zooms in on hover */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${muralBg}')`,
                  backgroundSize: '400% 200%',
                  backgroundPosition: MURAL_POSITIONS[i],
                  filter: 'grayscale(40%) brightness(0.6)',
                }}
              />
              {/* Overlay: nearly black at rest → clears on hover to reveal image */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.88)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.38)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.88)' }}
              />
              <div className="grain-overlay opacity-40" aria-hidden="true" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full" style={{ minHeight: '240px' }}>
                <span className="font-sans text-[10px] text-panthera-green/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-auto">
                  <div className="w-5 h-px bg-panthera-green mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="font-serif text-xl md:text-2xl text-panthera-white group-hover:text-panthera-cream transition-colors duration-300 mb-2">
                    {piece.title}
                  </h3>
                  <p className="font-sans text-xs text-panthera-ash/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
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

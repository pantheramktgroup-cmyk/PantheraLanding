import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { systemPieces } = landingCopy

const PIECE_IMAGES = [
  '/renacentismo/2.png',
  '/renacentismo/4.png',
  '/renacentismo/6.png',
  '/renacentismo/8.png',
  '/renacentismo/2.png',
  '/renacentismo/4.png',
  '/renacentismo/6.png',
  '/renacentismo/8.png',
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
    <section className="bg-panthera-deep section-pad overflow-hidden">
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

        {/* Editorial 4×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[rgba(245,245,245,0.06)]">
          {systemPieces.pieces.map((piece, i) => (
            <div
              key={piece.title}
              className="piece-card group relative border-r border-b border-[rgba(245,245,245,0.06)] overflow-hidden cursor-default"
              style={{ minHeight: '220px' }}
            >
              {/* Renacentista hover background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <img
                  src={PIECE_IMAGES[i]}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-panthera-black/80" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
                <span className="font-sans text-[10px] text-panthera-ash/40 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-auto">
                  {/* Accent line on hover */}
                  <div className="w-5 h-px bg-panthera-green mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3
                    className="font-serif text-xl md:text-2xl text-panthera-white group-hover:text-panthera-cream transition-colors duration-300 mb-2"
                  >
                    {piece.title}
                  </h3>
                  <p className="font-sans text-xs text-panthera-ash leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
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

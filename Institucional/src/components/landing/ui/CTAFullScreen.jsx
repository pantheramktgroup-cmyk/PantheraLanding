import { useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'
import Button from './Button'

/**
 * CTAFullScreen — Full-viewport-height dark screen with a large phrase and CTA.
 * Used as a separator after horizontal scroll sections.
 */
export default function CTAFullScreen({ headline, cta }) {
  const containerRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.from(containerRef.current.querySelector('.cta-text'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from(containerRef.current.querySelector('.cta-btn'), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-panthera-deep px-6 text-center overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("/renacentismo/8.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="cta-text font-serif text-4xl md:text-6xl lg:text-7xl text-panthera-white leading-tight mb-12">
          {headline}
        </p>
        <div className="cta-btn">
          <Button variant="fullScreen" href="#booking">
            {cta}
          </Button>
        </div>
      </div>
    </div>
  )
}

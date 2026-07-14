import { useState, useRef, useCallback } from 'react'
import { gsap } from '../../../lib/landing/gsap'

/**
 * Accordion — animated FAQ accordion.
 * Single open at a time. Animates height with GSAP.
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const panelRefs = useRef([])

  const toggle = useCallback(
    (index) => {
      const isOpen = openIndex === index

      // Close currently open panel
      if (openIndex !== null && panelRefs.current[openIndex]) {
        const panel = panelRefs.current[openIndex]
        // Snapshot px height before animating so GSAP has a from value
        gsap.set(panel, { height: panel.offsetHeight })
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => gsap.set(panel, { display: 'none', height: 0 }),
        })
      }

      if (isOpen) {
        setOpenIndex(null)
        return
      }

      // Open new panel
      setOpenIndex(index)
      const panel = panelRefs.current[index]
      if (!panel) return

      // Measure natural height before animating
      gsap.set(panel, { display: 'block', height: 'auto', opacity: 1 })
      const fullHeight = panel.scrollHeight
      gsap.set(panel, { height: 0, opacity: 0 })
      gsap.to(panel, {
        height: fullHeight,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => gsap.set(panel, { height: 'auto' }),
      })
    },
    [openIndex]
  )

  return (
    <div className="divide-y divide-[rgba(245,245,245,0.08)] border-y border-[rgba(245,245,245,0.04)]">
      {items.map((item, i) => (
        <div key={i} className="group">
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left focus-visible:outline-none group"
          >
            <span className="font-sans text-[0.95rem] md:text-base text-panthera-white/92 leading-snug pr-4 group-hover:text-panthera-cream transition-colors duration-200">
              {item.question}
            </span>
            <span
              className={`shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center text-panthera-green/90 transition-transform duration-300 ${
                openIndex === i ? 'rotate-45' : 'rotate-0'
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M8 1.5v13M1.5 8h13" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
              </svg>
            </span>
          </button>

          {/* Panel — hidden by default */}
          <div
            ref={(el) => (panelRefs.current[i] = el)}
            style={{ display: 'none', height: 0, overflow: 'hidden' }}
            aria-hidden={openIndex !== i}
          >
            <div className="pb-6 md:pb-7">
              {item.answer.split('\n\n').map((para, j) => (
                <p
                  key={j}
                  className={`font-sans text-sm md:text-base text-panthera-ash leading-relaxed ${j > 0 ? 'mt-4' : ''}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

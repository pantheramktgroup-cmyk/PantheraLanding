import { useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/landing/gsap'
import { landingCopy } from '../../../content/landing/landingCopy'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'

const { statsStrip } = landingCopy

function formatValue(prefix, value, suffix) {
  return `${prefix}${value}${suffix}`
}

export default function StatsStrip() {
  const sectionRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const cards = sectionRef.current.querySelectorAll('.stats-card')

      if (!prefersReduced) {
        gsap.from(cards, {
          opacity: 0,
          y: 32,
          stagger: 0.12,
          duration: 0.55,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        })

        const counters = sectionRef.current.querySelectorAll('[data-counter]')
        counters.forEach((counter) => {
          const target = Number(counter.getAttribute('data-target') || 0)
          const prefix = counter.getAttribute('data-prefix') || ''
          const suffix = counter.getAttribute('data-suffix') || ''
          const state = { value: 0 }

          gsap.to(state, {
            value: target,
            duration: 1.1,
            ease: 'power3.out',
            snap: { value: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 90%',
              once: true,
            },
            onUpdate: () => {
              counter.textContent = formatValue(prefix, state.value, suffix)
            },
          })
        })
      }
    },
    { scope: sectionRef, dependencies: [prefersReduced] }
  )

  return (
    <section className="relative bg-[#070707] overflow-hidden border-y border-[rgba(245,245,245,0.06)]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0b0b0b] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,247,141,0.08)_0%,rgba(0,0,0,0)_62%)]" />
        <div className="grain-overlay opacity-[0.06]" />
      </div>

      <div ref={sectionRef} className="relative z-10 container-panthera py-14 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {statsStrip.items.map((item) => (
            <article
              key={`${item.prefix}${item.value}${item.suffix}`}
              className="stats-card stats-glow-card relative bg-black/55 border border-[rgba(227,247,141,0.22)] px-5 py-6 md:px-6 md:py-7 text-center"
            >
              <p
                data-counter
                data-prefix={item.prefix}
                data-target={item.value}
                data-suffix={item.suffix}
                className="font-serif text-panthera-white leading-none mb-3"
                style={{ fontSize: 'clamp(2rem, 6.2vw, 3.2rem)' }}
              >
                {formatValue(item.prefix, prefersReduced ? item.value : 0, item.suffix)}
              </p>
              <p className="md:hidden font-sans text-[13px] md:text-sm text-panthera-white/70 leading-relaxed max-w-[42ch] mx-auto">
                {item.description.replace(/\n/g, ' ')}
              </p>
              <p className="hidden md:block font-sans md:text-sm text-panthera-white/70 leading-relaxed max-w-[42ch] mx-auto">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

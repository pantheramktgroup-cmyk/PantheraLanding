import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useMemo, useRef } from 'react'

type ApexPhase = {
  number: string
  title: string
  description: string
}

type ApexSystemArcProps = {
  phases: readonly ApexPhase[]
  activePhase: number
  onPhaseChange: (index: number) => void
}

export default function ApexSystemArc({ phases, activePhase, onPhaseChange }: ApexSystemArcProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    gsap.registerPlugin(ScrollTrigger)
    let mm: ReturnType<typeof gsap.matchMedia> | null = null

    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (mediaContext) => {
          const conditions = mediaContext.conditions as { desktop?: boolean; reduceMotion?: boolean }
          if (!conditions.desktop || conditions.reduceMotion) return

          const inactiveArc = root.querySelector<SVGPathElement>('[data-apex-arc-inactive]')
          const activeArc = root.querySelector<SVGPathElement>('[data-apex-arc-active]')
          const nodes = gsap.utils.toArray<SVGElement>('[data-apex-node]')

          if (!inactiveArc || !activeArc || nodes.length === 0) return

          const inactiveLen = inactiveArc.getTotalLength()
          const activeLen = activeArc.getTotalLength()

          gsap.set(inactiveArc, { strokeDasharray: inactiveLen, strokeDashoffset: inactiveLen })
          gsap.set(activeArc, { strokeDasharray: activeLen, strokeDashoffset: activeLen })
          gsap.set(nodes, { scale: 0.35, opacity: 0, transformOrigin: 'center center' })

          const enterTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: root,
              start: 'top 78%',
              once: true,
            },
          })

          enterTl
            .to(inactiveArc, { strokeDashoffset: 0, duration: 0.95 })
            .to(activeArc, { strokeDashoffset: 0, duration: 0.72 }, '-=0.58')
            .to(nodes, { scale: 1, opacity: 1, duration: 0.44, stagger: 0.05 }, '-=0.42')
            .from('[data-apex-center]', { opacity: 0, y: 16, duration: 0.46 }, '-=0.18')

          gsap.to('[data-apex-bg-grid]', {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })

          gsap.to('[data-apex-bg-particles]', {
            yPercent: -14,
            xPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          })

          gsap.to('[data-apex-bg-glow]', {
            yPercent: -9,
            xPercent: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })

          gsap.to('[data-apex-arc-shell]', {
            yPercent: -3.5,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }
      )
    }, root)

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [])

  const layout = useMemo(() => {
    const width = 1280
    const height = 630
    const centerX = width / 2
    const centerY = 590
    const radius = 430
    const startAngle = Math.PI - 0.26
    const endAngle = 0.26
    const minLabelY = 420
    const labelOffset = 66

    const nodes = phases.map((_, index) => {
      const angle = startAngle - (index / Math.max(phases.length - 1, 1)) * (startAngle - endAngle)
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const labelYRaw = centerY - (radius + labelOffset) * sin - 8

      return {
        x: centerX + radius * cos,
        y: centerY - radius * sin,
        labelX: centerX + (radius + labelOffset) * cos,
        labelY: Math.min(labelYRaw, minLabelY),
        cos,
      }
    })

    const startNode = nodes[0]
    const lastNode = nodes[nodes.length - 1]
    const endNode = nodes[Math.max(activePhase, 0)]

    const arcPath = `M ${startNode.x} ${startNode.y} A ${radius} ${radius} 0 0 1 ${lastNode.x} ${lastNode.y}`
    const activePath = `M ${startNode.x} ${startNode.y} A ${radius} ${radius} 0 0 1 ${endNode.x} ${endNode.y}`

    return { width, height, nodes, arcPath, activePath }
  }, [activePhase, phases])

  const active = phases[activePhase]

  return (
    <div ref={rootRef} className="relative mx-auto max-w-[1240px] pb-1 pt-0">
      <div data-apex-bg-grid className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.26]" aria-hidden="true" />
      <div data-apex-bg-particles className="pointer-events-none absolute inset-x-[3%] top-[8%] h-[72%] bg-[radial-gradient(circle_at_18%_34%,rgba(245,245,245,0.16)_0,rgba(245,245,245,0.02)_2px,transparent_3px),radial-gradient(circle_at_76%_22%,rgba(245,245,245,0.14)_0,rgba(245,245,245,0.03)_2px,transparent_3px),radial-gradient(circle_at_56%_67%,rgba(245,245,245,0.1)_0,rgba(245,245,245,0.03)_2px,transparent_3px),radial-gradient(circle_at_32%_62%,rgba(227,247,141,0.18)_0,rgba(227,247,141,0.05)_2px,transparent_3px)] opacity-70" aria-hidden="true" />
      <div data-apex-bg-glow className="pointer-events-none absolute inset-x-[8%] top-[12%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(227,247,141,0.22),rgba(227,247,141,0.08)_34%,transparent_74%)] opacity-65" aria-hidden="true" />

      <svg data-apex-arc-shell viewBox={`0 0 ${layout.width} ${layout.height}`} className="pointer-events-none relative h-auto w-full" aria-hidden="true">
        <defs>
          <filter id="apexArcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={layout.arcPath} fill="none" stroke="rgba(245,245,245,0.16)" strokeWidth="6.4" opacity="0.25" />
        <path data-apex-arc-inactive d={layout.arcPath} fill="none" stroke="rgba(245,245,245,0.48)" strokeWidth="1.85" strokeDasharray="3 8" strokeLinecap="round" />
        <path d={layout.activePath} fill="none" stroke="rgba(227,247,141,0.56)" strokeWidth="6" opacity="0.2" filter="url(#apexArcGlow)" />
        <path data-apex-arc-active d={layout.activePath} fill="none" stroke="rgba(227,247,141,0.99)" strokeWidth="2.8" strokeDasharray="5 8" strokeLinecap="round" />

        {layout.nodes.map((node, index) => {
          const isActive = index === activePhase

          return (
            <g key={`node-${index}`} data-apex-node>
              {isActive ? <circle cx={node.x} cy={node.y} r={14} fill="rgba(227,247,141,0.26)" /> : null}
              <circle cx={node.x} cy={node.y} r={isActive ? 7.4 : 5.3} fill={isActive ? 'rgba(227,247,141,1)' : 'rgba(245,245,245,0.64)'} />
            </g>
          )
        })}
      </svg>

      <div className="absolute inset-0">
        {layout.nodes.map((node, index) => {
          const phase = phases[index]
          const isActive = index === activePhase
          const alignmentClass = node.cos < -0.25 ? 'text-right -translate-x-full' : node.cos > 0.25 ? 'text-left' : 'text-center -translate-x-1/2'

          return (
            <button
              key={phase.number + phase.title}
              type="button"
              onMouseEnter={() => onPhaseChange(index)}
              onFocus={() => onPhaseChange(index)}
              onClick={() => onPhaseChange(index)}
              className={`absolute -translate-y-1/2 ${alignmentClass}`}
              style={{
                left: `${(node.labelX / layout.width) * 100}%`,
                top: `${(node.labelY / layout.height) * 100}%`,
              }}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-panthera-green' : 'text-panthera-white/66'}`}>
                {phase.number}
              </span>
              <span className={`mt-1.5 block text-[13px] font-medium uppercase tracking-[0.1em] transition-colors ${isActive ? 'text-panthera-white' : 'text-panthera-white/78'}`}>
                {phase.title}
              </span>
            </button>
          )
        })}

        <div data-apex-center className="pointer-events-none absolute left-1/2 top-[55%] w-[min(560px,56%)] -translate-x-1/2 text-center">
          <motion.div key={active.number} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">{active.number}</p>
            <h3 className="mt-2 text-[1.72rem] font-medium tracking-[-0.03em] text-panthera-white">{active.title}</h3>
            <p className="mx-auto mt-4 max-w-[52ch] text-[14px] leading-7 text-panthera-ash">{active.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

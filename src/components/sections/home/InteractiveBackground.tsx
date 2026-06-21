import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../../lib/utils'

type InteractiveBackgroundProps = {
  intensity?: number
  radius?: number
  midStopPercent?: number
  endStopPercent?: number
  midIntensityFactor?: number
  showGrid?: boolean
  showNoise?: boolean
  followMouse?: boolean
  touchDrift?: boolean
  touchDriftAmount?: number
  className?: string
}

export default function InteractiveBackground({
  intensity = 0.055,
  radius = 190,
  midStopPercent = 32,
  endStopPercent = 70,
  midIntensityFactor = 0.32,
  showGrid = true,
  showNoise = true,
  followMouse = true,
  touchDrift = false,
  touchDriftAmount = 0.16,
  className,
}: InteractiveBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = backgroundRef.current
    if (!node) return

    node.style.setProperty('--mouse-x', '50%')
    node.style.setProperty('--mouse-y', '50%')

    if (reduceMotion) return

    const isTouchDevice =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0

    if (isTouchDevice && touchDrift) {
      let frame = 0
      const start = performance.now()
      const driftRange = Math.max(Math.min(touchDriftAmount, 0.4), 0.06)

      const animateDrift = (timestamp: number) => {
        const elapsed = (timestamp - start) / 1000
        const x = 50 + Math.sin(elapsed * 0.42) * driftRange * 100
        const y = 48 + Math.cos(elapsed * 0.31) * driftRange * 78
        node.style.setProperty('--mouse-x', `${x}%`)
        node.style.setProperty('--mouse-y', `${y}%`)
        frame = window.requestAnimationFrame(animateDrift)
      }

      frame = window.requestAnimationFrame(animateDrift)

      return () => {
        window.cancelAnimationFrame(frame)
      }
    }

    if (!followMouse || isTouchDevice) return

    let frame = 0
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    const current = { x: target.x, y: target.y }

    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    const animate = () => {
      current.x += (target.x - current.x) * 0.09
      current.y += (target.y - current.y) * 0.09

      const x = `${(current.x / window.innerWidth) * 100}%`
      const y = `${(current.y / window.innerHeight) * 100}%`
      node.style.setProperty('--mouse-x', x)
      node.style.setProperty('--mouse-y', y)
      frame = window.requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(frame)
    }
  }, [followMouse, reduceMotion, touchDrift, touchDriftAmount])

  return (
    <div
      ref={backgroundRef}
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{
        backgroundImage: `radial-gradient(circle ${radius}px at var(--mouse-x) var(--mouse-y), rgba(227,247,141,${reduceMotion ? 0 : intensity}), rgba(227,247,141,${reduceMotion ? 0 : Math.max(intensity * midIntensityFactor, 0.01)}) ${midStopPercent}%, transparent ${endStopPercent}%)`,
      }}
      aria-hidden="true"
    >
      {showGrid ? <div className="panthera-grid-bg absolute inset-0 opacity-20" /> : null}
      {showNoise ? <div className="noise-overlay absolute inset-0 opacity-40" /> : null}
    </div>
  )
}
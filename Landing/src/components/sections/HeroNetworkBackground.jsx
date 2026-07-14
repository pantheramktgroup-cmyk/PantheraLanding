import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function HeroNetworkBackground() {
  const canvasRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationFrame = 0
    let width = 0
    let height = 0

    const pointer = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    }

    const points = []

    const makePoint = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      size: Math.random() * 1.2 + 0.35,
    })

    const pointCountForWidth = () => {
      if (width >= 1600) return 40
      if (width >= 1100) return 34
      if (width >= 768) return 28
      return 20
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(dpr, dpr)

      points.length = 0
      const count = pointCountForWidth()
      for (let index = 0; index < count; index += 1) {
        points.push(makePoint())
      }

      pointer.x = 0
      pointer.y = 0
      pointer.tx = 0
      pointer.ty = 0
    }

    const drawFrame = (animate) => {
      if (animate) {
        pointer.x += (pointer.tx - pointer.x) * 0.06
        pointer.y += (pointer.ty - pointer.y) * 0.06
      }

      const gradient = context.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#040404')
      gradient.addColorStop(0.55, '#070707')
      gradient.addColorStop(1, '#000000')

      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      context.save()
      context.translate(pointer.x, pointer.y)

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i]

        if (animate) {
          point.x += point.vx
          point.y += point.vy

          if (point.x < -8 || point.x > width + 8) point.vx *= -1
          if (point.y < -8 || point.y > height + 8) point.vy *= -1
        }

        context.beginPath()
        context.fillStyle = 'rgba(245,245,245,0.18)'
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        context.fill()

        for (let j = i + 1; j < points.length; j += 1) {
          const nextPoint = points[j]
          const dx = point.x - nextPoint.x
          const dy = point.y - nextPoint.y
          const distance = Math.hypot(dx, dy)

          if (distance < 145) {
            const opacity = (1 - distance / 145) * 0.075
            context.strokeStyle = `rgba(227,247,141,${opacity})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(nextPoint.x, nextPoint.y)
            context.stroke()
          }
        }
      }

      context.restore()
    }

    const render = () => {
      drawFrame(true)
      animationFrame = window.requestAnimationFrame(render)
    }

    const onMouseMove = (event) => {
      pointer.tx = ((event.clientX / Math.max(width, 1)) - 0.5) * 8
      pointer.ty = ((event.clientY / Math.max(height, 1)) - 0.5) * 6
    }

    resize()
    if (prefersReduced) {
      drawFrame(false)
    } else {
      render()
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [prefersReduced])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 panthera-grid-bg opacity-[0.18]" />
      <div className="absolute inset-0 noise-overlay opacity-[0.28]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,247,141,0.12),rgba(227,247,141,0.04)_42%,transparent_74%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/58 to-black/92" />
    </div>
  )
}
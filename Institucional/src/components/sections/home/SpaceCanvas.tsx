import { useEffect, useRef } from 'react'

type NodePoint = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let width = 0
    let height = 0

    const points: NodePoint[] = []
    const pointCount = 34

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * Math.min(window.devicePixelRatio || 1, 2))
      canvas.height = Math.floor(height * Math.min(window.devicePixelRatio || 1, 2))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(Math.min(window.devicePixelRatio || 1, 2), Math.min(window.devicePixelRatio || 1, 2))
    }

    const initPoints = () => {
      points.length = 0
      for (let index = 0; index < pointCount; index += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.2 + 0.35,
        })
      }
    }

    const onMouseMove = (event: MouseEvent) => {
      targetRef.current.x = (event.clientX / width - 0.5) * 10
      targetRef.current.y = (event.clientY / height - 0.5) * 8
    }

    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / Math.max(height, 1), 1)
    }

    const render = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05

      const gradient = context.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#030303')
      gradient.addColorStop(0.65, '#070707')
      gradient.addColorStop(1, '#000000')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      context.save()
      context.translate(mouseRef.current.x, mouseRef.current.y + scrollRef.current * -14)

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i]

        point.x += point.vx
        point.y += point.vy

        if (point.x < -10 || point.x > width + 10) point.vx *= -1
        if (point.y < -10 || point.y > height + 10) point.vy *= -1

        context.beginPath()
        context.fillStyle = 'rgba(245,245,245,0.2)'
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        context.fill()

        for (let j = i + 1; j < points.length; j += 1) {
          const nextPoint = points[j]
          const dx = point.x - nextPoint.x
          const dy = point.y - nextPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 145) {
            const opacity = (1 - distance / 145) * 0.07
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

      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    initPoints()
    onScroll()
    render()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
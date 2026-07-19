import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

type AnimatedTextRevealProps = {
  text: string
  className?: string
  align?: 'left' | 'center' | 'right'
  delay?: number
}

export default function AnimatedTextReveal({ text, className, align = 'left', delay = 0 }: AnimatedTextRevealProps) {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const inView = useInView(ref, { margin: '-80px', once: true })
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const isInteractiveTitle = className?.includes('interactive-title') ?? false

  useEffect(() => {
    setReady(true)
  }, [])

  const words = useMemo(() => text.split(' '), [text])

  if (!ready || reduceMotion || isInteractiveTitle) {
    return <p ref={ref} className={cn(className, align === 'center' && 'text-center', align === 'right' && 'text-right')}>{text}</p>
  }

  return (
    <motion.p
      ref={ref}
      className={cn(className, align === 'center' && 'text-center', align === 'right' && 'text-right')}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.03,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0.25, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 12 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + index * 0.03 }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.p>
  )
}
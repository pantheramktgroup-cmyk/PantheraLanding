import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { wordReveal } from '../../lib/animations'

type AnimatedWordsProps = {
  text: string
  className?: string
  align?: 'left' | 'center' | 'right'
  delay?: number
}

export default function AnimatedWords({ text, className, align = 'left', delay = 0 }: AnimatedWordsProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { margin: '-80px', once: true })
  const reduceMotion = useReducedMotion()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const words = useMemo(() => text.split(' '), [text])

  if (!hasMounted || reduceMotion) {
    return (
      <span ref={ref} className={cn('inline-block text-balance', className, align === 'center' && 'text-center')}>
        {text}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      aria-label={text}
      className={cn('inline-block text-balance', className, align === 'center' && 'text-center', align === 'right' && 'text-right')}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          variants={wordReveal}
          aria-hidden="true"
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
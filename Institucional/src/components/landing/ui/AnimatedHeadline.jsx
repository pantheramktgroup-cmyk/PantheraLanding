import { useRef } from 'react'
import SplitType from 'split-type'
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/landing/gsap'
import { usePrefersReducedMotion } from '../../../hooks/landing/usePrefersReducedMotion'

/**
 * AnimatedHeadline — Wraps a heading and animates its lines on scroll.
 * Uses SplitType + GSAP ScrollTrigger.
 *
 * @param {string} tag — HTML tag to render (default: 'h2')
 * @param {string} start — ScrollTrigger start value (default: 'top 85%')
 * @param {number} delay — animation delay in seconds
 */
export default function AnimatedHeadline({
  children,
  tag: Tag = 'h2',
  className = '',
  start = 'top 85%',
  delay = 0,
}) {
  const ref = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || prefersReduced) return

      const split = new SplitType(ref.current, { types: 'lines' })

      // Wrap each line to clip overflow
      split.lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.95,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      })

      return () => split.revert()
    },
    { scope: ref, dependencies: [prefersReduced] }
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '../lib/lenis'

/**
 * Initializes Lenis smooth scroll and connects it with GSAP ScrollTrigger.
 * Should be called once at the top-level App component.
 */
export function useLenis() {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])
}

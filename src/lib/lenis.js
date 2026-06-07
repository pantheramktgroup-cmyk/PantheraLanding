import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

let lenisInstance = null
let rafCallback = null

export function initLenis() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Connect Lenis scroll events to ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  // Drive Lenis with GSAP ticker for sync
  rafCallback = (time) => lenisInstance.raf(time * 1000)
  gsap.ticker.add(rafCallback)
  gsap.ticker.lagSmoothing(0)

  // scrollerProxy: makes GSAP snap go through Lenis instead of native scrollTo
  // This prevents Lenis from fighting GSAP snap and causing oscillation
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenisInstance.scrollTo(value, { immediate: true, force: true })
      }
      return lenisInstance.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
  })

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function destroyLenis() {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
    rafCallback = null
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

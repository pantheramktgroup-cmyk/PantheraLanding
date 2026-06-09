import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const heroPoster = '/images/hero_panthera_strategy_room.webp'
const heroVideoSrc = '/videos/hero-panthera-loop.mp4'

const { hero } = landingCopy

export default function Hero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || !videoRef.current) return

    const attemptPlay = () => {
      const playPromise = videoRef.current.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    attemptPlay()
    const node = videoRef.current
    node.addEventListener('loadeddata', attemptPlay)
    return () => node.removeEventListener('loadeddata', attemptPlay)
  }, [prefersReduced])

  useGSAP(
    () => {
      if (prefersReduced) return

      const split = new SplitType(headlineRef.current, { types: 'lines' })

      split.lines.forEach((line) => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode.insertBefore(wrap, line)
        wrap.appendChild(line)
      })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(eyebrowRef.current, { opacity: 0, y: 10, duration: 0.7, ease: 'power2.out' })
        .from(
          videoRef.current,
          { scale: 1.08, duration: 1.6, ease: 'power3.out' },
          0
        )
        .from(
          split.lines,
          { yPercent: 110, opacity: 0, stagger: 0.1, duration: 1, ease: 'power2.out' },
          '-=0.3'
        )
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.45')

      gsap.to(videoRef.current, {
        yPercent: 10,
        xPercent: 2.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => split.revert()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100svh', minHeight: '620px' }}
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 overflow-hidden bg-panthera-deep"
          style={{ backgroundImage: `url(${heroPoster})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <video
            ref={videoRef}
            src={heroVideoSrc}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{ filter: 'brightness(0.95) saturate(1.02) contrast(1)' }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster}
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.42)' }} />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 34%, rgba(0,0,0,0) 52%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 72%, #000000 100%)',
          }}
        />

        {/* Extra oscuridad solo mobile para que el texto arriba lea bien */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 18%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0) 64%)',
          }}
        />

        <div
          className="grain-overlay"
          style={{
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.42) 64%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.42) 64%, rgba(0,0,0,0) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Top bar: logo + eyebrow */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-6 md:px-12 lg:px-20 pt-8">
        <a href="/" aria-label="Panthera Group">
          <img
            src="/logos/03.%20SVG/Recurso%2014.svg"
            alt="Panthera Group"
            className="h-6 md:h-7 w-auto brightness-0 invert opacity-90"
            loading="eager"
          />
        </a>
        <p ref={eyebrowRef} className="font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-white/40 hidden md:block mt-1">
          {hero.eyebrow}
        </p>
      </div>

      {/* Mobile content only */}
      <div className="absolute left-0 right-0 z-10 px-6 top-[116px] md:hidden">
        <div className="max-w-[330px]">
         
          <h1
            className="font-serif text-panthera-white leading-[0.95] mb-5"
            style={{ fontSize: 'clamp(1.85rem, 8.8vw, 2.75rem)' }}
          >
            {hero.headline}
          </h1>

          <Button variant="primary" href="#booking">
            {hero.ctaPrimary}
          </Button>
        </div>
      </div>

      {/* Desktop content — original */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-10 md:pb-14">
        <div className="max-w-[860px]">
          {/* Eyebrow mobile */}
          <p className="md:hidden font-sans text-[10px] uppercase tracking-[0.2em] text-panthera-white/40 mb-4">
            {hero.eyebrow}
          </p>

          <h1
            ref={headlineRef}
            className="font-serif text-panthera-white leading-none mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)' }}
          >
            {hero.headline}
          </h1>

          <p
            ref={subRef}
            className="font-sans text-panthera-white/60 leading-relaxed mb-8 max-w-lg"
            style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.05rem)' }}
          >
            {hero.subheadline}
          </p>

          <div ref={ctaRef}>
            <Button variant="primary" href="#booking">
              {hero.ctaPrimary}
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7">
          {hero.badges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5 font-sans text-[10px] text-panthera-white/30 uppercase tracking-widest"
            >
              <span className="w-1 h-1 rounded-full bg-panthera-green shrink-0" aria-hidden="true" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
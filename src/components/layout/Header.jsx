import { useState, useEffect } from 'react'
import { landingCopy } from '../../content/landingCopy'
import Button from '../ui/Button'

const { nav } = landingCopy

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setVisible(y > 120)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none',
        scrolled
          ? 'bg-panthera-deep/90 backdrop-blur-sm border-b border-[rgba(245,245,245,0.06)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="container-panthera">
        <div className="flex items-center justify-between h-12 md:h-14 gap-4">
          <a
            href="/"
            aria-label="Panthera Group"
            className="shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <img
              src={nav.logo.src}
              alt={nav.logo.alt}
              className="h-[16px] md:h-[18px] w-auto brightness-0 invert"
              loading="eager"
            />
          </a>

          {/* Mobile */}
          <Button
            variant="secondary"
            href="#booking"
            className="header-cta md:hidden shrink-0 whitespace-nowrap !text-[8px] !tracking-[0.08em] !leading-none !py-2 !px-3 !uppercase"
          >
            {nav.cta}
          </Button>

          {/* Desktop */}
          <Button
            variant="secondary"
            href="#booking"
            className="header-cta hidden md:inline-flex shrink-0 whitespace-nowrap !text-[9px] !tracking-[0.18em] !leading-none !py-2 !px-5 !uppercase"
          >
            {nav.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
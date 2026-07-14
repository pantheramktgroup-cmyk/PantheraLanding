import { useRef } from 'react'
import { track } from '@vercel/analytics'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToBooking } from '../../lib/scrollToBooking'

/**
 * Button component — Panthera Group
 * Variants: primary | secondary | ghost | fullScreen
 */

function getButtonLabel(children) {
  if (typeof children === 'string') return children

  if (Array.isArray(children)) {
    return children
      .filter((child) => typeof child === 'string')
      .join(' ')
      .trim() || 'CTA'
  }

  return 'CTA'
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  ...props
}) {
  const buttonRef = useRef(null)
  const prefersReduced = usePrefersReducedMotion()

  const isPrimaryButton = variant === 'primary' || variant === 'fullScreen'
  const motionClasses = isPrimaryButton ? 'btn-orbit-border' : ''

  useGSAP(
    (context, contextSafe) => {
      if (!isPrimaryButton || !buttonRef.current) return

      const button = buttonRef.current
      const isHeaderCTA = button.classList.contains('header-nav-cta')
      const isHeroCTA = button.classList.contains('hero-cta-btn')

      if (prefersReduced) {
        gsap.set(button, {
          clearProps: 'transform,opacity',
        })
        return
      }

      if (isHeaderCTA || isHeroCTA) return

      const onEnter = contextSafe(() => {
        gsap.to(button, {
          y: -4,
          scale: 1.035,
          duration: 0.24,
          ease: 'back.out(2.2)',
          overwrite: 'auto',
        })
      })

      const onLeave = contextSafe(() => {
        gsap.to(button, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })

      button.addEventListener('mouseenter', onEnter)
      button.addEventListener('mouseleave', onLeave)

      gsap.fromTo(
        button,
        { y: -138, opacity: 0, scale: 0.86 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.22,
          ease: 'back.out(2.6)',
          scrollTrigger: {
            trigger: button,
            start: 'top 85%',
            once: true,
          },
        }
      )

      return () => {
        button.removeEventListener('mouseenter', onEnter)
        button.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: buttonRef, dependencies: [isPrimaryButton, prefersReduced] }
  )

  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium tracking-wide transition-all duration-300 ease-premium cursor-pointer select-none'

  const variants = {
    primary: [
      'h-[54px] px-8 text-sm uppercase tracking-widest',
      'bg-panthera-green text-panthera-black',
      'border border-panthera-green',
      'hover:bg-white hover:text-panthera-black hover:font-bold',
      'focus-visible:ring-2 focus-visible:ring-panthera-green focus-visible:ring-offset-2 focus-visible:ring-offset-panthera-deep',
      'btn-primary',
    ].join(' '),

    secondary: [
      'h-[54px] px-8 text-sm uppercase tracking-widest',
      'bg-transparent text-panthera-white border border-[rgba(245,245,245,0.2)]',
      'hover:bg-white hover:border-white hover:text-panthera-black hover:font-bold',
      'focus-visible:ring-2 focus-visible:ring-panthera-green',
    ].join(' '),

    ghost: [
      'text-sm text-panthera-ash underline underline-offset-4',
      'hover:text-panthera-white',
    ].join(' '),

    fullScreen: [
      'h-[54px] px-8 text-sm uppercase tracking-widest',
      'bg-panthera-green text-panthera-black',
      'border border-panthera-green',
      'hover:bg-white hover:text-panthera-black hover:font-bold',
      'btn-primary',
    ].join(' '),
  }

  const trackButtonClick = () => {
    const label = getButtonLabel(children)
    const target = href || '#booking'
    const isBookingClick = !href || href === '#booking'

    track('button_click', {
      label,
      href: target,
      button_variant: variant,
      is_booking_click: isBookingClick,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  const handleClick = (e) => {
    trackButtonClick()

    if (onClick) return onClick(e)

    if (!href || href === '#booking') {
      e.preventDefault()
      scrollToBooking()
    }
  }

  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`
  const classesWithMotion = `${classes} ${motionClasses}`.trim()

  if (href && href !== '#booking') {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={classesWithMotion}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={classesWithMotion}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
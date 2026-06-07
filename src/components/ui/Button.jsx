import { scrollToBooking } from '../../lib/scrollToBooking'

/**
 * Button component — Panthera Group
 * Variants: primary | secondary | ghost | fullScreen
 */
export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-300 ease-premium cursor-pointer select-none'

  const variants = {
    primary: [
      'px-8 py-4 text-sm uppercase tracking-widest',
      'bg-panthera-green text-panthera-black',
      'hover:bg-transparent hover:text-panthera-green border border-panthera-green',
      'focus-visible:ring-2 focus-visible:ring-panthera-green focus-visible:ring-offset-2 focus-visible:ring-offset-panthera-deep',
      'btn-primary',
    ].join(' '),

    secondary: [
      'px-8 py-4 text-sm uppercase tracking-widest',
      'bg-transparent text-panthera-white border border-[rgba(245,245,245,0.2)]',
      'hover:border-panthera-green hover:text-panthera-green',
      'focus-visible:ring-2 focus-visible:ring-panthera-green',
    ].join(' '),

    ghost: [
      'text-sm text-panthera-ash underline underline-offset-4',
      'hover:text-panthera-white',
    ].join(' '),

    fullScreen: [
      'px-10 py-5 text-base uppercase tracking-widest',
      'bg-panthera-green text-panthera-black',
      'hover:bg-transparent hover:text-panthera-green border border-panthera-green',
      'btn-primary',
    ].join(' '),
  }

  const handleClick = (e) => {
    if (onClick) return onClick(e)
    if (!href || href === '#booking') {
      e.preventDefault()
      scrollToBooking()
    }
  }

  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`

  if (href && href !== '#booking') {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

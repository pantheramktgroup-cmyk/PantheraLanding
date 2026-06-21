import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackCtaClick } from '../../lib/tracking'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  trackingLabel?: string
  trackingPage?: string
  icon?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panthera-green focus-visible:ring-offset-2 focus-visible:ring-offset-panthera-black disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-panthera-green bg-panthera-green text-[#050505] hover:bg-white hover:border-white hover:text-[#050505]',
  secondary:
    'border-panthera-green/45 bg-transparent text-panthera-green hover:border-white hover:bg-white hover:text-[#050505]',
  ghost: 'border-transparent bg-transparent px-0 text-panthera-green hover:text-white',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  trackingLabel,
  trackingPage = 'site',
  icon = true,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
    </>
  )

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (href) {
      trackCtaClick(trackingLabel ?? (typeof children === 'string' ? children : 'cta'), href, trackingPage)
    }

    onClick?.(event as React.MouseEvent<HTMLButtonElement>)
  }

  const classes = cn(baseClasses, variants[variant], className)

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href)

    if (isExternal) {
      return (
        <a className={classes} href={href} onClick={handleClick}>
          {content}
        </a>
      )
    }

    return (
      <Link className={classes} to={href} onClick={handleClick}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={handleClick} {...buttonProps}>
      {content}
    </button>
  )
}
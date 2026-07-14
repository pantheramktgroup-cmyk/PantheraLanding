import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteCopy } from '../../content/siteCopy'
import { cn } from '../../lib/utils'

function Wordmark({ className }: { className?: string }) {
  if (siteCopy.brand.logo) {
    return <img src={siteCopy.brand.logo} alt="Panthera Group" className={cn('h-5 w-auto object-contain md:h-5', className)} />
  }

  return (
    <span className={cn('font-display text-lg font-semibold uppercase tracking-[-0.02em] text-panthera-white', className)}>
      Panthera Group
    </span>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isScrolled || menuOpen ? 'border-b border-white/10 bg-black/90 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-panthera flex h-[72px] items-center justify-between gap-4">
        <NavLink to="/#inicio" aria-label="Panthera Group — Inicio">
          <Wordmark />
        </NavLink>

        <nav className="hidden items-center gap-9 lg:flex">
          {siteCopy.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'text-[12px] uppercase tracking-[0.18em] text-panthera-white transition-colors duration-300 ease-out hover:text-panthera-green',
                  isActive ? 'text-panthera-white' : 'text-panthera-white',
                )
              }
            >
              {({ isActive }) => (
                <span className="relative inline-flex flex-col">
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px bg-panthera-green transition-all duration-300',
                      isActive ? 'w-full' : 'w-0',
                    )}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-white/5 text-white transition-colors hover:border-panthera-green/50 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-panthera flex flex-col py-2">
              {siteCopy.nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between border-b border-white/[0.08] py-4 text-sm uppercase tracking-[0.16em] text-panthera-white transition-colors duration-300 ease-out hover:text-panthera-green',
                      isActive ? 'text-panthera-white' : 'text-panthera-white',
                    )
                  }
                >
                  {item.label}
                  <span className="text-panthera-white/30">→</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { pageTransition } from './lib/animations'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Results from './pages/Results'
import Contact from './pages/Contact'
import LandingPage from './landing-app/App.jsx'
import ThankYouPage from './landing-app/pages/ThankYouPage.jsx'
import SecondValidationPage from './landing-app/pages/SecondValidationPage.jsx'
import { useEffect, useLayoutEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const META_SCHEDULE_SESSION_KEY = 'meta_schedule_tracked_thank_you'
let hasTrackedMetaSchedule = false

function MetaScheduleTracking() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/thank-you-page' || hasTrackedMetaSchedule) return

    try {
      if (sessionStorage.getItem(META_SCHEDULE_SESSION_KEY) === 'true') {
        hasTrackedMetaSchedule = true
        return
      }
    } catch {
      // Continue with the in-memory guard when sessionStorage is unavailable.
    }

    let attempts = 0
    const maxAttempts = 20
    let retryId: number | undefined

    const trackSchedule = () => {
      if (hasTrackedMetaSchedule) return

      if (typeof window.fbq === 'function') {
        hasTrackedMetaSchedule = true

        try {
          sessionStorage.setItem(META_SCHEDULE_SESSION_KEY, 'true')
        } catch {
          // The in-memory guard still prevents duplicates during this page load.
        }

        window.fbq('track', 'Schedule')
        return
      }

      attempts += 1
      if (attempts < maxAttempts) {
        retryId = window.setTimeout(trackSchedule, 100)
      }
    }

    trackSchedule()

    return () => {
      if (retryId !== undefined) window.clearTimeout(retryId)
    }
  }, [location.pathname])

  return null
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Prevent browser history from restoring a previous scroll position.
    window.history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    const shouldResetToHero = ['/', '/quienes-somos', '/servicios', '/resultados', '/contacto'].includes(location.pathname)
    if (!shouldResetToHero) return

    const resetToTop = () => {
      // Use explicit API + direct properties to defeat smooth-scroll and transition timing.
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Run multiple times because route transitions/media can re-apply previous offset.
    resetToTop()
    const rafId = requestAnimationFrame(resetToTop)
    const t1 = window.setTimeout(resetToTop, 80)
    const t2 = window.setTimeout(resetToTop, 260)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [location.pathname, location.key])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const onMouseMove = (event: MouseEvent) => {
      const titles = document.querySelectorAll<HTMLElement>('.interactive-title')
      titles.forEach((title) => {
        const rect = title.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        title.style.setProperty('--mouse-x', `${x}px`)
        title.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return null
}

function AppShell() {
  const location = useLocation()
  const isLandingRoute =
    location.pathname === '/thank-you-page' ||
    location.pathname === '/segunda-validacion' ||
    location.pathname.startsWith('/segunda-validacion/') ||
    location.pathname === '/landing' ||
    location.pathname.startsWith('/landing/')

  return (
    <div className="relative min-h-screen overflow-x-clip bg-panthera-black">
      <ScrollToTop />
      <MetaScheduleTracking />
      {!isLandingRoute ? <Header /> : null}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/resultados" element={<Results />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/thank-you-page" element={<ThankYouPage />} />
            <Route path="/segunda-validacion" element={<SecondValidationPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!isLandingRoute ? <Footer /> : null}
    </div>
  )
}

export default function App() {
  return <AppShell />
}

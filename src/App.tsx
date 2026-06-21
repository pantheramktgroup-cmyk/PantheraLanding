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
import LandingPage from './pages/landing/LandingPage.jsx'
import ThankYouPage from './pages/landing/ThankYouPage.jsx'
import { useEffect } from 'react'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

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
    location.pathname === '/landing' ||
    location.pathname.startsWith('/landing/')

  return (
    <div className="relative min-h-screen overflow-x-clip bg-panthera-black">
      <ScrollToTop />
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
import { useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FounderVideo from './components/sections/FounderVideo'
import Testimonials from './components/sections/Testimonials'
import AudienceFit from './components/sections/AudienceFit'
import CoreProblem from './components/sections/CoreProblem'
import ApexSystem from './components/sections/ApexSystem'
import SystemPieces from './components/sections/SystemPieces'
import Comparison from './components/sections/Comparison'
import AboutPanthera from './components/sections/AboutPanthera'
import Booking from './components/sections/Booking'
import FAQ from './components/sections/FAQ'
import ThankYouPage from './pages/ThankYouPage'

// Import GSAP lib to register plugins on module load
import './lib/gsap'

function Landing() {
  useEffect(() => {
    const jumpToBookingFromHash = () => {
      if (window.location.hash !== '#booking') return

      let attempts = 0
      const maxAttempts = 24

      const tryJump = () => {
        const booking = document.getElementById('booking')
        if (!booking) {
          attempts += 1
          if (attempts < maxAttempts) {
            setTimeout(tryJump, 80)
          }
          return
        }

        booking.scrollIntoView({ behavior: 'auto', block: 'start' })
        window.scrollBy(0, -80)
      }

      tryJump()
    }

    jumpToBookingFromHash()
    window.addEventListener('hashchange', jumpToBookingFromHash)
    return () => window.removeEventListener('hashchange', jumpToBookingFromHash)
  }, [])

  return (
    <>
      <Header />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Video / Manifiesto */}
        <FounderVideo />

        {/* 3. Casos reales / Testimonios */}
        <Testimonials />

        {/* 5. Filtro de aplicación */}
        <AudienceFit />

        {/* 6. Problema central */}
        <CoreProblem />

        {/* 7. Panthera APEX System — horizontal scroll + CTA como último panel */}
        <ApexSystem />

        {/* 8. Lo que se ordena dentro del sistema */}
        <SystemPieces />

        {/* 9. Diferencia Panthera */}
        <Comparison />

        {/* 10. Quiénes somos */}
        <AboutPanthera />

        {/* 11. Calendario / cierre */}
        <Booking />

        {/* 12. FAQ — después del calendario */}
        <FAQ />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  // Initialize Lenis smooth scroll + GSAP integration
  useLenis()

  const path = window.location.pathname

  if (path === '/thank-you-page') {
    return <ThankYouPage />
  }

  return <Landing />
}

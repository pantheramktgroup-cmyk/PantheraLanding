import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useLenis } from './hooks/useLenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Booking from './components/sections/Booking'
import Testimonials from './components/sections/Testimonials'
import StatsStrip from './components/sections/StatsStrip'
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
        <Hero />

        <Booking />

        <Testimonials />

        <StatsStrip />

        <FAQ />
      </main>

      <Footer />
    </>
  )
}

function VercelTracking() {
  return (
    <>
      <Analytics />

      <SpeedInsights />
    </>
  )
}

export default function App() {
  // Initialize Lenis smooth scroll + GSAP integration
  useLenis()

  const path = window.location.pathname
  const normalizedPath = path.replace(/\/+$/, '') || '/'
  const isThankYouPage = normalizedPath === '/thank-you-page'

  if (isThankYouPage) {
    return (
      <>
        <ThankYouPage />
        <VercelTracking />
      </>
    )
  }

  return (
    <>
      <Landing />
      <VercelTracking />
    </>
  )
}
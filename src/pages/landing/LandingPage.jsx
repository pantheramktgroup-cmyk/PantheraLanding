import { useEffect, useState } from 'react'
import Header from '../../components/landing/layout/Header'
import Footer from '../../components/landing/layout/Footer'
import Hero from '../../components/landing/sections/Hero'
import FounderVideo from '../../components/landing/sections/FounderVideo'
import StatsStrip from '../../components/landing/sections/StatsStrip'
import TransformationStatement from '../../components/landing/sections/TransformationStatement'
import AudienceFit from '../../components/landing/sections/AudienceFit'
import CoreProblem from '../../components/landing/sections/CoreProblem'
import ApexSystem from '../../components/landing/sections/ApexSystem'
import SystemPieces from '../../components/landing/sections/SystemPieces'
import Comparison from '../../components/landing/sections/Comparison'
import Testimonials from '../../components/landing/sections/Testimonials'
import AboutPanthera from '../../components/landing/sections/AboutPanthera'
import FAQ from '../../components/landing/sections/FAQ'
import Booking from '../../components/landing/sections/Booking'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../../hooks/landing/useLenis'
import {
  getVariantFromUrl,
  resolveLandingVariant,
  setStoredLandingVariant,
} from '../../lib/landing/landingVariant'
import { trackEvent } from '../../lib/landing/tracking'
import '../../styles/landing.css'

const GHL_TRACKING_SRC = 'https://links.iqautomated.io/js/external-tracking.js'
const GHL_FORM_EMBED_SRC = 'https://links.iqautomated.io/js/form_embed.js'

export default function LandingPage() {
  const location = useLocation()
  const currentSearch = location.search || window.location.search
  const variantFromUrl = getVariantFromUrl(currentSearch)
  const [variantState, setVariantState] = useState(() => resolveLandingVariant(currentSearch))
  const variant = variantFromUrl || variantState.variant
  const variantSource = variantFromUrl ? 'url' : variantState.source

  useLenis()

  useEffect(() => {
    const nextSearch = location.search || window.location.search
    const fromUrl = getVariantFromUrl(nextSearch)

    if (fromUrl) {
      setStoredLandingVariant(fromUrl)
      setVariantState((prev) =>
        prev.variant === fromUrl && prev.source === 'url'
          ? prev
          : { variant: fromUrl, source: 'url' }
      )
      return
    }

    setVariantState(resolveLandingVariant(nextSearch))
  }, [location.search])

  useEffect(() => {
    trackEvent('landing_page_view', {
      variant,
      variant_source: variantSource,
      page_path: window.location.pathname,
    })
  }, [variant, variantSource])

  useEffect(() => {
    const loadScript = (src, attrs = {}) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing) {
          if (existing.dataset.loaded === 'true') {
            resolve()
            return
          }

          existing.addEventListener('load', () => resolve(), { once: true })
          existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), {
            once: true,
          })
          return
        }

        const script = document.createElement('script')
        script.src = src
        script.async = false
        Object.entries(attrs).forEach(([key, value]) => {
          script.setAttribute(key, value)
        })

        script.addEventListener(
          'load',
          () => {
            script.dataset.loaded = 'true'
            resolve()
          },
          { once: true }
        )
        script.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), {
          once: true,
        })

        document.body.appendChild(script)
      })

    let cancelled = false

    const loadGhlScripts = async () => {
      try {
        await loadScript(GHL_TRACKING_SRC, {
          'data-tracking-id': 'tk_cb83dad2568c43b39bebb2c145a9e86e',
        })
        if (cancelled) return

        await loadScript(GHL_FORM_EMBED_SRC, {
          type: 'text/javascript',
        })
      } catch (error) {
        console.error(error)
      }
    }

    loadGhlScripts()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (window.location.hash !== '#booking') return

    const booking = document.getElementById('booking')
    if (!booking) return

    booking.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="landing-root bg-panthera-deep text-panthera-white">
      <Header />
      <main data-landing-variant={variant}>
        <Hero variant={variant} />
        <StatsStrip />
        <FounderVideo variant={variant} />
        <Testimonials variant={variant} />
        {variant === 'A' ? <AudienceFit /> : null}
        {variant === 'A' ? <CoreProblem /> : <TransformationStatement />}
        <ApexSystem variant={variant} />
        {variant === 'B' ? <AudienceFit /> : null}
        {variant === 'A' ? <SystemPieces /> : null}
        <Comparison />
        <AboutPanthera />
        <Booking variant={variant} />
        <FAQ variant={variant} />
      </main>
      <Footer />
    </div>
  )
}

import { useLenis } from './hooks/useLenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FounderVideo from './components/sections/FounderVideo'
import Testimonials from './components/sections/Testimonials'
import TransformationStatement from './components/sections/TransformationStatement'
import AudienceFit from './components/sections/AudienceFit'
import CoreProblem from './components/sections/CoreProblem'
import ApexSystem from './components/sections/ApexSystem'
import SystemPieces from './components/sections/SystemPieces'
import Comparison from './components/sections/Comparison'
import AboutPanthera from './components/sections/AboutPanthera'
import Booking from './components/sections/Booking'
import FAQ from './components/sections/FAQ'

// Import GSAP lib to register plugins on module load
import './lib/gsap'

export default function App() {
  // Initialize Lenis smooth scroll + GSAP integration
  useLenis()

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

        {/* 4. Statement de transformación */}
        <TransformationStatement />

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

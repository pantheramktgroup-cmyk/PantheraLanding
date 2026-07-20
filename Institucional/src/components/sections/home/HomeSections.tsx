import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteCopy } from '../../../content/siteCopy'
import Button from '../../ui/Button'
import SectionHeader from '../../ui/SectionHeader'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import InteractiveBackground from './InteractiveBackground'
import ApexSystemArc from './ApexSystemArc'
import SpaceCanvas from './SpaceCanvas'

const handleSpotlightMove = (event: React.MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  event.currentTarget.style.setProperty('--spotlight-x', `${x}px`)
  event.currentTarget.style.setProperty('--spotlight-y', `${y}px`)
}

export function HomeHeroSection() {
  const { hero } = siteCopy.home

  return (
    <section id="inicio" className="relative min-h-[92svh] overflow-hidden border-b border-white/10 bg-black pt-[72px] md:min-h-[100svh]">
      <SpaceCanvas />
      <InteractiveBackground intensity={0.055} showGrid showNoise followMouse className="opacity-72 md:opacity-56" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/52 to-black/86 md:from-black/15 md:via-black/62 md:to-black/92" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[6%] top-[14%] h-[54%] bg-[radial-gradient(ellipse_at_center,rgba(227,247,141,0.17),rgba(227,247,141,0.045)_42%,transparent_78%)] opacity-70 md:hidden" aria-hidden="true" />

      <div className="container-panthera relative flex min-h-[calc(92svh-72px)] flex-col justify-center py-10 sm:min-h-[calc(100svh-72px)] sm:py-12 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            className="mb-5 flex items-center justify-center gap-3 sm:mb-7"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="accent-line" aria-hidden="true" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-panthera-green sm:tracking-[0.3em]">Inicio</p>
          </motion.div>

          <h1
            className="interactive-title text-balance font-display text-[2.7rem] font-bold leading-[0.9] tracking-[-0.06em] sm:text-[4.8rem] lg:text-[8.3rem]"
          >
            {hero.brandWord}
          </h1>

          <motion.p
            className="mx-auto mt-4 max-w-[34ch] text-balance text-[15px] leading-6 text-panthera-white/90 sm:mt-5 sm:max-w-3xl sm:text-[20px] sm:leading-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.title}
          </motion.p>

          <motion.p
            className="mx-auto mt-4 max-w-[34ch] text-[14px] leading-6 text-panthera-white/66 sm:mt-5 sm:max-w-2xl sm:text-[15px] sm:leading-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Diseñamos sistemas de captación, seguimiento y procesos comerciales para convertir
            <br className="hidden md:block" />
            atención en oportunidades calificadas.
          </motion.p>

          <motion.div className="mt-7 flex justify-center sm:mt-9" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <Button href="/servicios" variant="secondary" trackingLabel="hero_services_cta" trackingPage="home" className="mx-auto w-[300px] max-w-full md:mx-0 md:w-auto">
              Ver servicios
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function HomeManifestoSection() {
  const { manifesto } = siteCopy.home

  return (
    <section className="section-pad relative bg-black py-12 sm:py-14 md:py-20 lg:py-24">
      <InteractiveBackground intensity={0.052} showGrid showNoise followMouse className="opacity-56" />
      <div className="container-panthera">
        <div className="grid gap-7 pt-4 sm:gap-8 sm:pt-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pt-8">
          <motion.div variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
            <div className="mb-5 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{manifesto.eyebrow}</p>
            </div>
            <h2
              className="interactive-title font-display-medium-local max-w-[18ch] text-balance font-display text-[1.75rem] font-bold leading-[1] tracking-[-0.05em] sm:text-[2.35rem] lg:text-[3.4rem]"
            >
              Ordenamos lo que muchas empresas intentan resolver con piezas sueltas.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[14px] leading-6 text-panthera-white/68 sm:mt-6 sm:max-w-[52ch] sm:text-[15px] sm:leading-7">
              Panthera trabaja sobre el sistema completo: captación, comunicación, seguimiento, procesos comerciales y medición.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
            <div className="relative overflow-hidden border border-white/12 bg-panthera-deep/70 p-5 sm:p-6 lg:p-7">
              <p className="text-[14px] leading-7 text-panthera-white/76 sm:text-[15px] sm:leading-8">
                Tu oferta funciona. Sabés vender. Lo que falta es la estructura que conecte captación, seguimiento y oportunidades calificadas.
              </p>
            </div>

            <div className="grid gap-3">
              {manifesto.principles.map((principle, index) => (
                <article
                  key={principle}
                  className="group relative overflow-hidden border border-white/10 bg-panthera-deep/62 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/45 hover:bg-panthera-elevated/78"
                  onMouseMove={handleSpotlightMove}
                  style={{
                    backgroundImage:
                      'radial-gradient(circle 110px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.09), rgba(227,247,141,0.03) 40%, transparent 72%)',
                  }}
                >
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.15em] text-panthera-white/84">
                      <span className="inline-flex h-6 min-w-[1.8rem] items-center justify-center border border-panthera-green/35 text-[10px] font-semibold text-panthera-green transition-all duration-300 group-hover:border-panthera-green/70 group-hover:shadow-[0_0_14px_rgba(227,247,141,0.22)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {principle}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-panthera-white/34 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-panthera-green" />
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function HomeServicesPreviewSection() {
  const { servicesPreview } = siteCopy.home
  const [activeMobileService, setActiveMobileService] = useState(0)

  return (
    <section className="section-pad relative overflow-hidden border-t border-white/10 bg-panthera-deep py-14 sm:py-16 md:py-24 lg:py-32">
      <InteractiveBackground intensity={0.05} showGrid showNoise followMouse className="opacity-45" />
      <div className="container-panthera">
        <SectionHeader
          eyebrow={servicesPreview.eyebrow}
          title="Servicios que funcionan como sistema"
          subtitle="Arquitectura de demanda, captación, operación y optimización alineadas a la misma estrategia."
        />
        <motion.div
          className="mt-8 space-y-1 border-y border-white/10 md:hidden"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {servicesPreview.items.map((item, index) => {
            const isActive = activeMobileService === index

            return (
              <motion.article key={item.number} className="border-b border-white/10 last:border-b-0" variants={cardReveal}>
                <button
                  type="button"
                  onClick={() => setActiveMobileService(index)}
                  className={`relative w-full px-0 py-3.5 text-left transition-colors duration-300 ${isActive ? 'bg-panthera-green/[0.05]' : 'bg-transparent'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-panthera-green">{item.number}</span>
                      <p className={`text-[13px] uppercase tracking-[0.11em] transition-colors ${isActive ? 'text-panthera-white' : 'text-panthera-white/74'}`}>{item.title}</p>
                    </div>
                    <ArrowUpRight className={`h-4 w-4 shrink-0 transition-all duration-300 ${isActive ? '-translate-y-0.5 translate-x-0.5 rotate-45 text-panthera-green' : 'text-panthera-white/46'}`} />
                  </div>
                </button>

                {isActive ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: 6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 6 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pb-3 pr-8 text-[13px] leading-6 text-panthera-white/66"
                  >
                    {item.text}
                  </motion.p>
                ) : null}
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-10 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {servicesPreview.items.map((item) => (
            <motion.article
              key={item.number}
              className="group relative overflow-hidden border border-white/10 bg-panthera-deep p-5 sm:p-6 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/50 hover:bg-panthera-elevated"
              onMouseMove={handleSpotlightMove}
              style={{
                backgroundImage:
                  'radial-gradient(circle 120px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.10), rgba(227,247,141,0.03) 36%, transparent 72%)',
              }}
              variants={cardReveal}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-panthera-green/0 via-panthera-green/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <div className="relative mb-6 flex items-center justify-between">
                <span className="font-display text-4xl font-semibold tracking-[-0.05em] text-panthera-green transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-90">{item.number}</span>
                <ArrowUpRight className="h-5 w-5 text-panthera-white/34 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-panthera-green" />
              </div>
              <h3 className="relative text-lg font-medium tracking-[-0.03em] text-panthera-white">{item.title}</h3>
              <p className="relative mt-3 text-[13px] leading-6 text-panthera-white/66">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-7 flex justify-center sm:mt-8 md:block">
          <Button href="/servicios" variant="secondary" trackingLabel="home_services_preview_cta" trackingPage="home" className="mx-auto w-[300px] max-w-full md:mx-0 md:w-auto">
            Ver servicios
          </Button>
        </div>
      </div>
    </section>
  )
}

export function HomeApexSection() {
  const { apex } = siteCopy.home
  const apexPhases = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Revisamos oferta, procesos comerciales, canales y puntos de fuga.',
    },
    {
      number: '02',
      title: 'Auditoría',
      description: 'Analizamos cada pieza del ecosistema comercial para detectar cuellos de botella.',
    },
    {
      number: '03',
      title: 'Arquitectura',
      description: 'Diseñamos la estructura del sistema para atraer, filtrar y convertir con más orden.',
    },
    {
      number: '04',
      title: 'Construcción',
      description: 'Implementamos landing pages, CRM, automatizaciones, dashboards y activos clave.',
    },
    {
      number: '05',
      title: 'Activación',
      description: 'Ponemos el sistema en marcha y lanzamos la captación con seguimiento operativo.',
    },
    {
      number: '06',
      title: 'Optimización',
      description: 'Leemos datos reales, detectamos fricciones y ajustamos para mejorar conversión.',
    },
    {
      number: '07',
      title: 'Escalabilidad',
      description: 'Expandimos lo que ya funciona sobre una base más sólida y medible.',
    },
  ] as const
  const [activePhase, setActivePhase] = useState(0)

  return (
    <section className="section-pad relative overflow-hidden border-t border-white/10 bg-black pb-3 pt-14 sm:pt-16 md:pb-4 md:pt-24 lg:pb-4 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-36" aria-hidden="true">
        <SpaceCanvas />
      </div>
      <InteractiveBackground intensity={0.062} showGrid showNoise followMouse className="opacity-68 md:opacity-58" />
      <div className="pointer-events-none absolute inset-x-0 top-[16%] h-[62%] bg-[radial-gradient(ellipse_at_center,rgba(227,247,141,0.14),rgba(227,247,141,0.042)_38%,transparent_74%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.3)_56%,rgba(0,0,0,0.58)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(6,6,6,0.72)_70%,rgba(7,7,7,0.95)_100%)]" aria-hidden="true" />
      <div className="container-panthera relative">
        <SectionHeader
          eyebrow={apex.eyebrow}
          title="La metodología que ordena la captación y la generación de oportunidades."
          subtitle="Siete fases para construir un sistema de demanda que no dependa de improvisación ni esfuerzo manual constante."
        />

        <div className="relative mt-4 md:mt-8">
          <div className="relative hidden lg:block">
            <ApexSystemArc phases={apexPhases} activePhase={activePhase} onPhaseChange={setActivePhase} />
          </div>

          <div className="lg:hidden">
            <div className="px-1 pb-1 pt-1 sm:px-2">
              <div className="relative ml-1 border-l border-white/20 pl-5">
                {apexPhases.map((phase, index) => {
                  const isActive = index === activePhase

                  return (
                    <div key={phase.number + phase.title} className="relative pb-4 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setActivePhase(index)}
                        className="group w-full text-left"
                      >
                        <span
                          className={`absolute -left-[1.55rem] mt-1.5 h-3 w-3 rounded-full border transition-all duration-300 ${isActive ? 'border-panthera-green bg-panthera-green shadow-[0_0_10px_rgba(227,247,141,0.45)]' : 'border-white/45 bg-black'}`}
                          aria-hidden="true"
                        />
                        <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${isActive ? 'text-panthera-green' : 'text-panthera-white/52'}`}>
                          {phase.number}
                        </p>
                        <p className={`mt-1 text-[14px] uppercase tracking-[0.12em] transition-colors ${isActive ? 'text-panthera-white' : 'text-panthera-white/68 group-hover:text-panthera-white/90'}`}>
                          {phase.title}
                        </p>
                      </button>
                      {isActive ? (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-2 border-l border-panthera-green/40 pl-3 text-[13px] leading-6 text-panthera-ash"
                        >
                          {phase.description}
                        </motion.p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeResultsPreviewSection() {
  const { resultsPreview } = siteCopy.home
  const railRef = useRef<HTMLDivElement | null>(null)

  const scrollRail = (direction: 'left' | 'right') => {
    if (!railRef.current) return

    const rail = railRef.current
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-results-card]'))
    if (!cards.length) return

    const railRect = rail.getBoundingClientRect()
    const offsets = cards.map((card) => card.getBoundingClientRect().left - railRect.left + rail.scrollLeft)
    const current = rail.scrollLeft
    const currentIndex = offsets.reduce((bestIndex, offset, index) => {
      const bestDistance = Math.abs(offsets[bestIndex] - current)
      const candidateDistance = Math.abs(offset - current)
      return candidateDistance < bestDistance ? index : bestIndex
    }, 0)

    const nextIndex = direction === 'right'
      ? Math.min(currentIndex + 1, offsets.length - 1)
      : Math.max(currentIndex - 1, 0)

    const target = offsets[nextIndex]

    rail.scrollTo({ left: target, behavior: 'smooth' })
  }

  return (
    <section className="section-pad border-t border-white/10 bg-panthera-deep py-14 sm:py-16 md:py-24 lg:py-32">
      <div className="container-panthera">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeader eyebrow={resultsPreview.eyebrow} title={resultsPreview.title} subtitle={resultsPreview.subtitle} className="max-w-2xl" />
            <div className="flex items-center gap-3 self-start sm:self-auto sm:justify-start">
            <button
              type="button"
              onClick={() => scrollRail('left')}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-black/30 text-white/70 transition-colors hover:border-panthera-green/50 hover:text-panthera-green"
              aria-label="Desplazar testimonios a la izquierda"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail('right')}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-black/30 text-white/70 transition-colors hover:border-panthera-green/50 hover:text-panthera-green"
              aria-label="Desplazar testimonios a la derecha"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={railRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {resultsPreview.cases.map((item) => (
            <motion.article data-results-card key={item.name} className="group flex min-h-[280px] w-[86vw] max-w-[332px] shrink-0 snap-start flex-col border border-white/10 bg-panthera-deep p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:min-h-[320px] sm:w-[88vw] sm:max-w-[360px] sm:p-8" variants={cardReveal}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">Caso</p>
              <h3 className="mt-3 text-[1.1rem] font-medium tracking-[-0.03em] text-panthera-white sm:mt-4 sm:text-xl">{item.name}</h3>
              <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-panthera-white/58">{item.role}</p>
              <p className="mt-4 flex-1 text-[13px] leading-6 text-panthera-white/66 sm:mt-6">{item.text}</p>
              <Link
                to="/resultados"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-panthera-green transition-colors duration-300 ease-out group-hover:text-panthera-white sm:mt-8"
              >
                {siteCopy.home.resultsPreview.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-7 flex justify-center sm:mt-8 md:block">
          <Button href="/resultados" variant="secondary" trackingLabel="home_results_preview" trackingPage="home" className="mx-auto w-[300px] max-w-full md:mx-0 md:w-auto">
            {resultsPreview.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

export function HomeFinalCtaSection() {
  const { finalCta } = siteCopy.home

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black">
      <InteractiveBackground intensity={0.048} showGrid showNoise followMouse className="opacity-42" />
      <div className="container-panthera py-14 sm:py-16 md:py-24 lg:py-36">
        <motion.div
          className="grid gap-7 sm:gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-10"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3 sm:mb-7">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{finalCta.eyebrow}</p>
            </div>
            <h2
              className="interactive-title max-w-3xl text-balance font-display text-[2rem] font-medium leading-[1.02] tracking-[-0.05em] sm:text-[2.6rem] lg:text-[3.6rem] lg:leading-[0.98]"
            >
              {finalCta.title}
            </h2>
          </div>
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[14px] leading-6 text-panthera-white/66 sm:text-[15px] sm:leading-7">{finalCta.text}</p>
            <div className="mt-7 flex justify-center sm:mt-8 lg:block">
              <Button href="/servicios" variant="secondary" trackingLabel="home_final_cta" trackingPage="home" className="mx-auto w-[300px] max-w-full md:mx-0 md:w-auto">
                {finalCta.cta}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

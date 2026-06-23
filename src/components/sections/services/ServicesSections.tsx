import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import Button from '../../ui/Button'
import InteractiveBackground from '../home/InteractiveBackground'
import { siteCopy } from '../../../content/siteCopy'

const servicesCopy = siteCopy.servicesPage
const infrastructureItems = servicesCopy.infrastructure.items
const systems = servicesCopy.systems.items
const roadmap = servicesCopy.roadmap.items
const fitGood = servicesCopy.fit.good
const fitBad = servicesCopy.fit.bad

const cardSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 120px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.10), rgba(227,247,141,0.03) 38%, transparent 72%)',
}

const panelSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 150px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.08), rgba(227,247,141,0.022) 40%, transparent 72%)',
}

type HeadingBlockProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

function HeadingBlock({ eyebrow, title, subtitle }: HeadingBlockProps) {
  return (
    <motion.div variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <div className="mb-5 flex items-center gap-3">
        <span className="accent-line" aria-hidden="true" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{eyebrow}</p>
      </div>
      <h2
        className="interactive-title max-w-4xl text-balance font-display text-[2rem] font-medium leading-[0.98] tracking-[-0.055em] sm:text-4xl lg:text-[3.4rem]"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-6 max-w-3xl text-[15px] leading-7 text-panthera-white/68">{subtitle}</p> : null}
    </motion.div>
  )
}

const handleSpotlightMove = (event: React.MouseEvent<HTMLElement>) => {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

  const sectionRect = event.currentTarget.getBoundingClientRect()
  const sectionX = event.clientX - sectionRect.left
  const sectionY = event.clientY - sectionRect.top

  event.currentTarget.style.setProperty('--spotlight-x', `${sectionX}px`)
  event.currentTarget.style.setProperty('--spotlight-y', `${sectionY}px`)
  event.currentTarget.style.setProperty('--mouse-x', `${sectionX}px`)
  event.currentTarget.style.setProperty('--mouse-y', `${sectionY}px`)

  const interactiveTitles = event.currentTarget.querySelectorAll<HTMLElement>('.interactive-title')
  interactiveTitles.forEach((title) => {
    const titleRect = title.getBoundingClientRect()
    const titleX = event.clientX - titleRect.left
    const titleY = event.clientY - titleRect.top
    title.style.setProperty('--mouse-x', `${titleX}px`)
    title.style.setProperty('--mouse-y', `${titleY}px`)
  })
}

export function ServicesHeroSection() {
  const reduceMotion = useReducedMotion()

  const scrollToInfrastructure = () => {
    const section = document.getElementById('infraestructura')
    if (!section) return
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black pt-[72px]" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.066} radius={220} showGrid showNoise followMouse touchDrift touchDriftAmount={0.16} className="opacity-64 sm:opacity-56" />
      <div className="services-hero-mobile-atmos pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
        <span className="services-hero-halo services-hero-halo-a" />
        <span className="services-hero-halo services-hero-halo-b" />
        <span className="services-hero-line services-hero-line-a" />
        <span className="services-hero-line services-hero-line-b" />
        <span className="services-hero-dot services-hero-dot-a" />
        <span className="services-hero-dot services-hero-dot-b" />
      </div>
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <HeadingBlock
          eyebrow={servicesCopy.hero.eyebrow}
          title={servicesCopy.hero.title}
          subtitle={servicesCopy.hero.subtitle}
        />
        <div className="mt-8 flex justify-start">
          <Button
            type="button"
            onClick={scrollToInfrastructure}
            variant="secondary"
            className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none"
            trackingLabel="services_hero_infra"
            trackingPage="services"
          >
            {servicesCopy.hero.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

export function ServicesInfrastructureSection() {
  const reduceMotion = useReducedMotion()
  const [openItem, setOpenItem] = useState(infrastructureItems[0]?.number ?? '01')
  const accordionRootRef = useRef<HTMLDivElement | null>(null)
  const bodyRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const root = accordionRootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      infrastructureItems.forEach((item) => {
        const node = bodyRefs.current[item.number]
        if (!node) return

        const isOpen = openItem === item.number

        if (reduceMotion) {
          gsap.set(node, { height: isOpen ? 'auto' : 0, autoAlpha: isOpen ? 1 : 0 })
          return
        }

        gsap.killTweensOf(node)

        if (isOpen) {
          gsap.to(node, {
            height: 'auto',
            autoAlpha: 1,
            duration: 0.34,
            ease: 'power2.out',
          })
        } else {
          gsap.to(node, {
            height: 0,
            autoAlpha: 0,
            duration: 0.26,
            ease: 'power2.inOut',
          })
        }
      })
    }, root)

    return () => ctx.revert()
  }, [openItem, reduceMotion])

  return (
    <section id="infraestructura" className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.056} radius={210} showGrid showNoise followMouse touchDrift touchDriftAmount={0.16} className="opacity-62 sm:opacity-50" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={servicesCopy.infrastructure.eyebrow}
          title={servicesCopy.infrastructure.title}
          subtitle={servicesCopy.infrastructure.subtitle}
        />

        <motion.div
          ref={accordionRootRef}
          className="services-mobile-field relative mt-10 space-y-2.5 sm:hidden"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="pointer-events-none absolute bottom-3 left-3 top-3 w-px bg-white/16" aria-hidden="true" />
          {infrastructureItems.map((item) => {
            const isOpen = openItem === item.number

            return (
            <motion.article
              key={item.number}
              className="services-mobile-surface relative ml-2.5 overflow-hidden border border-white/10 bg-panthera-deep/78"
              variants={cardReveal}
            >
              <button
                type="button"
                onClick={() => setOpenItem(item.number)}
                className="flex h-[74px] w-full items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-left"
                aria-expanded={isOpen}
                aria-controls={`infra-item-${item.number}`}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="font-display text-[1.55rem] font-semibold leading-none tracking-[-0.04em] text-panthera-green">{item.number}</span>
                  <h3 className="truncate text-[14px] font-medium tracking-[-0.02em] text-panthera-white">{item.title}</h3>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-panthera-white/54 transition-transform duration-300 ${isOpen ? 'rotate-180 text-panthera-green' : ''}`}
                />
              </button>

              <div
                id={`infra-item-${item.number}`}
                ref={(node) => {
                  bodyRefs.current[item.number] = node
                }}
                className="overflow-hidden px-4"
                style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              >
                <p className="border-l border-white/12 py-3 pl-3.5 text-[12.5px] leading-5 text-panthera-white/68">{item.text}</p>
              </div>
            </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-14 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {infrastructureItems.map((item) => (
            <motion.article
              key={item.number}
              className="group relative overflow-hidden border border-white/10 bg-panthera-deep p-7 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/50 hover:bg-panthera-elevated"
              onMouseMove={handleSpotlightMove}
              style={cardSpotlightStyle}
              variants={cardReveal}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-panthera-green transition-all duration-300 group-hover:[text-shadow:0_0_16px_rgba(227,247,141,0.42)]">
                  {item.number}
                </span>
                <ArrowUpRight className="h-5 w-5 text-panthera-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-panthera-green" />
              </div>
              <h3 className="mb-3 text-lg font-medium tracking-[-0.03em] text-panthera-white">{item.title}</h3>
              <p className="text-[13px] leading-6 text-panthera-ash">{item.text}</p>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function ServicesSystemsSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.064} radius={220} showGrid showNoise followMouse touchDrift touchDriftAmount={0.16} className="opacity-62 sm:opacity-50" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={servicesCopy.systems.eyebrow}
          title={servicesCopy.systems.title}
          subtitle={servicesCopy.systems.subtitle}
        />

        <div className="relative mt-16 hidden md:block">
          <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] h-px bg-white/14" aria-hidden="true" />
          <motion.div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
            {systems.map((item) => (
              <motion.article
                key={item.number}
                className="group relative px-1 pt-1 pb-3"
                onMouseMove={handleSpotlightMove}
                style={panelSpotlightStyle}
                variants={cardReveal}
              >
                <div className="border-l border-white/12 pl-5 transition-colors duration-300 group-hover:border-panthera-green/45">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-panthera-green">{item.number}</p>
                  <h3 className="mt-3 text-[18px] font-medium tracking-[-0.02em] text-panthera-white">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-panthera-white/68">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="services-mobile-field relative mt-10 space-y-4 md:hidden"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
        >
          <div className="pointer-events-none absolute bottom-1 left-[0.62rem] top-1 w-px bg-white/16" aria-hidden="true" />
          {systems.map((item) => (
            <motion.article
              key={item.number}
              className="services-mobile-surface group relative ml-4 pl-1.5"
              variants={cardReveal}
            >
              <div className="border-l border-white/12 pl-3 transition-colors duration-300 group-hover:border-panthera-green/45">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-panthera-green">{item.number}</p>
                <h3 className="mt-2 text-[16px] font-medium tracking-[-0.02em] text-panthera-white">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-panthera-white/68">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function ServicesRoadmapSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.055} radius={200} showGrid showNoise followMouse touchDrift touchDriftAmount={0.15} className="opacity-60 sm:opacity-48" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={servicesCopy.roadmap.eyebrow}
          title={servicesCopy.roadmap.title}
          subtitle={servicesCopy.roadmap.subtitle}
        />

        <div className="mt-8">
          <Link
            to="/quienes-somos"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-panthera-green transition-colors duration-300 ease-out hover:text-panthera-white"
          >
            {servicesCopy.roadmap.methodologyLinkLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="services-mobile-field mt-10 overflow-hidden border border-white/12 bg-black/55 sm:mt-12">
          <div className="hidden border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-white/50 lg:grid lg:grid-cols-[0.8fr_1.25fr_1fr] lg:gap-6">
            <span>{servicesCopy.roadmap.stageLabel}</span>
            <span>{servicesCopy.roadmap.whatWeDoLabel}</span>
            <span>{servicesCopy.roadmap.clientReceivesLabel}</span>
          </div>

          {roadmap.map((item, index) => (
            <motion.article
              key={item.number}
              className="services-mobile-surface group grid gap-4 border-t border-white/10 px-4 py-5 transition-colors duration-300 first:border-t-0 hover:bg-panthera-elevated/55 sm:px-6 sm:py-6 lg:grid-cols-[0.8fr_1.25fr_1fr] lg:gap-6"
              onMouseMove={handleSpotlightMove}
              style={panelSpotlightStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">{item.number}</p>
                <h3 className="mt-2 text-[16px] font-medium tracking-[-0.02em] text-panthera-white">{item.stage}</h3>
              </div>

              <div className="lg:hidden">
                <p className="text-[13px] leading-6 text-panthera-white/78">{item.mobile}</p>
              </div>

              <div className="hidden lg:block">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-panthera-white/50 lg:hidden">Que hacemos</p>
                <p className="text-[13px] leading-6 text-panthera-ash">{item.work}</p>
              </div>
              <div className="hidden lg:block">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-panthera-white/50 lg:hidden">Que recibe el cliente</p>
                <p className="text-[13px] leading-6 text-panthera-white/80">{item.outcome}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesFitSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.055} radius={200} showGrid showNoise followMouse touchDrift touchDriftAmount={0.15} className="opacity-60 sm:opacity-50" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={servicesCopy.fit.eyebrow}
          title={servicesCopy.fit.title}
          subtitle={servicesCopy.fit.subtitle}
        />

        <div className="services-fit-mobile-stack mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:border lg:border-white/10">
          <motion.div className="services-fit-card services-fit-card-positive services-mobile-field services-mobile-surface border border-white/10 bg-panthera-deep p-6 sm:p-10 lg:border-0" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{servicesCopy.fit.goodTitle}</p>
            </div>
            <ul className="space-y-3">
              {fitGood.map((item) => (
                <li key={item} className="services-fit-item services-fit-item-positive group flex gap-3 border border-transparent px-2 py-2 text-[14px] leading-6 text-panthera-ash transition-colors duration-300 hover:border-panthera-green/30 hover:bg-black/20 hover:text-panthera-white/88">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-panthera-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="services-fit-card services-fit-card-negative services-mobile-field services-mobile-surface border border-white/10 bg-black/92 p-6 sm:p-10 lg:border-0 lg:border-l lg:border-white/10" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-10 shrink-0 bg-white/30" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-white/60">{servicesCopy.fit.badTitle}</p>
            </div>
            <ul className="space-y-3">
              {fitBad.map((item) => (
                <li key={item} className="services-fit-item services-fit-item-negative group flex gap-3 border border-transparent px-2 py-2 text-[14px] leading-6 text-panthera-ash transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.02] hover:text-panthera-white/86">
                  <X className="mt-1 h-4 w-4 shrink-0 text-panthera-white/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesCtaSection() {
  return (
    <section className="section-with-spotlight relative border-t border-white/10 bg-black" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.062} radius={220} showGrid showNoise followMouse touchDrift touchDriftAmount={0.15} className="opacity-62 sm:opacity-52" />
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <motion.div
          className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{servicesCopy.cta.eyebrow}</p>
            </div>
            <h2
              className="interactive-title max-w-3xl text-balance font-display text-3xl font-medium leading-[1.01] tracking-[-0.05em] sm:text-5xl lg:text-[3.4rem] lg:leading-[0.98]"
            >
              {servicesCopy.cta.title}
            </h2>
          </div>

          <div className="space-y-7 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[14px] leading-7 text-panthera-white/72 sm:text-[15px]">
              {servicesCopy.cta.text}
            </p>
            <div className="flex justify-start">
              <Button
                href={servicesCopy.cta.href}
                variant="secondary"
                trackingLabel="services_final_contact"
                trackingPage="services"
                className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none"
              >
                {servicesCopy.cta.button}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

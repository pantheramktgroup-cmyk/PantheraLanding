import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import Button from '../../ui/Button'
import InteractiveBackground from '../home/InteractiveBackground'

const infrastructureItems = [
  {
    number: '01',
    title: 'Diagnostico comercial',
    text: 'Analisis de oferta, ticket, avatar, canales actuales, proceso de venta y puntos criticos.',
  },
  {
    number: '02',
    title: 'Arquitectura de funnel',
    text: 'Diseno del recorrido desde la atencion inicial hasta la llamada, propuesta o venta.',
  },
  {
    number: '03',
    title: 'Landing pages',
    text: 'Activos de conversion alineados a la oferta, audiencia, mensaje y proceso comercial.',
  },
  {
    number: '04',
    title: 'CRM y automatizacion',
    text: 'Pipelines, campos, workflows, calendarios, recordatorios y seguimiento operativo.',
  },
  {
    number: '05',
    title: 'Captacion',
    text: 'Estrategia, configuracion, optimizacion y escalado de campanas orientadas a oportunidades calificadas.',
  },
  {
    number: '06',
    title: 'Contenido y mensajes',
    text: 'Pilares, guiones, piezas organicas, comunicacion y angulos alineados a la estrategia.',
  },
  {
    number: '07',
    title: 'Flujo comercial',
    text: 'Scripts, procesos de calificacion, seguimiento, feedback comercial y mejora de llamadas.',
  },
  {
    number: '08',
    title: 'Reporting y optimizacion',
    text: 'Dashboards, KPIs, lectura de datos y decisiones de mejora a partir de evidencia real.',
  },
]

const systems = [
  {
    number: '01',
    title: 'Atraccion',
    text: 'Oferta, mensaje, contenidos, anuncios, landing pages y activos que generan atencion calificada.',
  },
  {
    number: '02',
    title: 'Conversion',
    text: 'CRM, agenda, calificacion, seguimiento, scripts y proceso comercial para transformar interes en oportunidades.',
  },
  {
    number: '03',
    title: 'Entrega',
    text: 'Onboarding, procesos, recursos y orden operativo para que la experiencia no dependa de improvisacion.',
  },
  {
    number: '04',
    title: 'Control',
    text: 'Dashboards, KPIs, lectura de datos y optimizacion continua para tomar decisiones con evidencia.',
  },
]

const roadmap = [
  {
    number: '01',
    stage: 'Diagnostico y direccion',
    work: 'Revisamos oferta, avatar, canales, activos, proceso comercial y objetivos.',
    outcome: 'Diagnostico inicial, prioridades y direccion estrategica.',
    mobile: 'Revisamos oferta, avatar, canales y proceso comercial para definir prioridades claras.',
  },
  {
    number: '02',
    stage: 'Arquitectura del sistema',
    work: 'Disenamos el recorrido comercial: captacion, filtrado, agenda, seguimiento y medicion.',
    outcome: 'Mapa del sistema, estructura de funnel, CRM y criterios de implementacion.',
    mobile: 'Disenamos el recorrido completo: captacion, filtrado, agenda, seguimiento y medicion.',
  },
  {
    number: '03',
    stage: 'Construccion de activos',
    work: 'Creamos o ajustamos landing, formularios, calendarios, mensajes, guiones, CRM y automatizaciones.',
    outcome: 'Infraestructura lista para activar y medir.',
    mobile: 'Creamos o ajustamos landing, formularios, calendarios, mensajes, CRM y automatizaciones.',
  },
  {
    number: '04',
    stage: 'Activacion y captacion',
    work: 'Lanzamos campanas, contenidos, flujos y procesos de seguimiento.',
    outcome: 'Primeros datos reales del sistema funcionando.',
    mobile: 'Lanzamos campanas, contenidos, flujos y procesos para obtener datos reales.',
  },
  {
    number: '05',
    stage: 'Optimizacion',
    work: 'Leemos metricas, llamadas, formularios, fuentes y conversiones para corregir puntos de fuga.',
    outcome: 'Mejoras sobre mensajes, anuncios, seguimiento, filtrado y conversion.',
    mobile: 'Leemos metricas, llamadas, formularios y conversiones para corregir puntos de fuga.',
  },
  {
    number: '06',
    stage: 'Escalabilidad',
    work: 'Con el sistema validado, ampliamos inversion, canales, automatizaciones y capacidad comercial.',
    outcome: 'Una estructura mas predecible, medible y preparada para crecer.',
    mobile: 'Con el sistema validado, ampliamos inversion, canales y operacion sobre una base medible.',
  },
]

const fitGood = [
  'Ya existe una oferta o una idea clara que se quiere ordenar.',
  'El negocio necesita mas previsibilidad comercial.',
  'Hay intencion real de medir, mejorar y participar del proceso.',
  'Se busca construir infraestructura, no solo acciones aisladas.',
]

const fitBad = [
  'Se busca una solucion magica o inmediata.',
  'Solo se quiere publicar anuncios sin ordenar el proceso comercial.',
  'No hay disposicion a revisar oferta, datos o seguimiento.',
  'Se busca delegar todo sin involucrarse en decisiones estrategicas.',
]

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
          eyebrow="Servicios"
          title="Servicios disenados para construir infraestructura comercial, no acciones aisladas."
          subtitle="Trabajamos sobre la estructura completa de captacion y ventas: estrategia, activos, CRM, automatizacion, seguimiento, publicidad, contenido y medicion."
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
            Ver infraestructura
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
          eyebrow="Infraestructura"
          title="Cada pieza conectada a la misma estrategia."
          subtitle="Panthera integra estrategia, captacion, activos, CRM, automatizacion, contenido, seguimiento y medicion para que el sistema funcione completo."
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
          eyebrow="Sistema operativo comercial"
          title="Lo que construimos es una estructura para atraer, convertir, entregar y medir."
          subtitle="Cada sistema cumple una funcion distinta, pero todos trabajan conectados para que el crecimiento no dependa de piezas aisladas."
        />

        <div className="relative mt-16 hidden md:block">
          <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] h-px bg-white/14" aria-hidden="true" />
          <motion.div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
            {systems.map((item) => (
              <motion.article
                key={item.number}
                className="group relative px-1 pt-10"
                onMouseMove={handleSpotlightMove}
                style={panelSpotlightStyle}
                variants={cardReveal}
              >
                <div className="mt-5 border-l border-white/12 pl-5 transition-colors duration-300 group-hover:border-panthera-green/45">
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
          eyebrow="Como trabajamos"
          title="Roadmap operativo para construir, activar y escalar el sistema comercial."
          subtitle="Cada etapa tiene foco, entregables y decisiones concretas. No es una lista de tareas: es una implementacion con direccion."
        />

        <div className="mt-8">
          <Link
            to="/quienes-somos"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-panthera-green transition-colors duration-300 ease-out hover:text-panthera-white"
          >
            Ver metodologia
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="services-mobile-field mt-10 overflow-hidden border border-white/12 bg-black/55 sm:mt-12">
          <div className="hidden border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-white/50 lg:grid lg:grid-cols-[0.8fr_1.25fr_1fr] lg:gap-6">
            <span>Etapa</span>
            <span>Que hacemos</span>
            <span>Que recibe el cliente</span>
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
          eyebrow="Para quien es"
          title="Cuando tiene sentido trabajar con Panthera."
          subtitle="Panthera funciona mejor cuando existe una direccion clara y el objetivo es ordenar como se atraen, filtran, convierten y miden oportunidades."
        />

        <div className="services-fit-mobile-stack mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:border lg:border-white/10">
          <motion.div className="services-fit-card services-fit-card-positive services-mobile-field services-mobile-surface border border-white/10 bg-panthera-deep p-6 sm:p-10 lg:border-0" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">Tiene sentido si</p>
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-white/60">Probablemente no sea el momento si</p>
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">Siguiente paso</p>
            </div>
            <h2
              className="interactive-title max-w-3xl text-balance font-display text-3xl font-medium leading-[1.01] tracking-[-0.05em] sm:text-5xl lg:text-[3.4rem] lg:leading-[0.98]"
            >
              Entende que parte de tu sistema comercial necesita orden primero.
            </h2>
          </div>

          <div className="space-y-7 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[14px] leading-7 text-panthera-white/72 sm:text-[15px]">
              El primer paso es revisar tu situacion actual y detectar si Panthera puede ayudarte a construir una
              estructura mas clara, medible y predecible.
            </p>
            <div className="flex justify-start">
              <Button
                href="/contacto"
                variant="secondary"
                trackingLabel="services_final_contact"
                trackingPage="services"
                className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none"
              >
                Ir a contacto
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

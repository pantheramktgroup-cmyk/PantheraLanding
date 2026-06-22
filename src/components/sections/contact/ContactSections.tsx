import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import InteractiveBackground from '../home/InteractiveBackground'

const whatsappUrl = 'https://wa.me/543813319626?text=Hola!%20Quiero%20aplicar%20al%20programa%20Panthera'
const diagnosticUrl = '/landing#booking'

const consultItems = [
  {
    number: '01',
    title: 'Crear un sistema desde cero',
    text: 'Si tenes una oferta o idea validada y necesitas construir una estructura comercial ordenada.',
  },
  {
    number: '02',
    title: 'Ordenar un sistema existente',
    text: 'Si ya vendes, pero dependes de referidos, esfuerzo manual o procesos poco claros.',
  },
  {
    number: '03',
    title: 'Mejorar captacion y seguimiento',
    text: 'Si tenes trafico, contenido o consultas, pero pocas oportunidades realmente calificadas.',
  },
  {
    number: '04',
    title: 'Entender que servicio aplica',
    text: 'Si quieres saber si necesitas estrategia, CRM, automatizacion, campanas, landing o una infraestructura mas completa.',
  },
]

const faqs = [
  {
    question: 'Que diferencia a Panthera de otras agencias de marketing?',
    answer:
      'Muchas agencias trabajan una parte aislada del problema: trafico, contenido o automatizacion parcial. Panthera trabaja la infraestructura comercial completa.\n\nNo nos interesa solo generar formularios. Buscamos conectar captacion, filtrado, CRM, seguimiento, agenda y medicion para que puedas mejorar el proceso con datos reales.',
  },
  {
    question: 'Funciona para mi tipo de negocio?',
    answer:
      'Funciona mejor para coaches, consultores, mentores, infoproductores y servicios high-ticket que ya tienen una oferta validada, pero necesitan mejorar captacion, filtrado, seguimiento y previsibilidad comercial.\n\nSi ya vendes y quieres ordenar la forma en la que generas oportunidades, tiene sentido analizarlo en una llamada.',
  },
  {
    question: 'Necesito conocimientos tecnicos?',
    answer:
      'No. La parte tecnica la trabajamos nosotros: estructura, CRM, automatizaciones, funnels, formularios, calendario y medicion.\n\nTu rol es aportar informacion estrategica sobre tu negocio, validar decisiones importantes y participar en las reuniones necesarias.',
  },
  {
    question: 'Cuanto tiempo requiere la implementacion del sistema?',
    answer:
      'Depende del punto de partida de cada negocio, la oferta, los activos disponibles y el estado del proceso comercial.\n\nEl trabajo se organiza por etapas: diagnostico, arquitectura, construccion, activacion y optimizacion. En la llamada revisamos tu caso y te damos una estimacion de tiempos para tu situacion especifica.',
  },
  {
    question: 'Es una solucion sostenible o solo una solucion rapida?',
    answer:
      'El enfoque de Panthera no esta en atajos ni trucos momentaneos. Esta en construir una infraestructura que pueda mejorar con datos y sostener el crecimiento con mas orden.\n\nLa idea no es generar un pico aislado, sino ayudarte a construir una base comercial mas clara, medible y preparada para crecer.',
  },
]

const cardSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 150px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.12), rgba(227,247,141,0.03) 40%, transparent 74%)',
}

const listSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 180px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.1), rgba(227,247,141,0.02) 40%, transparent 76%)',
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
      <h2 className="interactive-title max-w-4xl text-balance font-display text-[2rem] font-medium leading-[0.98] tracking-[-0.055em] sm:text-4xl lg:text-[3.4rem]">{title}</h2>
      {subtitle ? <p className="mt-6 max-w-3xl text-[15px] leading-7 text-panthera-white/68">{subtitle}</p> : null}
    </motion.div>
  )
}

function PrimaryContactCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex w-full max-w-[18.5rem] items-center justify-center gap-2 rounded-sm border border-panthera-green bg-panthera-green/12 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-panthera-green transition-colors duration-300 hover:border-white hover:bg-transparent hover:text-white sm:w-auto sm:max-w-none"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

function SecondaryContactCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex w-full max-w-[18.5rem] items-center justify-center gap-2 rounded-sm border border-panthera-green/30 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-panthera-green/85 transition-colors duration-300 hover:border-white hover:text-white sm:w-auto sm:max-w-none"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

export function ContactHeroSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black pt-[72px]" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.074} radius={238} showGrid showNoise followMouse touchDrift touchDriftAmount={0.2} className="opacity-72 sm:opacity-58" />
      <div className="contact-hero-mobile-atmos pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
        <span className="contact-hero-veil contact-hero-veil-a" />
        <span className="contact-hero-veil contact-hero-veil-b" />
        <span className="contact-hero-line contact-hero-line-a" />
        <span className="contact-hero-line contact-hero-line-b" />
      </div>
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <HeadingBlock
          eyebrow="Contacto"
          title="Contanos en que etapa esta tu negocio."
          subtitle="Si ya tenes una oferta validada y queres ordenar captacion, seguimiento, ventas y medicion, podemos ayudarte a entender si Panthera tiene sentido para tu caso."
        />
      </div>
    </section>
  )
}

export function ContactChannelsSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.064} radius={218} showGrid showNoise followMouse touchDrift touchDriftAmount={0.18} className="opacity-68 sm:opacity-52" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow="Canales de contacto"
          title="Elegi el canal segun tu etapa."
          subtitle="Si estas evaluando contexto inicial o ya quieres avanzar con una llamada, puedes usar el canal que mejor se ajuste a tu momento."
        />

        <motion.div
          className="contact-mobile-field mt-10 grid items-stretch gap-3.5 sm:mt-12 sm:gap-4 lg:grid-cols-12"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
        >
          <motion.article
            className="contact-mobile-surface group relative overflow-hidden border border-white/10 bg-black/45 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/50 hover:bg-panthera-elevated/85 sm:p-7 lg:col-span-7"
            style={cardSpotlightStyle}
            variants={cardReveal}
            onMouseMove={handleSpotlightMove}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">WhatsApp</p>
            <p className="mt-3 max-w-[56ch] text-[13.5px] leading-6 text-panthera-ash sm:mt-4 sm:text-[14px] sm:leading-7">
              Para consultas, diagnostico inicial o entender si Panthera aplica a tu negocio.
            </p>
            <div className="mt-6 flex justify-start sm:mt-7">
              <PrimaryContactCta href={whatsappUrl} label="Escribir por WhatsApp" />
            </div>
            <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
          </motion.article>

          <motion.article
            className="contact-mobile-surface group relative overflow-hidden border border-white/10 bg-black/40 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/45 hover:bg-panthera-elevated/82 sm:p-6 lg:col-span-5"
            style={cardSpotlightStyle}
            variants={cardReveal}
            onMouseMove={handleSpotlightMove}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">Diagnostico</p>
            <p className="mt-3 text-[13.5px] leading-6 text-panthera-ash sm:mt-4 sm:text-[14px] sm:leading-7">
              Si ya sabes que quieres evaluar una implementacion, puedes reservar una llamada directamente.
            </p>
            <div className="mt-6 flex justify-start">
              <SecondaryContactCta href={diagnosticUrl} label="Agendar diagnostico" />
            </div>
            <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export function ContactConsultSection() {
  const [activeConsult, setActiveConsult] = useState(consultItems[0]?.number ?? '01')

  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.068} radius={226} showGrid showNoise followMouse touchDrift touchDriftAmount={0.17} className="opacity-70 sm:opacity-56" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow="Que podes consultarnos"
          title="Podes escribirnos aunque todavia no tengas todo definido."
          subtitle="La primera conversacion puede servir para entender tu situacion, ordenar prioridades o definir si tiene sentido avanzar hacia un diagnostico."
        />

        <motion.div className="contact-mobile-field mt-10 space-y-2.5 sm:hidden" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
          {consultItems.map((item) => (
            <motion.button
              key={item.number}
              type="button"
              onClick={() => setActiveConsult(item.number)}
              className={`contact-consult-card contact-mobile-surface group relative block w-full overflow-hidden border bg-black/58 px-4 py-4 text-left transition duration-300 ${
                activeConsult === item.number ? 'is-active' : ''
              }`}
              aria-pressed={activeConsult === item.number}
              variants={cardReveal}
              style={listSpotlightStyle}
              onMouseMove={handleSpotlightMove}
            >
              <div className="grid gap-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green/90">{item.number}</p>
                <h3 className="text-[1.03rem] font-medium tracking-[-0.02em] text-panthera-white/92">{item.title}</h3>
                <p className="text-[13px] leading-6 text-panthera-white/76">{item.text}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="mt-12 hidden border-y border-white/10 sm:block" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
          {consultItems.map((item) => (
            <motion.article
              key={item.number}
              className="group relative overflow-hidden border-b border-white/10 px-5 py-6 transition duration-300 last:border-b-0 sm:px-7 sm:py-7"
              variants={cardReveal}
              style={listSpotlightStyle}
              onMouseMove={handleSpotlightMove}
            >
              <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green/82 transition-colors duration-300 group-hover:text-panthera-green">
                  {item.number}
                </p>
                <div>
                  <h3 className="text-[1.1rem] font-medium tracking-[-0.02em] text-panthera-white/92">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-panthera-ash transition-colors duration-300 group-hover:text-panthera-white/84">{item.text}</p>
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.062} radius={218} showGrid showNoise followMouse touchDrift touchDriftAmount={0.17} className="opacity-66 sm:opacity-50" />
      <div className="container-panthera relative grid gap-10 sm:gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <HeadingBlock eyebrow="FAQ" title="Preguntas frecuentes" subtitle="Una lectura clara para entender si este proceso es adecuado para tu etapa actual." />

        <motion.div className="contact-mobile-field border-t border-white/10" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.article key={faq.question} className="contact-mobile-surface border-b border-white/10" variants={cardReveal}>
                <button
                  type="button"
                  className="group flex w-full items-start justify-between gap-4 py-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="text-base font-medium tracking-[-0.02em] text-panthera-white">{faq.question}</span>
                  <ChevronDown
                    className={`mt-1 h-4 w-4 shrink-0 text-panthera-white/60 transition-all duration-300 ${isOpen ? 'rotate-180 text-panthera-green' : 'group-hover:text-panthera-green'}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 text-[14px] leading-7 text-panthera-ash">
                        {faq.answer.split('\n\n').map((paragraph) => (
                          <p key={paragraph} className="mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function ContactClosingSection() {
  return (
    <section className="section-with-spotlight relative bg-black" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.072} radius={228} showGrid showNoise followMouse touchDrift touchDriftAmount={0.18} className="opacity-70 sm:opacity-58" />
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <motion.div variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <h2 className="interactive-title max-w-4xl text-balance font-display text-3xl font-medium leading-[1.01] tracking-[-0.05em] sm:text-5xl lg:text-[3.4rem] lg:leading-[0.98]">
            Si quieres entender si Panthera encaja con tu negocio, escribinos.
          </h2>
          <p className="mt-5 max-w-3xl text-[14px] leading-7 text-panthera-white/68 sm:mt-6 sm:text-[15px]">
            Revisamos tu situacion actual y te indicamos si tiene sentido avanzar hacia una llamada de diagnostico.
          </p>
          <div className="mt-7 flex justify-start sm:mt-8">
            <PrimaryContactCta href={whatsappUrl} label="Escribir por WhatsApp" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

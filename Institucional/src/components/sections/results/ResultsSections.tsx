import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import Button from '../../ui/Button'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import InteractiveBackground from '../home/InteractiveBackground'
import testimonialGastonCover from '../../../assets/images/testimonial_gaston_cover.webp'
import testimonialLauraCover from '../../../assets/images/testimonial_laura_cover.webp'
import testimonialLucasCover from '../../../assets/images/testimonial_lucas_cover.webp'
import testimonialJoseCover from '../../../assets/images/testimonial_jose_cover.webp'
import testimonialHildaCover from '../../../assets/images/testimonial_hilda_cover.webp'
import { siteCopy } from '../../../content/siteCopy'

type TestimonialItem = {
  name: string
  role: string
  problem: string
  system: string
  result: string
  youtubeId: string
  cover: string
}

const resultsCopy = siteCopy.results
const testimonialCovers = [
  testimonialGastonCover,
  testimonialLauraCover,
  testimonialLucasCover,
  testimonialJoseCover,
  testimonialHildaCover,
]

const testimonials: TestimonialItem[] = resultsCopy.cases.map((item, index) => ({
  name: item.name,
  role: item.role,
  problem: item.problem,
  system: item.intervention,
  result: item.result,
  youtubeId: item.youtubeId,
  cover: testimonialCovers[index] ?? testimonialHildaCover,
}))

const calendarUrl = resultsCopy.finalCta.href

const learnings = resultsCopy.learnings.items

const cardSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 130px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.11), rgba(227,247,141,0.028) 42%, transparent 74%)',
}

const rowSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 170px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.08), rgba(227,247,141,0.02) 42%, transparent 76%)',
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

function HeadingBlock({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <motion.div variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <div className="mb-5 flex items-center gap-3">
        <span className="accent-line" aria-hidden="true" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{eyebrow}</p>
      </div>
      <h2 className="interactive-title max-w-4xl text-balance font-display text-[2rem] font-medium leading-[0.98] tracking-[-0.055em] sm:text-4xl lg:text-[3.4rem]">{title}</h2>
      <p className="mt-6 max-w-3xl text-[15px] leading-7 text-panthera-white/68">{subtitle}</p>
    </motion.div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

  return (
    <motion.article
      className="results-mobile-surface group relative flex h-full min-h-[27.2rem] flex-col overflow-hidden border border-white/10 bg-black/45 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/45 hover:bg-panthera-elevated/80 sm:min-h-[31rem]"
      style={cardSpotlightStyle}
      variants={cardReveal}
      onMouseMove={handleSpotlightMove}
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-black">
        {isPlaying ? (
          <>
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title={`Testimonio de ${testimonial.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="absolute right-3 top-3 z-[2] inline-flex h-8 w-8 items-center justify-center border border-white/30 bg-black/70 text-panthera-white transition-colors duration-300 hover:border-panthera-green/55 hover:text-panthera-green"
              aria-label="Cerrar testimonio"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="relative h-full w-full"
            aria-label={`Reproducir testimonio de ${testimonial.name}`}
          >
            <img src={testimonial.cover} alt={`testimonial_${testimonial.name.toLowerCase().replace(/\s+/g, '_')}_cover.webp`} className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/66" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="inline-flex h-14 w-14 items-center justify-center border border-panthera-green/65 bg-black/72 text-panthera-green shadow-[0_0_30px_rgba(227,247,141,0.18)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-panthera-green">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-5">
        <div className="min-h-[5.2rem] sm:min-h-[6.1rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-panthera-green">Resultado</p>
          <h3 className="mt-2 text-[1.06rem] font-medium tracking-[-0.03em] text-panthera-white sm:text-[1.2rem]">{testimonial.name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-panthera-white/50">{testimonial.role}</p>
        </div>

        <div className="mt-4 h-px w-full bg-white/10" aria-hidden="true" />

        <div className="mt-3.5 grid gap-2.5 text-[12px] leading-5 text-panthera-ash sm:mt-4 sm:gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-panthera-green">Problema</p>
            <p className="mt-1">{testimonial.problem}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-panthera-green">Sistema</p>
            <p className="mt-1">{testimonial.system}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-panthera-green">Resultado</p>
            <p className="mt-1">{testimonial.result}</p>
          </div>
        </div>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
    </motion.article>
  )
}

export function ResultsHeroSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black pt-[72px]" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.072} radius={230} showGrid showNoise followMouse touchDrift touchDriftAmount={0.19} className="opacity-70 sm:opacity-56" />
      <div className="results-hero-mobile-atmos pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
        <span className="results-hero-veil results-hero-veil-a" />
        <span className="results-hero-veil results-hero-veil-b" />
        <span className="results-hero-line results-hero-line-a" />
        <span className="results-hero-line results-hero-line-b" />
      </div>
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <HeadingBlock
          eyebrow={resultsCopy.hero.eyebrow}
          title={resultsCopy.hero.title}
          subtitle={resultsCopy.hero.subtitle}
        />
      </div>
    </section>
  )
}

export function ResultsTestimonialsSection() {
  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.062} radius={218} showGrid showNoise followMouse touchDrift touchDriftAmount={0.18} className="opacity-66 sm:opacity-50" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={resultsCopy.testimonials.eyebrow}
          title={resultsCopy.testimonials.title}
          subtitle={resultsCopy.testimonials.subtitle}
        />

        <motion.div
          className="results-mobile-field mt-10 grid items-stretch gap-3.5 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-6"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, index) => {
            const desktopPositionClass =
              index < 3 ? 'lg:col-span-2' : index === 3 ? 'lg:col-span-2 lg:col-start-2' : 'lg:col-span-2 lg:col-start-4'

            return (
              <div key={testimonial.name} className={`h-full ${desktopPositionClass}`}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function ResultsLearningsSection() {
  const [activeLearning, setActiveLearning] = useState<string>(learnings[0]?.number ?? '01')

  return (
    <section className="section-with-spotlight relative border-b border-white/10 bg-black py-16 sm:py-24 lg:py-32" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.06} radius={212} showGrid showNoise followMouse touchDrift touchDriftAmount={0.17} className="opacity-66 sm:opacity-48" />
      <div className="container-panthera relative">
        <HeadingBlock
          eyebrow={resultsCopy.learnings.eyebrow}
          title={resultsCopy.learnings.title}
          subtitle={resultsCopy.learnings.subtitle}
        />

        <motion.div className="results-mobile-field mt-10 space-y-2.5 sm:hidden" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
          {learnings.map((learning) => (
            <motion.button
              key={learning.number}
              type="button"
              onClick={() => setActiveLearning(learning.number)}
              className={`results-learning-card results-mobile-surface group relative block w-full overflow-hidden border bg-black/55 px-4 py-4 text-left transition duration-300 ${
                activeLearning === learning.number ? 'is-active' : ''
              }`}
              aria-pressed={activeLearning === learning.number}
              variants={cardReveal}
              style={rowSpotlightStyle}
              onMouseMove={handleSpotlightMove}
            >
              <div className="grid gap-2.5">
                <p className="font-display text-[1.95rem] font-semibold leading-none tracking-[-0.05em] text-panthera-green">{learning.number}</p>
                <h3 className="text-[1.02rem] font-medium tracking-[-0.02em] text-panthera-green">{learning.title}</h3>
                <p className="text-[13px] leading-6 text-panthera-white/76">{learning.text}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="mt-12 hidden border-y border-white/10 sm:block" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
          {learnings.map((learning) => (
            <motion.article
              key={learning.number}
              className="group relative overflow-hidden border-b border-white/10 px-5 py-6 transition duration-300 last:border-b-0 sm:px-7 sm:py-7"
              variants={cardReveal}
              style={rowSpotlightStyle}
              onMouseMove={handleSpotlightMove}
            >
              <div className="grid gap-4 lg:grid-cols-[0.18fr_0.42fr_1fr] lg:items-start lg:gap-8">
                <p className="font-display text-[2.1rem] font-semibold leading-none tracking-[-0.05em] text-panthera-green/88 sm:text-[2.4rem]">{learning.number}</p>
                <h3 className="text-[1.22rem] font-medium tracking-[-0.03em] text-panthera-white">{learning.title}</h3>
                <p className="text-[14px] leading-7 text-panthera-ash">{learning.text}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-panthera-green transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function ResultsFinalCtaSection() {
  return (
    <section className="section-with-spotlight relative border-t border-white/10 bg-panthera-deep" onMouseMove={handleSpotlightMove}>
      <InteractiveBackground intensity={0.058} radius={226} showGrid showNoise followMouse touchDrift touchDriftAmount={0.16} className="opacity-64 sm:opacity-50" />
      <div className="container-panthera relative py-16 sm:py-20 lg:py-28">
        <motion.div
          className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{resultsCopy.finalCta.eyebrow}</p>
            </div>
            <h2 className="interactive-title max-w-3xl text-balance font-display text-3xl font-medium leading-[1.01] tracking-[-0.05em] sm:text-5xl lg:text-[3.4rem] lg:leading-[0.98]">
              {resultsCopy.finalCta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-panthera-white/68 sm:mt-6 sm:text-[15px]">
              {resultsCopy.finalCta.text}
            </p>
            <div className="mt-7 flex justify-start sm:mt-8">
              <Button href={calendarUrl} trackingLabel="results_calendar_cta" trackingPage="results" className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none">
                {resultsCopy.finalCta.cta}
              </Button>
            </div>
          </div>

          <div aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}

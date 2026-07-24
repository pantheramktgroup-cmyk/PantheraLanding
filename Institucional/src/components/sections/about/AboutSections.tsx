import { useState } from 'react'
import { motion } from 'framer-motion'
import { mediaAssets, siteCopy } from '../../../content/siteCopy'
import Button from '../../ui/Button'
import SectionHeader from '../../ui/SectionHeader'
import { cardReveal, sectionReveal, staggerChildren } from '../../../lib/animations'
import InteractiveBackground from '../home/InteractiveBackground'

const cardSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 120px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.095), rgba(227,247,141,0.028) 38%, transparent 72%)',
}

const chipSpotlightStyle = {
  backgroundImage:
    'radial-gradient(circle 90px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(227,247,141,0.09), rgba(227,247,141,0.02) 40%, transparent 72%)',
}

const aboutBgProps = {
  radius: 220,
  intensity: 0.095,
  midStopPercent: 38,
  endStopPercent: 72,
  midIntensityFactor: 0.29,
  showGrid: true,
  showNoise: true,
  followMouse: true,
  touchDrift: true,
  touchDriftAmount: 0.17,
}

const handleSpotlightMove = (event: React.MouseEvent<HTMLElement>) => {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  event.currentTarget.style.setProperty('--spotlight-x', `${x}px`)
  event.currentTarget.style.setProperty('--spotlight-y', `${y}px`)
}

export function AboutHeroSection() {
  const { hero } = siteCopy.about

  return (
    <section className="relative border-b border-white/10 bg-black pt-[66px] sm:pt-[72px]">
      <InteractiveBackground {...aboutBgProps} className="opacity-64 sm:opacity-46" />
      <div className="container-panthera relative grid items-center gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        <div className="max-w-[38rem]">
          <SectionHeader eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />
        </div>

        <div className="space-y-6">
          <div className="relative z-0 w-full overflow-hidden border border-panthera-green/30 bg-black/40 shadow-[0_0_40px_rgba(227,247,141,0.05)] transition-colors duration-300 hover:border-panthera-green/55 aspect-[16/11] sm:aspect-[4/3] lg:h-[460px] lg:aspect-auto">
            <img
              src={mediaAssets.aboutHeroImage}
              alt="Fundadores Panthera Group"
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(1) brightness(0.68) contrast(1.14)', objectPosition: 'center 32%' }}
            />
            <div className="absolute inset-0 bg-black/18" aria-hidden="true" />
            <div className="noise-overlay absolute inset-0" style={{ opacity: 0.06 }} aria-hidden="true" />
          </div>

          <div className="flex justify-start">
            <Button
              href="#filosofia"
              variant="secondary"
              trackingLabel="about_hero_methodology"
              trackingPage="about"
              className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none"
            >
              {hero.methodologyLink}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutStorySection() {
  const { story } = siteCopy.about

  return (
    <section className="relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32">
      <InteractiveBackground {...aboutBgProps} className="opacity-66 sm:opacity-52" />
      <div className="container-panthera relative grid gap-7 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <motion.div className="space-y-5 sm:space-y-6" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span className="accent-line" aria-hidden="true" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{story.eyebrow}</p>
          </div>
          <h2
            className="interactive-title max-w-[18ch] text-balance font-display text-[1.85rem] font-medium leading-[1] tracking-[-0.05em] sm:text-4xl lg:text-[3.25rem]"
          >
            {story.title}
          </h2>
          <div className="border-l border-white/12 pl-4 sm:pl-5">
            <p className="max-w-[58ch] text-[13px] leading-6 text-panthera-white/68 sm:text-[14px] sm:leading-7">{story.manifesto}</p>
          </div>
          <div className="about-mobile-card-field grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
            {story.indicators.map((item) => (
              <span
                key={item}
                className="about-mobile-card group relative overflow-hidden border border-white/15 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-panthera-white/74 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/45 hover:text-panthera-green"
                onMouseMove={handleSpotlightMove}
                style={chipSpotlightStyle}
              >
                <span className="relative">{item}</span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 border-l border-white/10 pl-4 sm:space-y-5 sm:pl-6 lg:pl-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-[14px] leading-7 text-panthera-ash sm:text-base sm:leading-8">{story.body}</p>
          <motion.div className="about-mobile-card-field space-y-1 border-t border-white/10" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
            {story.highlights.map((item) => (
              <motion.div
                key={item.title}
                className="about-mobile-card group border-b border-white/10 py-3.5 transition-colors duration-300 hover:border-panthera-green/35 sm:py-4"
                onMouseMove={handleSpotlightMove}
                style={chipSpotlightStyle}
                variants={cardReveal}
              >
                <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.17em]">
                  <span className="text-panthera-green transition-all duration-300 group-hover:[text-shadow:0_0_10px_rgba(227,247,141,0.35)]">{item.number}</span>
                  <span className="text-panthera-white/42">/</span>
                  <h3 className="text-panthera-white/85 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                </div>
                <p className="mt-2 pl-9 text-[13px] leading-6 text-panthera-white/64 transition-opacity duration-300 group-hover:text-panthera-white/82">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function AboutPrinciplesSection() {
  const { principles } = siteCopy.about
  const [openPrinciple, setOpenPrinciple] = useState<string>(principles.items[0]?.number ?? '')

  return (
    <section id="filosofia" className="relative border-b border-white/10 bg-black py-16 scroll-mt-28 sm:py-24 lg:py-32">
      <InteractiveBackground {...aboutBgProps} className="opacity-68 sm:opacity-56" />
      <div className="container-panthera relative">
        <SectionHeader eyebrow={principles.eyebrow} title={principles.title} subtitle={principles.subtitle} />

        <motion.div
          className="about-mobile-card-field mt-10 space-y-2.5 sm:hidden"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {principles.items.map((principle) => {
            const isOpen = openPrinciple === principle.number

            return (
              <motion.article
                key={principle.title}
                className="about-mobile-card group relative overflow-hidden border border-white/10 bg-panthera-deep/80 px-4 py-3.5 transition duration-300 hover:border-panthera-green/45"
                onMouseMove={handleSpotlightMove}
                style={cardSpotlightStyle}
                variants={cardReveal}
              >
                <button
                  type="button"
                  className="relative flex w-full items-start gap-3 text-left"
                  onClick={() => setOpenPrinciple(isOpen ? '' : principle.number)}
                  aria-expanded={isOpen}
                  aria-controls={`principle-${principle.number}`}
                >
                  <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-panthera-green">{principle.number}</span>
                  <span className="flex-1 pt-1 text-[13px] font-medium tracking-[-0.01em] text-panthera-white">{principle.title}</span>
                    <span className="pt-1 text-panthera-white/58 transition-colors duration-300 group-hover:text-panthera-green">{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen ? (
                  <motion.p
                    id={`principle-${principle.number}`}
                    className="relative mt-2.5 pl-[2.65rem] pr-2 text-[12.5px] leading-6 text-panthera-ash"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {principle.text}
                  </motion.p>
                ) : null}
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-10 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 sm:mt-14 lg:grid-cols-3"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {principles.items.map((principle) => (
            <motion.article
              key={principle.title}
              className="group relative overflow-hidden border border-white/10 bg-panthera-deep/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-panthera-green/45 hover:bg-panthera-elevated/92"
              onMouseMove={handleSpotlightMove}
              style={cardSpotlightStyle}
              variants={cardReveal}
            >
              <span className="relative mb-5 block font-display text-3xl font-semibold tracking-[-0.04em] text-panthera-green transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(227,247,141,0.34)]">
                {principle.number}
              </span>
              <h3 className="relative mb-3 text-base font-medium tracking-[-0.02em] text-panthera-white">{principle.title}</h3>
              <p className="relative text-[13px] leading-6 text-panthera-ash">{principle.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function AboutOperationsSection() {
  const { operations } = siteCopy.about

  return (
    <section className="relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32">
      <InteractiveBackground {...aboutBgProps} className="opacity-66 sm:opacity-58" />
      <div className="container-panthera relative">
        <SectionHeader eyebrow={operations.eyebrow} title={operations.title} subtitle={operations.subtitle} />
        <div className="relative mt-10 sm:mt-14">
          <motion.div
            className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-white/15 md:block"
            aria-hidden="true"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            whileInView={{ scaleX: 1, transformOrigin: 'left' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-white/15 md:hidden"
            aria-hidden="true"
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1, transformOrigin: 'top' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="about-mobile-card-field grid gap-6 md:grid-cols-4 md:gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {operations.items.map((item) => (
              <motion.article
                key={item.title}
                className="about-mobile-card group relative pl-9 transition-transform duration-300 hover:-translate-y-[3px] md:pl-4"
                variants={cardReveal}
              >
                <span className="absolute left-2 top-0 h-6 w-px bg-white/20 transition-colors duration-300 group-hover:bg-panthera-green/55 md:left-[4px] md:top-0" />
                <div className="border-b border-transparent pb-2 transition-colors duration-300 group-hover:border-panthera-green/35 md:pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-panthera-green transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(227,247,141,0.34)]">
                      {item.number}
                    </span>
                    <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-panthera-white/82 transition-colors duration-300 group-hover:text-panthera-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2.5 text-[13px] leading-6 text-panthera-white/60 transition-colors duration-300 group-hover:text-panthera-white/78 sm:mt-3">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function AboutTeamSection() {
  const { team } = siteCopy.about

  return (
    <section className="relative border-b border-white/10 bg-black py-16 sm:py-24 lg:py-32">
      <InteractiveBackground {...aboutBgProps} className="opacity-66 sm:opacity-56" />
      <div className="container-panthera relative space-y-12 sm:space-y-16">
        <div className="grid items-start gap-7 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div className="relative z-10" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }}>
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="accent-line" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{team.eyebrow}</p>
            </div>
            <h2
              className="interactive-title text-balance font-display text-3xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-4xl lg:text-[3rem] lg:leading-[1]"
            >
              {team.foundersTitle}
            </h2>
            <p className="mt-4 max-w-[60ch] text-[14px] leading-7 text-panthera-white/68 sm:mt-5 sm:text-[15px]">{team.foundersText}</p>
            <div className="about-mobile-card-field mt-6 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              {team.founders.map((founder, index) => (
                <article
                  key={founder.name}
                  className="about-mobile-card group relative overflow-hidden border border-white/10 bg-panthera-deep/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-panthera-green/45 hover:bg-panthera-elevated/85"
                  onMouseMove={handleSpotlightMove}
                  style={cardSpotlightStyle}
                >
                  <span className="relative inline-flex h-6 min-w-[1.8rem] items-center justify-center border border-panthera-green/35 text-[10px] font-semibold text-panthera-green transition-all duration-300 group-hover:border-panthera-green/70 group-hover:shadow-[0_0_14px_rgba(227,247,141,0.24)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="relative mt-3 text-[15px] font-medium text-panthera-white">{founder.name}</p>
                  <p className="relative mt-2 text-[11px] uppercase tracking-[0.17em] text-panthera-green">{founder.role}</p>
                  <p className="relative mt-3 text-[13px] leading-6 text-panthera-white/66">{founder.text}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <div className="relative z-0 w-full overflow-hidden border border-panthera-green/30 bg-black/40 shadow-[0_0_40px_rgba(227,247,141,0.05)] transition-colors duration-300 hover:border-panthera-green/55 aspect-[16/11] sm:h-[380px] sm:aspect-auto lg:h-[460px] lg:aspect-auto">
            <img
              src={mediaAssets.aboutFoundersImage}
              alt="Fundadores de Panthera"
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(1) brightness(0.68) contrast(1.14)', objectPosition: 'center 22%' }}
            />
            <div className="absolute inset-0 bg-black/18" aria-hidden="true" />
            <div className="noise-overlay absolute inset-0" style={{ opacity: 0.06 }} aria-hidden="true" />
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="Equipo" title={team.title} subtitle={team.subtitle} />
          <motion.div
                className="about-mobile-card-field mt-10 grid gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4"
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-90px' }}
          >
            {team.roles.map((role) => (
              <motion.article
                key={role.title + role.member}
                    className="about-mobile-card group relative overflow-hidden border border-white/10 bg-panthera-deep/78 p-5 transition duration-300 hover:-translate-y-1 hover:border-panthera-green/45 hover:bg-panthera-elevated/92"
                onMouseMove={handleSpotlightMove}
                style={cardSpotlightStyle}
                variants={cardReveal}
              >
                <p className="relative text-[13px] font-medium text-panthera-white">{role.member}</p>
                <p className="relative mt-2 text-[11px] uppercase tracking-[0.17em] text-panthera-green">{role.title}</p>
                <p className="relative mt-3 text-[13px] leading-6 text-panthera-white/66">{role.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function AboutCultureSection() {
  const { culture } = siteCopy.about

  return (
    <section className="relative border-b border-white/10 bg-panthera-deep py-16 sm:py-24 lg:py-32">
      <InteractiveBackground {...aboutBgProps} className="opacity-64 sm:opacity-54" />
      <div className="container-panthera relative">
        <SectionHeader eyebrow={culture.eyebrow} title={culture.title} />
        <motion.div
          className="about-mobile-card-field mt-10 grid gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
        >
          {culture.items.map((item) => (
            <motion.article
              key={item.title}
              className="about-mobile-card group relative overflow-hidden border border-white/10 bg-black/40 px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-panthera-green/35 hover:bg-panthera-elevated/72 sm:px-5 sm:py-4"
              onMouseMove={handleSpotlightMove}
              style={cardSpotlightStyle}
              variants={cardReveal}
            >
              <div className="relative mb-3 flex items-center gap-3">
                <span className="inline-flex h-6 min-w-[1.85rem] items-center justify-center border border-panthera-green/35 text-[10px] font-semibold text-panthera-green transition-all duration-300 group-hover:border-panthera-green/70 group-hover:shadow-[0_0_14px_rgba(227,247,141,0.24)]">
                  {item.number}
                </span>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-panthera-white">{item.title}</h3>
              </div>
              <p className="relative text-[13px] leading-6 text-panthera-white/66">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function AboutCtaSection() {
  const { cta } = siteCopy.about

  return (
    <section className="relative border-t border-white/10 bg-black">
      <InteractiveBackground {...aboutBgProps} className="opacity-62 sm:opacity-52" />
      <div className="container-panthera py-16 sm:py-24 lg:py-32">
        <motion.div
          className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <h2
              className="interactive-title max-w-3xl text-balance font-display text-[1.9rem] font-medium leading-[1.01] tracking-[-0.05em] sm:text-4xl lg:text-[3.25rem] lg:leading-[0.98]"
            >
              {cta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-panthera-white/66 sm:mt-6 sm:text-[15px]">{cta.text}</p>
          </div>
          <div className="flex justify-start lg:border-l lg:border-white/10 lg:justify-start lg:pl-10">
            <Button
              href="/servicios"
              variant="secondary"
              trackingLabel="about_final_cta"
              trackingPage="about"
              className="w-full max-w-[18.5rem] justify-center sm:w-auto sm:max-w-none"
            >
              {cta.cta}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useRef, useState, useCallback } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Footer from '../components/layout/Footer'

// ─── Asset constants ───────────────────────────────────────────────────────
const LOGO_SRC = '/logos/03.%20SVG/Recurso%2014.svg'
const BG_HERO = '/images/hero_panthera_strategy_room.webp'
const BG_CTA = '/images/testimonial_cta_case_table.webp'

// Thank-you VSL — replace URL if a different video is provided
const TY_VIDEO_EMBED = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1'
// NOTE: Replace the embed URL above with the actual thank-you page video URL.

const STEPS = [
  {
    num: '01',
    text: 'Contestanos el mensaje que te enviaremos por WhatsApp.',
  },
  {
    num: '02',
    text: 'Aceptá la invitación de la agenda para que nadie tome tu lugar.',
  },
  {
    num: '03',
    text: 'Asistí a la llamada con tu socio en caso de que sea necesario.',
  },
]

const CASES = [
  {
    name: 'Gastón Hendlin',
    role: 'Coach Financiero y Ejecutivo',
    cover: '/images/testimonial_gaston_cover.webp',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/tkq3PO2-yU4',
    videoTitle: 'Testimonio de Gastón Hendlin',
    description:
      'Tras pasar por 5 agencias y frustrado de hacer el trabajo, Gastón cargaba con toda la estrategia y ejecución, obteniendo cero resultados comerciales. Reestructuramos todo su ecosistema digital para quitarle el peso operativo de encima. Hoy, tiene un sistema de ventas validado que filtra automáticamente a los clientes ideales. Esto le permitió dejar de perder tiempo con curiosos y escalar su facturación drásticamente, pudiendo enfocarse en brindar su servicio.',
  },
  {
    name: 'Laura Sanchez',
    role: 'Coach de Alto Rendimiento',
    cover: '/images/testimonial_laura_cover.webp',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/iMTN4h5Gr4E',
    videoTitle: 'Testimonio de Laura Sanchez',
    description:
      'Frustrada por depender 100% de referidos y probar mentorías sin éxito, Laura sentía que tenía un almacén en lugar de un negocio, no contaba con la estructura para llevar un negocio de manera profesional. Al implementar nuestro sistema, estructuró su empresa; dejando de ser invisible para empezar a atraer leads en frío fuera de su círculo de amigos y posicionarse como una experta con un sistema sostenible en el tiempo.',
  },
  {
    name: 'Lucas Casalins',
    role: 'Coach Fitness',
    cover: '/images/testimonial_lucas_cover.webp',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/A34a5JF5iPQ',
    videoTitle: 'Testimonio de Lucas Casalins',
    description:
      'Lucas venía de varias malas experiencias, vivía frustrado y haciendo todo en su negocio. Implementamos una estructura que le permitió salir de la operación técnica. Al delegar en nuestro sistema integral, que cubrió desde el marketing hasta las finanzas, recuperó el orden, y hoy disfruta de ingresos constantes y mucho más previsibles, dedicándose 100% a sus alumnos mientras nosotros manejamos toda la maquinaria del negocio.',
  },
  {
    name: 'José Navas',
    role: 'Mentor de Negocios',
    cover: '/images/testimonial_jose_cover.webp',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/HKRIU34pW5g',
    videoTitle: 'Testimonio de José Navas',
    description:
      'José llevaba más de 3 años frustrado intentando escalar en digital, perdiendo tiempo en lanzamientos fallidos y sintiéndose un pulpo operativo que hacía todo solo. Al delegar la atracción, prospección y el seguimiento en nuestro sistema, recuperó su libertad; hoy cierra ventas sin tener que perseguir leads, recibiendo agendamientos calificados en automático.',
  },
  {
    name: 'Hilda Arjona',
    role: 'Coach Espiritual',
    cover: '/images/testimonial_hilda_cover.webp',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/XqDvbuOqQ7Q',
    videoTitle: 'Testimonio de Hilda Arjona',
    description:
      'Hilda llevaba 5 años estancada y a punto de cerrar su negocio, agotada por intentar ser la que hace absolutamente todo (copy, edición, estrategia) sin ver resultados reales. Al delegar la ejecución en nuestro equipo y corregir su oferta hacia el avatar correcto, recuperó su paz mental; hoy atrae alumnas ideales y escala su facturación, dedicándose solo a entregar valor mientras nosotros nos ocupamos del resto.',
  },
]

// ─── TestimonialCard ───────────────────────────────────────────────────────
function TestimonialCard({ c }) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = useCallback((e) => {
    e.stopPropagation()
    setPlaying(true)
  }, [])

  return (
    <div className="group relative flex flex-col bg-[#0c0c0b] border border-[rgba(245,245,245,0.07)] overflow-hidden rounded-sm">
      {/* Cover / Video */}
      <div className="relative w-full aspect-video overflow-hidden">
        {!playing ? (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Reproducir ${c.videoTitle}`}
          >
            <img
              src={c.cover}
              alt={c.videoTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-panthera-black/55" />
            <div className="grain-overlay" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300 w-14 h-14">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <iframe
            src={`${c.youtubeEmbedUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={c.videoTitle}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col p-5 md:p-6 flex-1">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-panthera-green mb-1">
          Resultado
        </p>
        <p className="font-sans font-medium text-sm text-panthera-white mb-1">{c.name}</p>
        <p className="font-sans text-[11px] text-panthera-green/80 mb-3">{c.role}</p>
        <p className="font-sans text-xs text-panthera-white/65 leading-relaxed">{c.description}</p>
      </div>
    </div>
  )
}

// ─── StepCard ──────────────────────────────────────────────────────────────
function StepCard({ num, text }) {
  return (
    <div className="relative flex items-start gap-4 p-5 md:p-6 bg-[#0a0a09] border border-[rgba(227,247,141,0.10)] rounded-sm">
      <span
        className="shrink-0 font-sans text-2xl md:text-3xl font-bold text-panthera-green/20 leading-none select-none"
        aria-hidden="true"
      >
        {num}
      </span>
      <p className="font-sans text-sm md:text-[15px] text-panthera-white/80 leading-relaxed pt-0.5">
        {text}
      </p>
    </div>
  )
}

// ─── ThankYouPage ──────────────────────────────────────────────────────────
export default function ThankYouPage() {
  const prefersReduced = usePrefersReducedMotion()

  // Refs for GSAP
  const heroRef = useRef(null)
  const alertRef = useRef(null)
  const step1Ref = useRef(null)
  const videoBoxRef = useRef(null)
  const cardsRef = useRef(null)
  const step2Ref = useRef(null)
  const step3Ref = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    if (prefersReduced) return

    // Hero fade-in
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 28,
      duration: 1,
      ease: 'power2.out',
      delay: 0.15,
    })

    // Alert block
    gsap.from(alertRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.5,
    })

    // Scroll-triggered sections helper
    const reveal = (el, extra = {}) =>
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        ...extra,
      })

    reveal(step1Ref.current)
    reveal(videoBoxRef.current, { scale: 0.97, y: 0 })
    reveal(cardsRef.current)
    reveal(step2Ref.current)
    reveal(step3Ref.current)
    reveal(ctaRef.current)
  }, { dependencies: [prefersReduced] })

  return (
    <div className="bg-panthera-black text-panthera-white min-h-screen selection:bg-panthera-green/30">

      {/* ── HERO / CONFIRMACIÓN ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92svh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
        aria-label="Confirmación de llamada"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={BG_HERO}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-panthera-black/80 via-panthera-black/70 to-panthera-black" />
          <div className="grain-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" aria-hidden="true" />
        </div>

        {/* Logo */}
        <div className="relative z-10 pt-10 pb-6">
          <a href="https://pantheramktgroup.com" aria-label="Panthera Group" className="opacity-80 hover:opacity-100 transition-opacity">
            <img
              src={LOGO_SRC}
              alt="Panthera Group"
              className="h-[18px] md:h-[22px] w-auto brightness-0 invert mx-auto"
              loading="eager"
            />
          </a>
        </div>

        {/* Hero content */}
        <div ref={heroRef} className="relative z-10 flex flex-col items-center text-center px-5 md:px-8 max-w-2xl mx-auto pb-16 md:pb-24">
          {/* Confirmation badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-panthera-green/15 border border-panthera-green/40">
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-panthera-green" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 8 6 12 14 4" />
              </svg>
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-panthera-green">
              Llamada agendada
            </span>
          </div>

          <h1
            className="font-sans font-bold text-panthera-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Tu diagnóstico está confirmado.
          </h1>

          <p className="font-sans text-base md:text-lg text-panthera-white/60 leading-relaxed mb-10 max-w-lg">
            Revisá los pasos a continuación para asegurarte de que todo quede confirmado y tu lugar reservado.
          </p>

          {/* IMPORTANTE alert — elegant Panthera style */}
          <div
            ref={alertRef}
            className="w-full max-w-xl relative"
            role="alert"
          >
            <div className="relative overflow-hidden rounded-sm border border-[rgba(245,100,80,0.22)] bg-[#100a09]">
              {/* Red halo */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[rgba(200,60,40,0.12)] rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
              <div className="grain-overlay opacity-40" aria-hidden="true" />
              <div className="relative z-10 px-6 py-5 md:px-8 md:py-6">
                <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#e08070] mb-3">
                  IMPORTANTE
                </p>
                <p className="font-sans text-sm md:text-[15px] text-panthera-white/85 leading-relaxed">
                  Tu llamada fue agendada, te vamos a contactar por WhatsApp para confirmarla.{' '}
                  <span className="text-panthera-white font-medium">
                    Si no contestás en las próximas 6&nbsp;horas vamos a cancelar tu llamada para liberar el cupo.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-gradient-to-b from-panthera-green/60 to-transparent" />
        </div>
      </section>

      {/* ── PASO 1 / VIDEO ─────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden" aria-label="Paso 1 — Video">
        <div className="container-panthera">
          {/* Step label */}
          <div ref={step1Ref} className="mb-10 md:mb-14">
            <p className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.22em] text-panthera-green mb-4">
              Paso 1
            </p>
            <h2
              className="font-sans font-bold text-panthera-white leading-tight mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
            >
              Mirá este video ahora
            </h2>
            <p className="font-sans text-base text-panthera-white/55 max-w-lg">
              Te va a evitar perder tiempo en la llamada y entender si esto aplica para vos.
            </p>
          </div>

          {/* Video embed */}
          <div
            ref={videoBoxRef}
            className="relative w-full max-w-3xl mx-auto mb-14 md:mb-20"
          >
            <div className="relative w-full overflow-hidden rounded-sm border border-[rgba(245,245,245,0.08)] shadow-[0_0_60px_rgba(0,0,0,0.6)]" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={TY_VIDEO_EMBED}
                title="Video de bienvenida — Panthera Group"
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
              <div className="grain-overlay opacity-20 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="flex-1 h-px bg-[rgba(245,245,245,0.06)]" />
            <svg viewBox="0 0 16 20" fill="none" className="w-3 h-4 text-panthera-green/40 shrink-0" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 0v16M1 10l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1 h-px bg-[rgba(245,245,245,0.06)]" />
          </div>

          {/* 3 Step cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {STEPS.map((s) => (
              <StepCard key={s.num} num={s.num} text={s.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PASO 2 / CALENDARIO ────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 border-t border-[rgba(245,245,245,0.05)]" aria-label="Paso 2 — Aceptar invitación">
        <div className="container-panthera">
          <div ref={step2Ref} className="max-w-3xl mx-auto">
            <p className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.22em] text-panthera-green mb-4">
              Paso 2
            </p>
            <h2
              className="font-sans font-bold text-panthera-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
            >
              Aceptá la invitación del calendario
            </h2>
            <p className="font-sans text-base text-panthera-white/55 leading-relaxed mb-10 md:mb-14 max-w-xl">
              Aceptá la invitación que te enviamos al correo con el que agendaste esta llamada y hacé click en{' '}
              <span className="text-panthera-white/80">"Añadir al Calendario"</span> y después en{' '}
              <span className="text-panthera-white/80">"Sí"</span> para aceptar la invitación.
            </p>

            <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-sm border border-[rgba(245,245,245,0.08)] shadow-[0_8px_60px_rgba(0,0,0,0.55)]">
              <img
                src="/images/paso-2.webp"
                alt="Invitación de calendario"
                className="block h-auto w-auto max-w-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-panthera-black/10 z-10 pointer-events-none rounded-sm" aria-hidden="true" />
              <div className="grain-overlay opacity-25 z-20" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PASO 3 / CASOS REALES ──────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 border-t border-[rgba(245,245,245,0.05)] overflow-hidden" aria-label="Paso 3 — Casos reales">
        {/* Subtle bg texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#030303] to-transparent" />
        </div>

        <div className="container-panthera relative z-10">
          <div ref={step3Ref} className="mb-10 md:mb-14">
            <p className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.22em] text-panthera-green mb-4">
              Paso 3
            </p>
            <h2
              className="font-sans font-bold text-panthera-white leading-tight mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
            >
              Casos de personas con las que trabajamos
            </h2>
            <p className="font-sans text-base text-panthera-white/55 max-w-xl leading-relaxed">
              Si todavía no los viste, mirá los casos de alguna de las personas con las que trabajamos para asegurarte que estás en el lugar correcto.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {CASES.map((c) => (
              <TestimonialCard key={c.name} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Cierre">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={BG_CTA}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-panthera-black via-panthera-black/80 to-panthera-black" />
          <div className="grain-overlay" aria-hidden="true" />
        </div>

        <div ref={ctaRef} className="relative z-10 container-panthera flex flex-col items-center text-center">
          {/* Logo mark */}
          <img
            src={LOGO_SRC}
            alt="Panthera Group"
            className="h-[14px] md:h-[16px] w-auto brightness-0 invert opacity-30 mb-10"
            loading="lazy"
            aria-hidden="true"
          />

          <h2
            className="font-sans font-bold text-panthera-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Nos vemos en la llamada.
          </h2>

          <p className="font-sans text-base text-panthera-white/50 max-w-md leading-relaxed mb-10">
            Mientras tanto, revisá el video y asegurate de aceptar la invitación del calendario para reservar tu lugar.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm sm:max-w-none">
            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] uppercase tracking-widest font-sans font-medium border border-[rgba(245,245,245,0.18)] text-panthera-white hover:border-panthera-green hover:text-panthera-green transition-all duration-300 ease-premium"
            >
              Volver al inicio
            </a>
            <a
              href="https://pantheramktgroup.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] uppercase tracking-widest font-sans font-medium bg-panthera-green text-panthera-black hover:bg-transparent hover:text-panthera-green border border-panthera-green transition-all duration-300 ease-premium"
            >
              Ir a Panthera Group
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}

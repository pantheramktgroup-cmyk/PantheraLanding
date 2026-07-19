/**
 * landingCopy.js — Panthera Group
 * Fuente única de verdad para todo el contenido de la landing.
 * Ningún texto debe quedar hardcodeado en los componentes.
 * Todos los CTAs apuntan a #booking.
 */

const LOGO_SRC = '/logos/01.%20PNG/Recurso%209.png'
const GLOBAL_CTA = 'Agenda tu llamada estratégica'

export const landingCopy = {

  // ─── NAV ──────────────────────────────────────────────────────────────────
  nav: {
    logo: {
      alt: 'Panthera Group',
      src: LOGO_SRC,
    },
    cta: GLOBAL_CTA,
  },

  // ─── HERO ─────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Panthera APEX System',
    ctaPrimary: GLOBAL_CTA,
    variantA: {
      headline: 'Convertimos tu reputación en una infraestructura de venta automatizada.',
      subheadline:
        'Para coaches, consultores, mentores e infoproductores que ya venden, pero todavía dependen de referidos, rachas o esfuerzo manual para generar reuniones calificadas.',
      mobileSubheadline:
        'Para expertos que ya venden, pero todavía dependen de referidos, rachas o esfuerzo manual.',
      badges: [
        'Para ofertas ya validadas',
        'Reuniones calificadas',
        'Infraestructura comercial',
        'Sistema medible',
      ],
    },
    variantB: {
      headline: 'Un sistema que capta y filtra prospectos en automático.',
      subheadline:
        'Convertí tu reputación en reuniones calificadas, dejá de depender del boca a boca, delegá el 100% de tu captación y recupera hasta 20 horas semanales.',
      mobileSubheadline:
        'Dejá de depender del boca a boca, delegá la captación y recuperá horas de operación.',
      badges: [
        'Exclusivo para coaches, mentores o consultores que ya venden y tienen una oferta validada.',
      ],
    },
  },

  // ─── VIDEO / MANIFIESTO ────────────────────────────────────────────────────
  video: {
    eyebrow: 'Manifiesto Panthera',
    headline: 'Si ya vendés,\npero cada mes volvés a empezar de cero,\nesto es para vos.',
    mobileHeadline: 'Si ya vendés,\npero cada mes volvés a empezar\nde cero, esto es para vos.',
    pullQuote: 'Escalar no debería exigirte más esfuerzo. Debería exigirte mejor infraestructura.',
    cta: GLOBAL_CTA,
    videoEmbedUrl: 'https://fast.wistia.net/embed/iframe/1h7t2gtf84',
  },

  // ─── STATS STRIP ───────────────────────────────────────────────────────────
  statsStrip: {
    items: [
      {
        prefix: '+',
        value: 300,
        suffix: 'K',
        description:
          'Facturación anual proyectada validando nuestra metodología de pricing y ventas.',
      },
      {
        prefix: '-',
        value: 60,
        suffix: '%',
        description:
          'Carga operativa del mentor mediante la automatización de la infraestructura.',
      },
      {
        prefix: '',
        value: 30,
        suffix: '%',
        description:
          'Tasa de conversión mínima esperada con nuestro proceso de ventas optimizado.',
      },
    ],
  },

  // ─── STATEMENT DE TRANSFORMACIÓN ──────────────────────────────────────────
  transformation: {
    headline: 'Convertimos tu negocio en un sistema que genera oportunidades comerciales todos los meses, de forma más predecible y escalable.',
    ideas: [
      {
        number: '01',
        text: 'Para negocios expertos que ya tienen un gran servicio, pero todavía no tienen una estructura que sostenga su crecimiento.',
      },
      {
        number: '02',
        text: 'Para dejar de depender del boca a boca, de rachas de suerte o de estar encima de cada conversación.',
      },
      {
        number: '03',
        text: 'Para crecer con más control, claridad y resultados sostenibles.',
      },
    ],
    cta: GLOBAL_CTA,
  },

  // ─── PARA QUIÉN ES / NO ES ────────────────────────────────────────────────
  audience: {
    eyebrow: 'Filtro de aplicación',
    headline: 'Esto no es para cualquiera.\nY justamente por eso funciona mejor.',
    subheadline:
      'Para negocios que ya venden, pero necesitan generar, filtrar y convertir oportunidades de forma más predecible.',
    yesTitle: 'Esto es para vos si:',
    yesItems: [
      'Vendés consultorías, mentorías, programas o servicios high-ticket.',
      'Ya tenés experiencia y casos, pero tu captación es irregular.',
      'Dependés de referidos, contacto personal o rachas de suerte.',
      'Probaste agencias o mentorías y terminaste haciendo todo vos.',
      'Querés reuniones calificadas, no una agenda llena de curiosos.',
      'Necesitás captación, filtrado, seguimiento y CRM en un solo sistema.',
    ],
    noTitle: 'Esto NO es para vos si:',
    noItems: [
      'Todavía no validaste tu oferta.',
      'Buscás resultados inmediatos sin construir estructura.',
      'Querés delegar sin involucrarte en las decisiones.',
      'No estás dispuesto a invertir en sistema, pauta y mejora comercial.',
      'Querés solo anuncios, solo posteos o solo una landing.',
    ],
    cta: GLOBAL_CTA,
  },

  // ─── PROBLEMA CENTRAL ─────────────────────────────────────────────────────
  problem: {
    eyebrow: 'El cuello de botella real',
    headline:
      'El problema no es que tu servicio no funcione.\nEs que tu crecimiento todavía depende\ndemasiado de vos.',
    body: 'Podés tener autoridad, experiencia y una oferta que funciona. Pero si cada nuevo cliente depende de que publiques más, hagas más seguimiento o justo alguien te recomiende, tu negocio sigue siendo frágil.',
    body2:
      'La infraestructura existe para que eso no dependa de tu memoria, tu energía o tu suerte.',
    symptoms: [
      'Meses con movimiento y otros donde la agenda se enfría.',
      'Llegan personas que no aplican o no tienen presupuesto.',
      'El seguimiento depende de que vos te acuerdes.',
      'No sabés qué parte del proceso funciona y cuál pierde oportunidades.',
      'Para crecer sentís que tenés que hacer más de todo.',
    ],
    closing: 'Eso no es escalabilidad.\nEs empujar más fuerte un sistema que todavía no está construido.',
    cta: GLOBAL_CTA,
  },

  // ─── PANTHERA APEX SYSTEM ─────────────────────────────────────────────────
  apexSystem: {
    eyebrow: 'Nuestro método',
    headline: 'Panthera APEX System',
    subheadline: 'El sistema que convierte una oferta validada en una infraestructura comercial medible.',
    phases: [
      {
        number: '01',
        title: 'Diagnóstico del modelo comercial',
        description:
          'Analizamos tu oferta, ticket, canales, proceso de venta, fuentes actuales de oportunidades y puntos de fuga.',
      },
      {
        number: '02',
        title: 'Auditoría del proceso actual',
        description:
          'Revisamos páginas, mensajes, anuncios, formularios, CRM, agenda, seguimiento y conversaciones comerciales para detectar dónde se rompe el flujo.',
      },
      {
        number: '03',
        title: 'Arquitectura de captación y filtrado',
        description:
          'Definimos cómo atraer al perfil correcto, cómo filtrar a quien no aplica y cómo preparar mejor a cada prospecto antes de la llamada.',
      },
      {
        number: '04',
        title: 'Construcción de activos y automatizaciones',
        description:
          'Creamos las piezas necesarias para que el sistema funcione: landing, formularios, calendario, CRM, automatizaciones, secuencias y dashboards.',
      },
      {
        number: '05',
        title: 'Activación y medición',
        description:
          'Lanzamos la infraestructura, empezamos a capturar datos reales y observamos qué sucede en cada etapa del proceso comercial.',
      },
      {
        number: '06',
        title: 'Optimización comercial',
        description:
          'Ajustamos mensajes, campañas, formularios, seguimiento y puntos de conversión según evidencia, no por intuición.',
      },
      {
        number: '07',
        title: 'Escalabilidad',
        description:
          'Con el sistema validado, ampliamos fuentes de tráfico, automatizaciones y capacidad comercial sin que todo dependa de estar encima.',
      },
    ],
    closingSlide: {
      text: 'Tu negocio no necesita más improvisación.\nNecesita una estructura que lo sostenga.',
      cta: GLOBAL_CTA,
    },
    phasesB: [
      {
        number: '01',
        title: 'Diagnóstico',
        description: 'Tu oferta, proceso de venta, canales y puntos de fuga.',
      },
      {
        number: '02',
        title: 'Auditoría',
        description: 'Cada pieza del flujo comercial para detectar dónde se rompe.',
      },
      {
        number: '03',
        title: 'Arquitectura',
        description: 'Cómo atraer al perfil correcto y filtrar al que no aplica.',
      },
      {
        number: '04',
        title: 'Construcción',
        description: 'Landing, formularios, CRM, automatizaciones y dashboards.',
      },
      {
        number: '05',
        title: 'Activación',
        description: 'Lanzamos el sistema y capturamos datos reales.',
      },
      {
        number: '06',
        title: 'Optimización',
        description: 'Ajustamos según evidencia, no por intuición.',
      },
      {
        number: '07',
        title: 'Escalabilidad',
        description: 'Con el sistema validado, ampliamos sin que dependa de vos.',
      },
    ],
  },

  // ─── LO QUE SE ORDENA DENTRO DEL SISTEMA ─────────────────────────────────
  systemPieces: {
    eyebrow: 'Sistema completo',
    headline: 'Cada pieza cumple una función comercial.',
    subheadline:
      'La infraestructura no es una landing, una campaña ni un CRM aislado.\nEs la conexión entre todo lo que convierte atención en oportunidades reales.',
    pieces: [
      {
        title: 'Captación',
        description:
          'Oportunidades alineadas al perfil correcto.',
      },
      {
        title: 'Filtrado',
        description:
          'Separar curiosos de prospectos reales antes de la llamada.',
      },
      {
        title: 'Agenda',
        description:
          'Llamadas con intención y contexto.',
      },
      {
        title: 'Seguimiento',
        description:
          'Que no dependa de tu memoria o tu energía.',
      },
      {
        title: 'CRM',
        description:
          'Contactos, etapas y datos con visibilidad real.',
      },
      {
        title: 'Automatizaciones',
        description:
          'Menos tareas repetitivas, menos perseguir cada movimiento.',
      },
      {
        title: 'Métricas',
        description:
          'Qué funciona, qué se rompe, dónde ajustar.',
      },
      {
        title: 'Optimización',
        description:
          'Datos reales hasta ganar estabilidad.',
      },
    ],
    cta: GLOBAL_CTA,
  },

  // ─── COMPARATIVA ──────────────────────────────────────────────────────────
  comparison: {
    eyebrow: 'Diferencia Panthera',
    headline: 'No somos una agencia de marketing.\nConstruimos infraestructura comercial.',
    subheadline:
      'La mayoría de agencias trabaja una parte del problema.\nPanthera trabaja el sistema completo que sostiene la venta.',
    traditional: {
      title: 'Agencia tradicional',
      items: [
        'Ejecuta campañas aisladas.',
        'Mide leads, clics o formularios.',
        'Te deja ordenar el proceso comercial a vos.',
        'Puede traer volumen sin filtro suficiente.',
        'Se desentiende del resultado final.',
      ],
    },
    panthera: {
      title: 'Panthera',
      items: [
        'Diseña el sistema comercial completo.',
        'Integra captación, filtrado, CRM, seguimiento y conversión.',
        'Mide calidad comercial, no solo tráfico.',
        'Construye sobre tu oferta, tu autoridad y tu proceso.',
        'Se hace responsable de que la infraestructura funcione.',
      ],
    },
    closing: 'No se trata de hacer más marketing.\nSe trata de construir el sistema que convierte tu reputación en oportunidades calificadas.',
    cta: GLOBAL_CTA,
  },

  // ─── TESTIMONIOS / CASOS ──────────────────────────────────────────────────
  testimonials: {
    eyebrow: 'Casos reales',
    headline: 'Resultados de personas que\ndejaron de operar desde la improvisación.',
    headlineVariantB: 'Resultados de personas que\ndejaron de operar desde la improvisación.',
    subheadline:
      'Coaches, consultores y mentores que ordenaron captación, seguimiento\ny proceso comercial con Panthera.',
    mobileSubheadline:
      'Coaches, consultores y mentores que ordenaron captación,\nseguimiento y proceso comercial con Panthera.',
    cases: [
      {
        name: 'Gastón Hendlin',
        role: 'Coach Financiero y Ejecutivo',
        description:
          'Pasó por varias agencias que no le funcionaron y hacía toda la operativa comercial solo. Reestructuramos captación, seguimiento y ventas. Hoy tiene equipo y picos de 28.000 USD mensuales.',
        youtubeUrl: 'https://youtu.be/tkq3PO2-yU4',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/tkq3PO2-yU4',
        videoTitle: 'Testimonio de Gastón Hendlin',
        coverImage: '/images/testimonial_gaston_cover.webp',
      },
      {
        name: 'Laura Sánchez',
        role: 'Coach Organizacional y Ejecutiva',
        description:
          'Dependía 100% de referidos y no llegaba al perfil correcto. Construimos estructura para atraer leads en frío con mejor filtrado. Hoy tiene un sistema sostenible.',
        youtubeUrl: 'https://youtu.be/iMTN4h5Gr4E',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/iMTN4h5Gr4E',
        videoTitle: 'Testimonio de Laura Sánchez',
        coverImage: '/images/testimonial_laura_cover.webp',
      },
      {
        name: 'Lucas Casalins',
        role: 'Coach Fitness y Alto Rendimiento',
        description:
          'Caos organizativo y malas experiencias con agencias. Ordenamos captación, seguimiento y proceso comercial. Hoy vende de forma recurrente con sistema.',
        youtubeUrl: 'https://youtu.be/A34a5JF5iPQ',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/A34a5JF5iPQ',
        videoTitle: 'Testimonio de Lucas Casalins',
        coverImage: '/images/testimonial_lucas_cover.webp',
      },
      {
        name: 'José Navas',
        role: 'Mentor de negocios',
        description:
          'Años intentando escalar en digital. El cuello de botella era la carga operativa. Se construyó la infraestructura para quitarle ese peso.',
        youtubeUrl: 'https://youtu.be/HKRIU34pW5g',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/HKRIU34pW5g',
        videoTitle: 'Testimonio de José Navas',
        coverImage: '/images/testimonial_jose_cover.webp',
      },
      {
        name: 'Hilda Arjona',
        role: 'Coach Espiritual',
        description:
          'Sostenía copy, edición, estrategia y ejecución sola, sin resultados consistentes. Corregimos oferta, mensaje y estructura de captación.',
        youtubeUrl: 'https://youtu.be/XqDvbuOqQ7Q',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/XqDvbuOqQ7Q',
        videoTitle: 'Testimonio de Hilda Arjona',
        coverImage: '/images/testimonial_hilda_cover.webp',
      },
    ],
    closingPanel: {
      text: 'Si tu negocio ya tiene valor,\nno debería depender de rachas, referidos\no urgencias diarias para crecer.',
      cta: GLOBAL_CTA,
    },
  },

  // ─── SOBRE PANTHERA ───────────────────────────────────────────────────────
  about: {
    eyebrow: 'Quiénes somos',
    headline: 'Construimos lo que las agencias tradicionales no estaban construyendo.',
    body: 'Panthera nació del hartazgo de ver negocios expertos atrapados entre lanzamientos agotadores, agencias que venden métricas vacías y sistemas que dependen del fundador.',
    body2:
      'Construimos infraestructura comercial: captación, filtrado, seguimiento, automatización y medición funcionando como un solo sistema. No creemos en fórmulas mágicas. Creemos en estructura, datos y relaciones a largo plazo.',
    body3: null,
    cta: GLOBAL_CTA,
    founders: [
      { name: 'Manuel', src: '/fundadores/IMG_7661.jpg' },
      { name: 'Equipo Panthera', src: '/fundadores/IMG_7352.jpg' },
    ],
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: 'Preguntas frecuentes',
    headline: 'Antes de agendar, resolvamos las dudas más comunes.',
    items: [
      {
        question: '¿Que diferencia a Panthera de una agencia de marketing digital tradicional?',
        answer:
          'A diferencia de una agencia tradicional que solo se enfoca en "conseguir likes" o lanzar campañas sueltas, nosotros nos convertimos en el brazo de marketing y ventas de tu negocio. No solo te gestionamos la publicidad o el contenido, sino que te armamos toda la estructura comercial, metemos métricas claras, te dejamos a punto un CRM y te entrenamos en ventas para que el proceso sea predecible de principio a fin.',
      },
      {
        question: '¿Qué pasa con todo el trabajo si el día de mañana dejamos de trabajar juntos?',
        answer:
          'Todo te queda a vos. Nosotros no nos llevamos el ecosistema construido para tu negocio. Nuestro trabajo es armar la infraestructura de ventas de tu empresa (tus embudos, tu CRM, tus procesos). Esto es un activo de tu negocio. Si el día de mañana decidís que nuestros caminos se separen, toda esa estructura sigue existiendo y operando bajo tu control total.',
      },
      {
        question: '¿Me garantizan una facturación exacta o resultados en pocos días?',
        answer:
          'No. Si buscás a alguien que te prometa "facturar 30.000 dólares en 90 días" o una solución mágica sin mover un dedo, no somos para vos y te diría que salgas corriendo. Nuestro enfoque es 100% analítico, basado en métricas y en armar un sistema sólido paso a paso. No existen los botones mágicos, acá hay laburo estratégico y decisiones basadas en datos.',
      },
      {
        question: '¿Para qué tipo de negocios está pensado este servicio?',
        answer:
          'Trabajamos con empresas B2C, consultores, coaches y mentores que tienen un buen servicio y clientes contentos, que tienen una oferta validada y facturan al menos $5.000 USD/mes, pero que necesitan un refuerzo potente en la generación de oportunidades. Nuestro objetivo es crear un flujo constante y predecible de nuevas oportunidades de venta.',
      },
      {
        question: '¿Qué es exactamente lo que arman en los primeros meses?',
        answer:
          'En la primera etapa nos enfocamos en: diseñar tu estrategia comercial y tu oferta, implementar un CRM con todas sus automatizaciones de seguimiento, armar tu embudo de ventas, producir y gestionar tu publicidad digital y el contenido orgánico, y darte un entrenamiento en ventas con el acompañamiento directo nuestro (de los dueños).',
      },
    ],
    cta: GLOBAL_CTA,
  },

  // ─── BOOKING / CIERRE ─────────────────────────────────────────────────────
  booking: {
    calendarId: '7Sk8mmne4xexnAx1tKYA',
    calendarSrc: 'https://links.iqautomated.io/widget/booking/7Sk8mmne4xexnAx1tKYA',
    closingText:
      'Agendá una llamada de diagnóstico con nosotros para revisar cómo estás generando oportunidades hoy, qué tan filtradas llegan tus reuniones y dónde se está rompiendo tu proceso comercial.',
  },

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  footer: {
    logo: {
      alt: 'Panthera Group',
      src: LOGO_SRC,
    },
    tagline: 'Infraestructura de venta automatizada.',
    links: [
      { label: GLOBAL_CTA, href: '#booking' },
    ],
    legal:
      'Este sitio no forma parte de Facebook ni de Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. Facebook es una marca registrada de Facebook, Inc.',
    copyright: '© 2026 Panthera Group. Todos los derechos reservados.',
  },
}
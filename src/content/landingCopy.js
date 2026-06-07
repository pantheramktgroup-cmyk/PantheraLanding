/**
 * landingCopy.js — Panthera Group
 * Fuente única de verdad para todo el contenido de la landing.
 * Ningún texto debe quedar hardcodeado en los componentes.
 * Todos los CTAs apuntan a #booking.
 */

export const landingCopy = {

  // ─── NAV ──────────────────────────────────────────────────────────────────
  nav: {
    logo: {
      alt: 'Panthera Group',
      src: '/logos/03.%20SVG/Recurso%2014.svg',
    },
    cta: 'Agendar diagnóstico',
  },

  // ─── HERO ─────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Panthera APEX System',
    headline: 'Convertimos tu reputación en una infraestructura de venta automatizada.',
    subheadline:
      'Para coaches, consultores, mentores e infoproductores que ya venden, pero todavía dependen de referidos, rachas de suerte o esfuerzo manual para generar reuniones calificadas.',
    body: 'Construimos el sistema que capta, filtra, agenda y ordena tu proceso comercial para que puedas crecer con más previsibilidad y menos caos operativo.',
    support: 'No hacemos campañas sueltas. Construimos la estructura comercial que sostiene tu crecimiento.',
    ctaPrimary: 'Agendar diagnóstico',
    ctaSecondary: 'Ver si Panthera aplica para mi negocio',
    badges: [
      'Para ofertas ya validadas',
      'Reuniones calificadas',
      'Infraestructura comercial',
      'Sistema medible',
    ],
  },

  // ─── VIDEO / MANIFIESTO ────────────────────────────────────────────────────
  video: {
    eyebrow: 'Manifiesto Panthera',
    headline: 'Si ya vendés, pero cada mes volvés a empezar de cero, esto es para vos.',
    pullQuote: 'Escalar no debería exigirte más esfuerzo. Debería exigirte mejor infraestructura.',
    cta: 'Agendar llamada de diagnóstico',
    // VSL via Google Drive embed (file too large for git)
    videoEmbedUrl: 'https://drive.google.com/file/d/1wpinQCvZpFmy0r0u6fiGtdZEWKhaXctM/preview',
    // Thumbnail shown before play — import handled in component
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
    cta: 'Agendar diagnóstico',
  },

  // ─── PARA QUIÉN ES / NO ES ────────────────────────────────────────────────
  audience: {
    eyebrow: 'Filtro de aplicación',
    headline: 'Esto no es para cualquiera. Y justamente por eso funciona mejor.',
    subheadline:
      'Panthera está pensado para negocios que ya tienen algo que el mercado compra, pero necesitan ordenar la forma en la que generan, filtran y convierten oportunidades.',
    yesTitle: 'Esto es para vos si:',
    yesItems: [
      'Vendés consultorías, mentorías, programas, infoproductos o servicios high-ticket.',
      'Ya tenés experiencia, reputación o casos, pero tu captación todavía es irregular.',
      'Dependés de referidos, contactos personales, contenido manual o rachas de suerte.',
      'Probaste agencias, campañas, lanzamientos o mentorías, pero sentiste que terminabas haciendo todo vos.',
      'Querés reuniones calificadas, no una agenda llena de curiosos o personas sin presupuesto.',
      'Necesitás ordenar captación, filtrado, seguimiento, CRM y proceso comercial en un solo sistema.',
    ],
    noTitle: 'Esto NO es para vos si:',
    noItems: [
      'Todavía no validaste tu oferta.',
      'Buscás una fórmula mágica o resultados inmediatos sin construir estructura.',
      'Querés delegar el crecimiento sin involucrarte en las decisiones estratégicas.',
      'No estás dispuesto a invertir en pauta, sistema, seguimiento y mejora comercial.',
      'Querés solo anuncios, solo posteos o solo una landing.',
      'Buscás una solución barata para probar suerte.',
    ],
    cta: 'Quiero saber si aplico',
  },

  // ─── PROBLEMA CENTRAL ─────────────────────────────────────────────────────
  problem: {
    eyebrow: 'El cuello de botella real',
    headline:
      'El problema no es que tu servicio no funcione. Es que tu crecimiento todavía depende demasiado de vos.',
    body: 'Podés tener autoridad, experiencia y una oferta que el mercado valora. Pero si cada nuevo cliente depende de que publiques más, escribas más, hagas más seguimiento o justo alguien te recomiende, tu negocio sigue siendo frágil.',
    body2:
      'La infraestructura comercial existe para que la captación, el filtrado, la agenda, el seguimiento y la medición no dependan de memoria, energía o suerte.',
    symptoms: [
      'Tenés meses con movimiento y otros donde la agenda se enfría.',
      'Llegan personas que no aplican, no tienen presupuesto o no entienden tu valor.',
      'El seguimiento depende de que vos te acuerdes.',
      'No sabés con claridad qué parte del proceso está funcionando y cuál está perdiendo oportunidades.',
      'Para crecer sentís que tenés que hacer más de todo.',
    ],
    closing: 'Eso no es escalabilidad. Es empujar más fuerte un sistema que todavía no está construido.',
    cta: 'Agendar diagnóstico',
  },

  // ─── PANTHERA APEX SYSTEM ─────────────────────────────────────────────────
  apexSystem: {
    eyebrow: 'Nuestro método',
    headline: 'Panthera APEX System',
    subheadline: 'El sistema que convierte una oferta validada en una infraestructura comercial medible.',
    intro:
      'No sumamos acciones sueltas para ver si algo funciona. Diseñamos el flujo completo: captación, filtrado, agenda, seguimiento, conversión y medición.',
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
      text: 'Tu negocio no necesita más improvisación. Necesita una estructura que lo sostenga.',
      cta: 'Agendar diagnóstico',
    },
  },

  // ─── LO QUE SE ORDENA DENTRO DEL SISTEMA ─────────────────────────────────
  systemPieces: {
    eyebrow: 'Sistema completo',
    headline: 'Cada pieza cumple una función comercial.',
    subheadline:
      'La infraestructura no es una landing, una campaña o un CRM aislado. Es la conexión entre cada punto que transforma atención en oportunidades comerciales reales.',
    pieces: [
      {
        title: 'Captación',
        description:
          'Generar oportunidades con mensajes, contenido y campañas alineadas al perfil correcto.',
      },
      {
        title: 'Filtrado',
        description:
          'Separar curiosos de prospectos reales antes de que ocupen espacio en tu agenda.',
      },
      {
        title: 'Agenda',
        description:
          'Convertir interés en llamadas con intención, contexto y mejor calidad comercial.',
      },
      {
        title: 'Seguimiento',
        description:
          'Evitar que las oportunidades dependan de tu memoria, energía o urgencias del día.',
      },
      {
        title: 'CRM',
        description:
          'Ordenar contactos, etapas, conversaciones y datos para tener visibilidad real.',
      },
      {
        title: 'Automatizaciones',
        description:
          'Reducir tareas repetitivas y sostener el proceso sin perseguir cada movimiento manualmente.',
      },
      {
        title: 'Métricas',
        description:
          'Entender qué funciona, qué se rompe y dónde ajustar para mejorar el sistema.',
      },
      {
        title: 'Optimización',
        description:
          'Mejorar el flujo con datos reales hasta que la captación y conversión ganen estabilidad.',
      },
    ],
    cta: 'Ver si mi negocio está listo',
  },

  // ─── COMPARATIVA ──────────────────────────────────────────────────────────
  comparison: {
    eyebrow: 'Diferencia Panthera',
    headline: 'No somos una agencia de marketing. Construimos infraestructura comercial.',
    subheadline:
      'La mayoría de agencias trabaja una parte del problema. Panthera trabaja el sistema completo que sostiene la venta.',
    traditional: {
      title: 'Agencia tradicional',
      items: [
        'Ejecuta campañas aisladas.',
        'Mide leads, clics o formularios.',
        'Te deja ordenar el proceso comercial a vos.',
        'Puede traer volumen sin suficiente filtro.',
        'Se enfoca en acciones.',
      ],
    },
    panthera: {
      title: 'Panthera',
      items: [
        'Diseña el sistema comercial completo.',
        'Integra captación, filtrado, CRM, seguimiento y conversión.',
        'Mide calidad comercial, no solo tráfico.',
        'Construye sobre tu oferta, tu autoridad y tu proceso.',
        'Se enfoca en infraestructura.',
      ],
    },
    closing: 'No se trata de hacer más marketing. Se trata de construir el sistema que convierte tu reputación en oportunidades calificadas.',
    cta: 'Quiero construir mi sistema',
  },

  // ─── TESTIMONIOS / CASOS ──────────────────────────────────────────────────
  testimonials: {
    eyebrow: 'Casos reales',
    headline: 'Negocios expertos que dejaron de operar desde la improvisación.',
    cases: [
      {
        name: 'Gastón Hendlin',
        role: 'Coach Financiero y Ejecutivo',
        description:
          'Tras pasar por varias agencias y frustrado de hacer el trabajo operativo, necesitaba un sistema que filtrara mejor y le quitara peso comercial. Reestructuramos su ecosistema digital para ordenar captación, seguimiento y calidad de oportunidades.',
        youtubeUrl: 'https://youtu.be/tkq3PO2-yU4',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/tkq3PO2-yU4',
        youtubeId: 'tkq3PO2-yU4',
        videoTitle: 'Testimonio de Gastón Hendlin',
        coverTitle: 'De referidos a sistema comercial',
      },
      {
        name: 'Laura Sánchez',
        role: 'Coach Organizacional y Ejecutiva',
        description:
          'Venía de depender de referidos y de sentirse poco visible para el mercado correcto. Construimos una estructura para mejorar posicionamiento, autoridad y llegada a prospectos fuera de su círculo cercano.',
        youtubeUrl: 'https://youtu.be/iMTN4h5Gr4E',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/iMTN4h5Gr4E',
        youtubeId: 'iMTN4h5Gr4E',
        videoTitle: 'Testimonio de Laura',
        coverTitle: 'Visibilidad con estructura',
      },
      {
        name: 'Lucas Casalins',
        role: 'Coach Fitness y Alto Rendimiento',
        description:
          'Llegó con caos organizativo y experiencias previas muy malas con agencias. El sistema le permitió ordenar su operación comercial, recuperar tranquilidad y tener mayor claridad para reinvertir.',
        youtubeUrl: 'https://youtu.be/A34a5JF5iPQ',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/A34a5JF5iPQ',
        youtubeId: 'A34a5JF5iPQ',
        videoTitle: 'Testimonio de Lucas',
        coverTitle: 'Proceso comercial más claro',
      },
      {
        name: 'José Navas',
        role: 'Mentor de negocios',
        description:
          'Después de años intentando escalar en digital, el problema era la carga operativa de prospección y seguimiento. Panthera ordenó la captación y el seguimiento comercial para liberar tiempo y mejorar oportunidades.',
        youtubeUrl: 'https://youtu.be/HKRIU34pW5g',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/HKRIU34pW5g',
        youtubeId: 'HKRIU34pW5g',
        videoTitle: 'Testimonio de José Navas',
        coverTitle: 'Menos operación, más sistema',
      },
      {
        name: 'Hilda Arjona',
        role: 'Coach Espiritual',
        description:
          'Estaba agotada de sostener copy, edición, estrategia y ejecución sin resultados consistentes. El trabajo se enfocó en corregir oferta, mensaje y estructura para atraer mejor al perfil correcto.',
        youtubeUrl: 'https://youtu.be/XqDvbuOqQ7Q',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/XqDvbuOqQ7Q',
        youtubeId: 'XqDvbuOqQ7Q',
        videoTitle: 'Testimonio de Hilda Arjona',
        coverTitle: 'Oferta, mensaje y captación',
      },
    ],
    closingPanel: {
      text: 'Si tu negocio ya tiene valor, no debería depender de rachas, referidos o urgencias diarias para crecer.',
      cta: 'Agendar diagnóstico',
    },
  },

  // ─── SOBRE PANTHERA ───────────────────────────────────────────────────────
  about: {
    eyebrow: 'Quiénes somos',
    headline: 'Construimos lo que las agencias tradicionales no estaban construyendo.',
    body: 'Panthera nació del hartazgo de ver negocios expertos atrapados entre lanzamientos agotadores, agencias que venden métricas vacías y sistemas que dependen demasiado del fundador.',
    body2:
      'Nuestro trabajo es construir infraestructura comercial: estrategia, captación, filtrado, seguimiento, automatización y medición funcionando como un solo sistema.',
    body3: 'No creemos en fórmulas mágicas. Creemos en estructura, datos, ejecución y relaciones comerciales a largo plazo.',
    pullQuote:
      'No competimos por ser otra agencia. Construimos sistemas para que negocios con autoridad puedan crecer con más claridad, control y previsibilidad.',
    cta: 'Hablar con Panthera',
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
        question: '¿Realmente necesito invertir en mi negocio? ¿No puedo seguir manejando mi marketing por mi cuenta?',
        answer:
          'Podés seguir haciéndolo por tu cuenta, pero el costo real suele aparecer en otro lugar: oportunidades que no se convierten, procesos manuales que consumen energía, prospectos mal filtrados y decisiones comerciales tomadas sin suficiente información.\n\nEl Panthera APEX System busca ordenar esa estructura para que tengas más claridad, mejor seguimiento y una forma más profesional de sostener el crecimiento. La pregunta no es solo cuánto cuesta construir infraestructura, sino cuánto te cuesta seguir operando sin una.',
      },
      {
        question: '¿Qué diferencia a Panthera Group de otras agencias de marketing?',
        answer:
          'Muchas agencias trabajan una parte aislada del problema: tráfico, contenido, automatización parcial o diseño. Panthera trabaja la infraestructura comercial completa.\n\nNo nos interesa solo generar formularios o visitas. Buscamos conectar captación, filtrado, CRM, seguimiento, agenda y medición para que puedas entender qué está pasando y mejorar el proceso con datos reales.',
      },
      {
        question: '¿Cuánto tiempo requiere la implementación del Panthera APEX System?',
        answer:
          'Depende del punto de partida de cada negocio, la oferta, los activos disponibles, el nivel de inversión publicitaria y el estado del proceso comercial.\n\nEn general, el trabajo se organiza por etapas: diagnóstico, arquitectura, construcción, activación y optimización. En la llamada revisamos tu caso y te damos una estimación razonable de tiempos y prioridades para tu situación específica.',
      },
      {
        question: '¿El Panthera APEX System funciona para mi tipo de negocio?',
        answer:
          'Funciona mejor para coaches, consultores, mentores, infoproductores y servicios high-ticket que ya tienen una oferta validada, pero necesitan mejorar captación, filtrado, seguimiento y previsibilidad comercial.\n\nSi todavía estás validando tu primera oferta, probablemente no sea el mejor momento. Si ya vendés y querés ordenar la forma en la que generás oportunidades, tiene sentido analizarlo en una llamada.',
      },
      {
        question: '¿Necesito tener conocimientos técnicos para usar el Panthera APEX System?',
        answer:
          'No. La parte técnica la trabajamos nosotros: estructura, CRM, automatizaciones, funnels, formularios, calendario y medición.\n\nTu rol es aportar información estratégica sobre tu negocio, validar decisiones importantes y participar en las reuniones necesarias para que el sistema represente bien tu oferta y tu forma de vender.',
      },
      {
        question: '¿Este sistema realmente me permitirá escalar mi negocio de forma sostenible, o es solo una solución rápida?',
        answer:
          'El enfoque de Panthera no está en atajos ni trucos momentáneos. Está en construir una infraestructura que pueda mejorar con datos y sostener el crecimiento con más orden.\n\nLa idea no es generar un pico aislado, sino ayudarte a construir una base comercial más clara, medible y preparada para crecer.',
      },
      {
        question: '¿Qué tan automatizado es realmente el sistema? ¿Voy a perder el contacto personal con mis clientes?',
        answer:
          'La automatización no reemplaza tu autoridad ni tu conexión humana. La ordena.\n\nEl objetivo es reducir tareas repetitivas, mejorar seguimiento y asegurar que las oportunidades lleguen con más contexto. Vos seguís presente en las interacciones de mayor valor: estrategia, venta, entrega y vínculo con el cliente.',
      },
    ],
    cta: 'Agendar llamada de diagnóstico',
  },

  // ─── BOOKING / CIERRE ─────────────────────────────────────────────────────
  booking: {
    calendarId: '7Sk8mmne4xexnAx1tKYA',
    calendarSrc: 'https://links.iqautomated.io/widget/booking/7Sk8mmne4xexnAx1tKYA',
    // Text below the calendar (not above)
    closingText:
      'Agendá una llamada de diagnóstico con nosotros para revisar cómo estás generando oportunidades hoy, qué tan filtradas llegan tus reuniones y dónde se está rompiendo tu proceso comercial.',
  },

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  footer: {
    logo: {
      alt: 'Panthera Group',
      src: '/logos/03.%20SVG/Recurso%2014.svg',
    },
    tagline: 'Infraestructura de venta automatizada.',
    links: [
      { label: 'Agendar diagnóstico', href: '#booking' },
    ],
    legal:
      'Este sitio no forma parte de Facebook ni de Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. Facebook es una marca registrada de Facebook, Inc.',
    copyright: `© ${new Date().getFullYear()} Panthera Group. Todos los derechos reservados.`,
  },
}

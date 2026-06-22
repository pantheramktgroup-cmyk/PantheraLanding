import heroVideo from '../assets/videos/hero-panthera-loop.mp4'
import strategyRoom from '../assets/images/hero_panthera_strategy_room.webp'
import pantheraMark from '../assets/images/panthera.webp'
import foundersImage from '../assets/images/fundadores.webp'
import founderOne from '../assets/images/fundador_1.webp'
import founderTwo from '../assets/images/fundador_2.webp'
import creationHand from '../assets/images/creation_panthera_hand.webp'
import aboutHeroImage from '../assets/images/fundadores.webp'
import aboutFoundersImage from '../assets/images/IMG_7661.jpg'

export const mediaAssets = {
  heroVideo,
  strategyRoom,
  pantheraMark,
  foundersImage,
  founderOne,
  founderTwo,
  creationHand,
  aboutHeroImage,
  aboutFoundersImage,
}

export const siteCopy = {
  brand: {
    name: 'Panthera',
    suffix: 'Group',
    tagline: 'Infraestructura comercial',
    logo: '/logos/01. PNG/Recurso 9.png',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Quiénes somos', href: '/quienes-somos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Resultados', href: '/resultados' },
    { label: 'Contacto', href: '/contacto' },
  ],
  ctas: {
    primary: 'Agendar diagnóstico',
    secondary: 'Ver servicios',
  },
  home: {
    hero: {
      eyebrow: 'Panthera Group',
      brandWord: 'Panthera.',
      title: 'Infraestructura comercial para expertos y negocios high-ticket.',
      subtitle:
        'Diseñamos sistemas de captación, seguimiento y ventas para convertir atención en oportunidades calificadas.',
    },
    manifesto: {
      eyebrow: 'Nuestra mirada',
      title: 'Panthera existe para ordenar lo que muchas empresas intentan resolver con piezas sueltas.',
      body:
        'Un negocio experto no necesita únicamente más tráfico. Necesita una estructura que conecte oferta, captación, seguimiento, ventas y medición. Por eso trabajamos sobre el sistema completo: desde cómo se genera la oportunidad hasta cómo se convierte y se optimiza.',
      principles: ['Sistema antes que campaña', 'Datos antes que intuición', 'Calidad antes que volumen'],
    },
    servicesPreview: {
      eyebrow: 'Qué hacemos',
      title: 'De la atención a la venta, con una estructura completa.',
      items: [
        {
          number: '01',
          title: 'Arquitectura Comercial',
          text: 'Ordenamos oferta, funnel, proceso de venta y puntos de fuga para construir sobre una base clara.',
        },
        {
          number: '02',
          title: 'Captación & Performance',
          text: 'Diseñamos y activamos canales de adquisición orientados a oportunidades calificadas.',
        },
        {
          number: '03',
          title: 'CRM & Automatización',
          text: 'Implementamos seguimiento, pipelines, recordatorios, dashboards y automatizaciones comerciales.',
        },
        {
          number: '04',
          title: 'Reporting & Optimización',
          text: 'Medimos, corregimos y escalamos a partir de datos reales, no de intuiciones.',
        },
      ],
    },
    apex: {
      eyebrow: 'APEX System',
      title: 'APEX System: la metodología que ordena la captación y la venta.',
      subtitle:
        'Un sistema en fases para que el crecimiento no dependa de improvisación ni de esfuerzo manual continuo.',
      phases: [
        { number: '01', title: 'Diagnóstico', text: 'Oferta, proceso de venta, canales y puntos de fuga.' },
        { number: '02', title: 'Auditoría', text: 'Revisión de cada pieza del ecosistema comercial.' },
        { number: '03', title: 'Arquitectura', text: 'Diseño del sistema para atraer, filtrar y convertir.' },
        { number: '04', title: 'Construcción', text: 'Landing, CRM, automatizaciones, dashboards y activos.' },
        { number: '05', title: 'Activación', text: 'Lanzamiento del sistema y captura de datos reales.' },
        { number: '06', title: 'Optimización', text: 'Ajustes por evidencia, no por intuición.' },
        { number: '07', title: 'Escalabilidad', text: 'Ampliación del sistema una vez validado.' },
      ],
    },
    resultsPreview: {
      eyebrow: 'Resultados',
      title: 'Sistemas que ya están en marcha.',
      subtitle: 'Casos reales de expertos que dejaron de depender solo del esfuerzo manual.',
      cta: 'Ver resultados',
      cases: [
        {
          name: 'Gastón Hendlin',
          role: 'Coach Financiero y Ejecutivo',
          text:
            'Tras pasar por varias agencias y seguir cargando con toda la estrategia y ejecución, necesitaba un sistema que dejara de depender de su esfuerzo diario. Panthera reordenó su ecosistema digital para atraer, filtrar y convertir oportunidades con mayor claridad.',
        },
        {
          name: 'Laura Sanchez',
          role: 'Coach de Alto Rendimiento',
          text:
            'Dependía principalmente de referidos y no tenía una estructura comercial profesional para sostener su crecimiento. Panthera ayudó a ordenar su sistema para atraer leads fuera de su círculo cercano y posicionar su propuesta con mayor solidez.',
        },
        {
          name: 'Lucas Casalins',
          role: 'Coach Fitness',
          text:
            'Venía de malas experiencias y de sostener demasiadas áreas de su negocio por cuenta propia. Panthera implementó una estructura integral para ordenar captación, seguimiento y operación comercial, permitiéndole recuperar foco en sus alumnos.',
        },
        {
          name: 'José Navas',
          role: 'Empresario',
          text:
            'Llevaba años intentando escalar en digital, con lanzamientos fallidos y mucha carga operativa. Panthera trabajó sobre la captación, prospección y seguimiento para que pudiera recibir oportunidades más calificadas sin perseguir leads manualmente.',
        },
        {
          name: 'Hilda Arjona',
          role: 'Mentora',
          text:
            'Estaba agotada de sostener copy, edición, estrategia y ejecución sin resultados consistentes. Panthera corrigió oferta, mensaje y estructura de captación para ordenar su crecimiento y atraer mejores oportunidades.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Próximo paso',
      title: 'Conocé cómo Panthera construye sistemas comerciales para expertos.',
      text: 'Explorá nuestra metodología y servicios para entender cómo trabajamos antes de iniciar una conversación.',
      cta: 'Conocer servicios',
    },
  },
  about: {
    hero: {
      eyebrow: 'Quiénes somos',
      title: 'No somos una agencia. Somos el equipo que construye tu sistema comercial.',
      subtitle:
        'Panthera combina estrategia, ejecución y operación para transformar negocios expertos en infraestructuras comerciales medibles.',
      methodologyLink: 'Conocer nuestra metodología',
    },
    story: {
      eyebrow: 'Origen',
      title: 'Panthera nace para resolver un problema que se repite en negocios expertos.',
      manifesto:
        'Dejar de depender de referidos, rachas o esfuerzo manual no es un problema de motivación. Es un problema de sistema.',
      indicators: ['Oferta', 'Captación', 'Conversión', 'Medición'],
      body:
        'Muchos consultores, mentores y negocios high-ticket tienen una oferta valiosa, pero dependen de referidos, esfuerzo manual o acciones aisladas para vender. Panthera existe para convertir ese conocimiento en una infraestructura comercial clara, medible y escalable.',
      highlights: [
        {
          number: '01',
          title: 'El problema',
          text: 'Ventas manuales, seguimiento desordenado y crecimiento difícil de predecir.',
        },
        {
          number: '02',
          title: 'La solución',
          text: 'Sistemas que conectan captación, CRM, automatización, ventas y medición.',
        },
        {
          number: '03',
          title: 'El diferencial',
          text: 'No ensamblamos piezas sueltas: diseñamos una operación comercial completa.',
        },
      ],
    },
    principles: {
      eyebrow: 'Filosofía',
      title: 'Principios que sostienen cada decisión.',
      subtitle: 'La estrategia no es una capa. Es la lógica que ordena el sistema comercial completo.',
      items: [
        { number: '01', title: 'Sistema antes que campaña', text: 'No trabajamos piezas aisladas. Diseñamos la arquitectura completa.' },
        {
          number: '02',
          title: 'Datos antes que intuición',
          text: 'Las decisiones se toman a partir de comportamiento real, métricas y evidencia.',
        },
        {
          number: '03',
          title: 'Calidad antes que volumen',
          text: 'El foco no es conseguir más leads, sino mejores oportunidades comerciales.',
        },
        {
          number: '04',
          title: 'Ejecución con criterio',
          text: 'No vendemos teoría. Construimos, medimos y corregimos en la práctica.',
        },
        {
          number: '05',
          title: 'Claridad operativa',
          text: 'Cada entrega debe tener dueño, plazo, criterio de calidad y siguiente paso.',
        },
        {
          number: '06',
          title: 'Prevención antes que urgencia',
          text: 'No somos apagafuegos. Creamos sistemas para que los problemas no se repitan.',
        },
      ],
    },
    operations: {
      eyebrow: 'Cómo operamos',
      title: 'Operamos con sistemas, no con improvisación.',
      subtitle: 'Cada cliente necesita claridad: qué se construye, quién ejecuta, qué se mide y cómo se mejora.',
      items: [
        {
          number: '01',
          title: 'Diagnóstico',
          text: 'Entendemos oferta, avatar, proceso comercial y puntos de fuga antes de ejecutar.',
        },
        {
          number: '02',
          title: 'Implementación',
          text: 'Construimos o supervisamos activos, funnels, CRM, automatizaciones y procesos comerciales.',
        },
        {
          number: '03',
          title: 'Medición',
          text: 'Definimos KPIs, dashboards y rutinas de seguimiento para tomar decisiones con datos.',
        },
        {
          number: '04',
          title: 'Optimización',
          text: 'Ajustamos campañas, mensajes, seguimiento y operación según evidencia real.',
        },
      ],
    },
    team: {
      eyebrow: 'Equipo',
      foundersTitle: 'Fundadores',
      foundersText:
        'La dirección de Panthera combina visión comercial, estrategia de cliente y construcción de sistemas comerciales.',
      founders: [
        {
          name: 'Martín Muntaner',
          role: 'Co-Founder / Sales Manager',
          text: 'Lidera la dirección comercial, el proceso de ventas y la visión de crecimiento de Panthera.',
        },
        {
          name: 'Manuel Ojeda',
          role: 'Co-Founder / Client Strategist',
          text:
            'Traduce los objetivos del cliente en dirección estratégica, prioridades y decisiones de implementación.',
        },
      ],
      title: 'Equipo operativo',
      subtitle:
        'Cada rol existe para que la estrategia se transforme en implementación, seguimiento y mejora real.',
      note:
        'Además, Panthera trabaja con un equipo de edición y producción audiovisual según las necesidades de cada proyecto.',
      roles: [
        {
          number: '01',
          title: 'Operations Manager',
          text: 'Ordena procesos, equipo, entregables, calidad operativa y seguimiento interno.',
          member: 'Ezequiel Miceli',
        },
        {
          number: '02',
          title: 'Content Specialist',
          text: 'Desarrolla contenido orgánico, comunicación y piezas alineadas a la estrategia.',
          member: 'David Rivera',
        },
        {
          number: '03',
          title: 'Media Buyer',
          text: 'Gestiona campañas, pauta, hipótesis, guiones de anuncios, métricas y optimización publicitaria.',
          member: 'David Orrego',
        },
        {
          number: '04',
          title: 'Automation Specialist',
          text: 'Construye y mantiene CRM, workflows, automatizaciones, integraciones y sistemas técnicos.',
          member: 'René Mendoza',
        },
      ],
    },
    culture: {
      eyebrow: 'Lo que cuidamos',
      title: 'Lo que cuidamos en cada proyecto.',
      items: [
        {
          number: '01',
          title: 'Claridad',
          text: 'Líneas claras, acuerdos concretos y procesos documentados.',
        },
        {
          number: '02',
          title: 'Ejecución',
          text: 'No vendemos teoría. Construimos, medimos y corregimos.',
        },
        {
          number: '03',
          title: 'Simplicidad',
          text: 'Buscamos la solución más simple que realmente resuelve el problema.',
        },
        {
          number: '04',
          title: 'Prevención',
          text: 'No somos apagafuegos. Creamos sistemas para que los problemas no se repitan.',
        },
        {
          number: '05',
          title: 'Datos',
          text: 'Sin medición no hay optimización. Sin datos, solo hay suposiciones.',
        },
        {
          number: '06',
          title: 'Responsabilidad',
          text: 'Cada entrega debe tener dueño, plazo y criterio de calidad.',
        },
      ],
    },
    cta: {
      title: 'Conocé cómo trabajamos antes de iniciar una conversación.',
      text:
        'Explorá nuestros servicios y metodología para entender si Panthera es el tipo de equipo que tu negocio necesita.',
      cta: 'Ver servicios',
    },
  },
  services: {
    hero: {
      eyebrow: 'Servicios',
      title: 'Servicios diseñados para crear un sistema, no solo una campaña.',
      subtitle:
        'Trabajamos sobre la estructura completa de captación y ventas: estrategia, activos, automatización, seguimiento y optimización.',
    },
    grid: {
      eyebrow: 'Capacidades',
      title: 'Cada pieza conectada a la misma estrategia.',
      items: [
        { number: '01', title: 'Diagnóstico comercial', text: 'Análisis de oferta, funnel, proceso de venta y puntos críticos.' },
        { number: '02', title: 'Arquitectura de funnel', text: 'Diseño del recorrido desde la atención inicial hasta la llamada o venta.' },
        { number: '03', title: 'Landing pages', text: 'Activos de conversión alineados a la oferta, audiencia y proceso comercial.' },
        { number: '04', title: 'CRM y automatización', text: 'Pipelines, campos, workflows, recordatorios y seguimiento operativo.' },
        { number: '05', title: 'Captación', text: 'Campañas y canales orientados a atraer oportunidades calificadas.' },
        { number: '06', title: 'Dashboards', text: 'Reportes y visibilidad sobre leads, agendas, shows, ventas y facturación.' },
        { number: '07', title: 'Optimización', text: 'Mejora continua del sistema según datos reales.' },
        { number: '08', title: 'Consultoría estratégica', text: 'Acompañamiento para decisiones de oferta, operación y crecimiento.' },
      ],
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'APEX System: el orden detrás de cada implementación.',
      subtitle: 'Una secuencia clara para pasar del diagnóstico a la escalabilidad sin improvisar.',
    },
    fit: {
      title: 'Para quién es Panthera',
      good: [
        'Expertos, coaches, consultores y mentores con oferta validada.',
        'Negocios high-ticket que ya venden, pero necesitan previsibilidad.',
        'Equipos que quieren ordenar captación, ventas y seguimiento.',
      ],
      bad: [
        'Negocios sin oferta clara.',
        'Personas que buscan una solución mágica.',
        'Empresas que solo quieren anuncios sin sistema comercial.',
      ],
    },
  },
  results: {
    hero: {
      eyebrow: 'Resultados',
      title: 'Resultados que nacen de sistemas, no de casualidad.',
      subtitle:
        'Casos, testimonios y aprendizajes de negocios que dejaron de depender solo del esfuerzo manual.',
    },
    cases: [
      {
        name: 'Gastón Hendlin',
        role: 'Coach Financiero y Ejecutivo',
        problem: 'Caso en edición. Reemplazar por copy final validado.',
        intervention: 'Caso en edición. Reemplazar por copy final validado.',
        result: 'Caso en edición. Reemplazar por testimonio final.',
      },
      {
        name: 'Laura Sanchez',
        role: 'Coach de Alto Rendimiento',
        problem: 'Caso en edición. Reemplazar por copy final validado.',
        intervention: 'Caso en edición. Reemplazar por copy final validado.',
        result: 'Caso en edición. Reemplazar por testimonio final.',
      },
      {
        name: 'Lucas Casalins',
        role: 'Coach Fitness',
        problem: 'Caso en edición. Reemplazar por copy final validado.',
        intervention: 'Caso en edición. Reemplazar por copy final validado.',
        result: 'Caso en edición. Reemplazar por testimonio final.',
      },
      {
        name: 'José Navas',
        role: 'Placeholder pendiente de reemplazo.',
        problem: 'Caso en edición. Reemplazar por copy final validado.',
        intervention: 'Caso en edición. Reemplazar por copy final validado.',
        result: 'Caso en edición. Reemplazar por testimonio final.',
      },
      {
        name: 'Hilda Arjona',
        role: 'Placeholder pendiente de reemplazo.',
        problem: 'Caso en edición. Reemplazar por copy final validado.',
        intervention: 'Caso en edición. Reemplazar por copy final validado.',
        result: 'Caso en edición. Reemplazar por testimonio final.',
      },
    ],
    note: 'No se incluyen cifras, testimonios ni métricas no verificadas.',
  },
  contact: {
    hero: {
      eyebrow: 'Contacto',
      title: 'Contanos en qué etapa está tu negocio.',
      subtitle:
        'Evaluamos si Panthera puede ayudarte a construir un sistema comercial más predecible, medible y escalable.',
    },
    form: {
      title: 'Solicitar diagnóstico',
      fields: ['Nombre', 'Email', 'WhatsApp', 'Sitio o Instagram', 'Mensaje'],
      cta: 'Enviar solicitud',
      note: 'Si no definís una dirección de envío, el formulario copia el resumen al portapapeles.',
    },
    diagnostic: {
      eyebrow: 'Diagnóstico',
      title: 'Qué evaluamos en el diagnóstico',
      items: ['Oferta', 'Funnel', 'Captación', 'Seguimiento', 'Conversión', 'Datos'],
    },
    faqs: [
      {
        question: '¿Trabajan con cualquier tipo de negocio?',
        answer: 'Trabajamos principalmente con expertos y negocios high-ticket con oferta validada o en proceso de validación.',
      },
      {
        question: '¿Panthera solo hace anuncios?',
        answer: 'No. Diseñamos el sistema completo: estrategia, captación, activos, CRM, automatización, seguimiento y optimización.',
      },
      {
        question: '¿Qué necesito tener antes de trabajar con Panthera?',
        answer: 'Idealmente una oferta clara, una audiencia definida y disponibilidad para ordenar el proceso comercial.',
      },
      {
        question: '¿Cómo empieza el proceso?',
        answer: 'Con un diagnóstico para entender el estado actual del negocio y decidir si existe una oportunidad real de construir un sistema mejor.',
      },
    ],
  },
  footer: {
    description:
      'Sistemas comerciales para expertos y negocios high-ticket. Estrategia, captación, CRM, automatización y reporting en una sola infraestructura.',
    columns: {
      navigation: {
        title: 'Navegación',
        links: [
          { label: 'Inicio', href: '/' },
          { label: 'Quiénes somos', href: '/quienes-somos' },
          { label: 'Servicios', href: '/servicios' },
          { label: 'Resultados', href: '/resultados' },
          { label: 'Contacto', href: '/contacto' },
        ],
      },
      services: {
        title: 'Servicios',
        links: [
          { label: 'Arquitectura comercial', href: '/servicios' },
          { label: 'Captación & performance', href: '/servicios' },
          { label: 'CRM & automatización', href: '/servicios' },
          { label: 'Reporting & optimización', href: '/servicios' },
        ],
      },
      contact: {
        title: 'Contacto',
        links: [
          { label: 'Agendar diagnóstico', href: '/landing#booking' },
          { label: 'Placeholder email', href: '/contacto' },
          { label: 'Placeholder WhatsApp', href: '/contacto' },
        ],
      },
    },
    text: 'Panthera Group — Sistemas comerciales para expertos y negocios high-ticket.',
  },
} as const
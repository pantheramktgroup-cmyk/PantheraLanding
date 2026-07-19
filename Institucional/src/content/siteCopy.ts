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
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Personas que ya trabajaron con Panthera.',
      subtitle:
        'Cada caso muestra como cambia un negocio cuando estrategia, captacion, seguimiento y conversion empiezan a funcionar como sistema.',
    },
    cases: [
      {
        name: 'Gaston Hendlin',
        role: 'Coach Financiero y Ejecutivo',
        problem: 'Dependia de agencias sin resultados y seguia cargando con la estrategia y ejecucion.',
        intervention: 'Reordenamos su ecosistema comercial para filtrar, captar y vender con estructura.',
        result: 'Dejo de perder tiempo con curiosos y empezo a escalar con oportunidades calificadas.',
        youtubeId: 'tkq3PO2-yU4',
      },
      {
        name: 'Laura Sanchez',
        role: 'Coach de Alto Rendimiento',
        problem: 'Dependia de referidos y no tenia una estructura clara para crecer fuera de su circulo.',
        intervention: 'Construimos una operacion para atraer leads en frio y profesionalizar su proceso comercial.',
        result: 'Paso de sentirse invisible a posicionarse con un sistema sostenible de captacion.',
        youtubeId: 'iMTN4h5Gr4E',
      },
      {
        name: 'Lucas Casalins',
        role: 'Coach Fitness',
        problem: 'Vivia frustrado, haciendo todo solo y sin previsibilidad comercial.',
        intervention: 'Integramos marketing, seguimiento, ventas y operacion en una misma estructura.',
        result: 'Recupero orden, previsibilidad y foco en sus alumnos mientras el sistema trabaja detras.',
        youtubeId: 'A34a5JF5iPQ',
      },
      {
        name: 'Jose Navas',
        role: 'Mentor de Negocios',
        problem: 'Llevaba anos intentando escalar en digital con lanzamientos fallidos y exceso operativo.',
        intervention: 'Delego atraccion, prospeccion y seguimiento dentro de un sistema comercial ordenado.',
        result: 'Recupero libertad y empezo a recibir agendamientos calificados sin perseguir leads.',
        youtubeId: 'HKRIU34pW5g',
      },
      {
        name: 'Hilda Arjona',
        role: 'Coach Espiritual',
        problem: 'Estaba agotada de hacerlo todo sola y sin resultados consistentes.',
        intervention: 'Corregimos oferta, avatar y ejecucion para ordenar su captacion y seguimiento.',
        result: 'Volvio a enfocarse en entregar valor mientras el sistema atrae alumnas ideales.',
        youtubeId: 'XqDvbuOqQ7Q',
      },
    ],
    learnings: {
      eyebrow: 'Aprendizajes',
      title: 'Que se repite en los casos que funcionan.',
      subtitle:
        'Los resultados no aparecen por una sola pieza. Se producen cuando oferta, captacion, seguimiento, venta y medicion trabajan conectados.',
      items: [
        {
          number: '01',
          title: 'Claridad de oferta',
          text: 'Antes de escalar, el negocio necesita saber que vende, a quien se lo vende y por que esa persona deberia avanzar.',
        },
        {
          number: '02',
          title: 'Sistema antes que volumen',
          text: 'Mas trafico no resuelve un proceso desordenado. Primero se ordena el recorrido comercial.',
        },
        {
          number: '03',
          title: 'Seguimiento medible',
          text: 'Las oportunidades se pierden cuando no hay CRM, tareas, recordatorios y criterios claros de avance.',
        },
        {
          number: '04',
          title: 'Optimizacion continua',
          text: 'La mejora aparece cuando se leen datos reales: llamadas, formularios, fuentes, conversiones y objeciones.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Siguiente paso',
      title: 'Conoce que parte de tu sistema comercial necesita orden primero.',
      text: 'Podes revisar nuestros servicios o iniciar una conversacion para entender si Panthera tiene sentido para tu negocio.',
      cta: 'Agendar diagnostico',
      href: '/landing#booking',
    },
    note: 'No se incluyen cifras, testimonios ni métricas no verificadas.',
  },
  servicesPage: {
    hero: {
      eyebrow: 'Servicios',
      title: 'Servicios disenados para construir infraestructura comercial, no acciones aisladas.',
      subtitle:
        'Trabajamos sobre la estructura completa de captacion y ventas: estrategia, activos, CRM, automatizacion, seguimiento, publicidad, contenido y medicion.',
      cta: 'Ver infraestructura',
    },
    infrastructure: {
      eyebrow: 'Infraestructura',
      title: 'Cada pieza conectada a la misma estrategia.',
      subtitle:
        'Panthera integra estrategia, captacion, activos, CRM, automatizacion, contenido, seguimiento y medicion para que el sistema funcione completo.',
      items: [
        { number: '01', title: 'Diagnostico comercial', text: 'Analisis de oferta, ticket, avatar, canales actuales, proceso de venta y puntos criticos.' },
        { number: '02', title: 'Arquitectura de funnel', text: 'Diseno del recorrido desde la atencion inicial hasta la llamada, propuesta o venta.' },
        { number: '03', title: 'Landing pages', text: 'Activos de conversion alineados a la oferta, audiencia, mensaje y proceso comercial.' },
        { number: '04', title: 'CRM y automatizacion', text: 'Pipelines, campos, workflows, calendarios, recordatorios y seguimiento operativo.' },
        { number: '05', title: 'Captacion', text: 'Estrategia, configuracion, optimizacion y escalado de campanas orientadas a oportunidades calificadas.' },
        { number: '06', title: 'Contenido y mensajes', text: 'Pilares, guiones, piezas organicas, comunicacion y angulos alineados a la estrategia.' },
        { number: '07', title: 'Flujo comercial', text: 'Scripts, procesos de calificacion, seguimiento, feedback comercial y mejora de llamadas.' },
        { number: '08', title: 'Reporting y optimizacion', text: 'Dashboards, KPIs, lectura de datos y decisiones de mejora a partir de evidencia real.' },
      ],
    },
    systems: {
      eyebrow: 'Sistema operativo comercial',
      title: 'Lo que construimos es una estructura para atraer, convertir, entregar y medir.',
      subtitle:
        'Cada sistema cumple una funcion distinta, pero todos trabajan conectados para que el crecimiento no dependa de piezas aisladas.',
      items: [
        { number: '01', title: 'Atraccion', text: 'Oferta, mensaje, contenidos, anuncios, landing pages y activos que generan atencion calificada.' },
        { number: '02', title: 'Conversion', text: 'CRM, agenda, calificacion, seguimiento, scripts y proceso comercial para transformar interes en oportunidades.' },
        { number: '03', title: 'Entrega', text: 'Onboarding, procesos, recursos y orden operativo para que la experiencia no dependa de improvisacion.' },
        { number: '04', title: 'Control', text: 'Dashboards, KPIs, lectura de datos y optimizacion continua para tomar decisiones con evidencia.' },
      ],
    },
    roadmap: {
      eyebrow: 'Como trabajamos',
      title: 'Roadmap operativo para construir, activar y escalar el sistema comercial.',
      subtitle: 'Cada etapa tiene foco, entregables y decisiones concretas. No es una lista de tareas: es una implementacion con direccion.',
      methodologyLinkLabel: 'Ver metodologia',
      stageLabel: 'Etapa',
      whatWeDoLabel: 'Que hacemos',
      clientReceivesLabel: 'Que recibe el cliente',
      items: [
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
      ],
    },
    fit: {
      eyebrow: 'Para quien es',
      title: 'Cuando tiene sentido trabajar con Panthera.',
      subtitle:
        'Panthera funciona mejor cuando existe una direccion clara y el objetivo es ordenar como se atraen, filtran, convierten y miden oportunidades.',
      goodTitle: 'Tiene sentido si',
      badTitle: 'Probablemente no sea el momento si',
      good: [
        'Ya existe una oferta o una idea clara que se quiere ordenar.',
        'El negocio necesita mas previsibilidad comercial.',
        'Hay intencion real de medir, mejorar y participar del proceso.',
        'Se busca construir infraestructura, no solo acciones aisladas.',
      ],
      bad: [
        'Se busca una solucion magica o inmediata.',
        'Solo se quiere publicar anuncios sin ordenar el proceso comercial.',
        'No hay disposicion a revisar oferta, datos o seguimiento.',
        'Se busca delegar todo sin involucrarse en decisiones estrategicas.',
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Entende que parte de tu sistema comercial necesita orden primero.',
      text:
        'El primer paso es revisar tu situacion actual y detectar si Panthera puede ayudarte a construir una estructura mas clara, medible y predecible.',
      button: 'Ir a contacto',
      href: '/contacto',
    },
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
  contactPage: {
    urls: {
      whatsapp: 'https://wa.me/543813319626?text=Hola!%20Quiero%20aplicar%20al%20programa%20Panthera',
      diagnostic: '/landing#booking',
    },
    hero: {
      eyebrow: 'Contacto',
      title: 'Contanos en que etapa esta tu negocio.',
      subtitle:
        'Si ya tenes una oferta validada y queres ordenar captacion, seguimiento, ventas y medicion, podemos ayudarte a entender si Panthera tiene sentido para tu caso.',
    },
    channels: {
      eyebrow: 'Canales de contacto',
      title: 'Elegi el canal segun tu etapa.',
      subtitle:
        'Si estas evaluando contexto inicial o ya quieres avanzar con una llamada, puedes usar el canal que mejor se ajuste a tu momento.',
      whatsapp: {
        label: 'WhatsApp',
        text: 'Para consultas, diagnostico inicial o entender si Panthera aplica a tu negocio.',
        cta: 'Escribir por WhatsApp',
      },
      diagnostic: {
        label: 'Diagnostico',
        text: 'Si ya sabes que quieres evaluar una implementacion, puedes reservar una llamada directamente.',
        cta: 'Agendar diagnostico',
      },
    },
    consult: {
      eyebrow: 'Que podes consultarnos',
      title: 'Podes escribirnos aunque todavia no tengas todo definido.',
      subtitle:
        'La primera conversacion puede servir para entender tu situacion, ordenar prioridades o definir si tiene sentido avanzar hacia un diagnostico.',
      items: [
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
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Preguntas frecuentes',
      subtitle: 'Una lectura clara para entender si este proceso es adecuado para tu etapa actual.',
      items: [
        {
          question: '¿Que diferencia a Panthera de una agencia de marketing digital tradicional?',
          answer:
            'A diferencia de una agencia tradicional que solo se enfoca en "conseguir likes" o lanzar campanas sueltas, nosotros nos convertimos en el brazo de marketing y ventas de tu negocio. No solo te gestionamos la publicidad o el contenido, sino que te armamos toda la estructura comercial, metemos metricas claras, te dejamos a punto un CRM y te entrenamos en ventas para que el proceso sea predecible de principio a fin.',
        },
        {
          question: '¿Que pasa con todo el trabajo si el dia de manana dejamos de trabajar juntos?',
          answer:
            'Todo te queda a vos. Nosotros no nos llevamos el ecosistema construido para tu negocio. Nuestro trabajo es armar la infraestructura de ventas de tu empresa (tus embudos, tu CRM, tus procesos). Esto es un activo de tu negocio. Si el dia de manana decidis que nuestros caminos se separen, toda esa estructura sigue existiendo y operando bajo tu control total.',
        },
        {
          question: '¿Me garantizan una facturacion exacta o resultados en pocos dias?',
          answer:
            'No. Si buscas a alguien que te prometa "facturar 30.000 dolares en 90 dias" o una solucion magica sin mover un dedo, no somos para vos y te diria que salgas corriendo. Nuestro enfoque es 100% analitico, basado en metricas y en armar un sistema solido paso a paso. No existen los botones magicos, aca hay laburo estrategico y decisiones basadas en datos.',
        },
        {
          question: '¿Para que tipo de negocios esta pensado este servicio?',
          answer:
            'Trabajamos con empresas B2C, consultores, coaches y mentores que tienen un buen servicio y clientes contentos, que tienen una oferta validada y facturan al menos $5.000 USD/mes, pero que necesitan un refuerzo potente en la generacion de oportunidades. Nuestro objetivo es crear un flujo constante y predecible de nuevas oportunidades de venta.',
        },
        {
          question: '¿Que es exactamente lo que arman en los primeros meses?',
          answer:
            'En la primera etapa nos enfocamos en: disenar tu estrategia comercial y tu oferta, implementar un CRM con todas sus automatizaciones de seguimiento, armar tu embudo de ventas, producir y gestionar tu publicidad digital y el contenido organico, y darte un entrenamiento en ventas con el acompanamiento directo nuestro (de los duenos).',
        },
      ],
    },
    closing: {
      title: 'Si quieres entender si Panthera encaja con tu negocio, escribinos.',
      text: 'Revisamos tu situacion actual y te indicamos si tiene sentido avanzar hacia una llamada de diagnostico.',
      cta: 'Escribir por WhatsApp',
    },
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
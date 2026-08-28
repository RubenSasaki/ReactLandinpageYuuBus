export const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=mx.oaxaca.rutasoaxaca'

export function withCampaignParameters(url: string) {
  if (typeof window === 'undefined') return url

  const destination = new URL(url)
  const current = new URLSearchParams(window.location.search)

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = current.get(key)
    if (value) destination.searchParams.set(key, value)
  }

  return destination.toString()
}

export const showcaseScreens = [
  {
    src: '/assets/screens/inicio.webp',
    alt: 'Pantalla de inicio de Yuu Bus con accesos a movilidad y agenda de Oaxaca',
    label: 'Inicio',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/planear-viaje-inicio.webp',
    alt: 'Pantalla para planear un viaje antes de elegir el destino en Yuu Bus',
    label: 'Planear viaje',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/planear-viaje.webp',
    alt: 'Pantalla para planear un viaje con origen y destino seleccionados en Yuu Bus',
    label: 'Destino',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/opciones-viaje.webp',
    alt: 'Opciones de viaje directas y con conexión en Yuu Bus',
    label: 'Opciones',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/rutas.webp',
    alt: 'Listado de rutas de Yuu Bus con datos locales',
    label: 'Rutas',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/seguir-ruta.webp',
    alt: 'Seguimiento de una ruta sobre el mapa de Yuu Bus',
    label: 'Seguir ruta',
    width: 944,
    height: 2048,
  },
  {
    src: '/assets/screens/eventos.webp',
    alt: 'Pantalla de eventos y actividades culturales en Yuu Bus',
    label: 'Eventos',
    width: 944,
    height: 2048,
  },
] as const

export const howItWorks = [
  {
    step: '01',
    icon: 'search',
    title: 'Busca tu destino',
    description: 'Escribe a dónde vas o elige el punto directamente en el mapa.',
    image: '/assets/screens/planear-viaje-inicio.webp',
    alt: 'Pantalla de Yuu Bus para elegir origen y destino',
    width: 944,
    height: 2048,
  },
  {
    step: '02',
    icon: 'route',
    title: 'Elige una ruta',
    description: 'Compara viaje directo, transbordo o caminata antes de salir.',
    image: '/assets/screens/opciones-viaje.webp',
    alt: 'Opciones de viaje directas y con transbordo en Yuu Bus',
    width: 944,
    height: 2048,
  },
  {
    step: '03',
    icon: 'near_me',
    title: 'Mira cómo llegar',
    description: 'Consulta el recorrido y las paradas para moverte con más claridad.',
    image: '/assets/screens/seguir-ruta.webp',
    alt: 'Seguimiento de una ruta y sus paradas en el mapa de Yuu Bus',
    width: 944,
    height: 2048,
  },
] as const

export const stats = [
  { value: '16+', label: 'Rutas capturadas' },
  { value: '1,400+', label: 'Paradas mapeadas' },
] as const

export const features = [
  {
    icon: 'route',
    title: 'Rutas con trabajo de campo',
    description: 'Cada parada fue capturada a pie, verificando el recorrido real del camión.',
    image: '/assets/screens/seguir-ruta.webp',
    alt: 'Seguimiento de una ruta con paradas y horarios en el mapa de Yuu Bus',
    width: 944,
    height: 2048,
  },
  {
    icon: 'multiple_stop',
    title: 'Directa, transbordo o caminando',
    description: '"Planea tu viaje" compara todas las opciones para llegar a tu destino.',
    image: '/assets/screens/opciones-viaje.webp',
    alt: 'Opciones de viaje directas y con conexión mostradas en Yuu Bus',
    width: 944,
    height: 2048,
  },
  {
    icon: 'near_me',
    title: 'Paradas cerca de ti',
    description: 'Ve qué rutas pasan a tu alrededor en tiempo real, con su dirección y sentido.',
    image: '/assets/screens/inicio.webp',
    alt: 'Pantalla de inicio de Yuu Bus con el acceso Cerca de mí',
    width: 944,
    height: 2048,
  },
  {
    icon: 'theater_comedy',
    title: 'Eventos y cultura',
    description: 'Calendas, Guelaguetza, tianguis — con las rutas para llegar a cada uno.',
    image: '/assets/screens/eventos.webp',
    alt: 'Pantalla de eventos y actividades culturales en Yuu Bus',
    width: 944,
    height: 2048,
  },
  {
    icon: 'signal_wifi_off',
    title: 'Funciona sin internet',
    description: 'Consulta rutas y paradas aunque no tengas señal. Los datos viven en tu teléfono.',
    image: '/assets/screens/rutas.webp',
    alt: 'Listado de rutas de Yuu Bus con la indicación de datos locales',
    width: 944,
    height: 2048,
  },
] as const

export const SPONSOR_CONTACT_EMAIL = 'montealbancode@gmail.com'

export const sponsorPlans = [
  {
    id: 1,
    tone: 'anil',
    name: 'Presencia YuuBus',
    price: '$300 MXN / mes',
    priceLabel: 'PRECIO SUGERIDO',
    includesLabel: 'Incluye',
    benefits: [
      'Perfil dentro de YuuBus.',
      'Nombre, descripción y categoría.',
      'Ubicación y horarios.',
      'Teléfono y WhatsApp.',
      'Enlaces a redes sociales.',
      'Fotografías.',
      'Aparición dentro de búsquedas.',
      'Instrucciones básicas para llegar con el transporte disponible en YuuBus.',
    ],
    idealTitle: 'Ideal para',
    idealFor: 'Pequeños negocios, cafeterías, tiendas, talleres y servicios locales.',
  },
  {
    id: 2,
    tone: 'naranja',
    name: 'Impulso YuuBus',
    price: '$500 MXN / mes',
    priceLabel: 'PRECIO SUGERIDO',
    includesLabel: 'Todo Presencia, más',
    benefits: [
      'Landing page básica.',
      'Ficha comercial mejorada.',
      'Promoción dentro de YuuBus.',
      'Asesoría básica en presencia digital.',
      'Una pieza gráfica periódica.',
      'Apoyo básico en redes sociales.',
      'Participación posible en publicaciones.',
      'Mayor visibilidad en categorías y búsquedas.',
    ],
    idealTitle: 'Ideal para',
    idealFor: 'Restaurantes, cafeterías, comercios, servicios turísticos y negocios que buscan visibilidad.',
  },
  {
    id: 3,
    tone: 'grana',
    name: 'Destacado YuuBus',
    price: '$900 MXN mensuales · precio sugerido',
    priceLabel: '',
    includesLabel: '',
    benefits: [
      'Todo lo incluido en Impulso.',
      'Posición destacada y tarjeta premium.',
      'Promoción periódica.',
      'Contenido para redes.',
      'Video corto estilo TikTok o Reel.',
      'Métricas básicas.',
      'Campañas o recomendaciones dentro de la app.',
      'Prioridad en categorías.',
      'Vinculación con eventos o lugares cercanos.',
    ],
    idealTitle: 'Ideal para Destacado',
    idealFor: 'Restaurantes consolidados, hoteles, recorridos, servicios turísticos y empresas locales con mayor interés comercial.',
  },
  {
    id: 4,
    tone: 'maguey',
    name: 'Aliado YuuBus',
    price: 'Desde $1,500 MXN mensuales · cotización personalizada',
    priceLabel: '',
    includesLabel: '',
    benefits: [
      'Campañas personalizadas.',
      'Landing page avanzada.',
      'Producción de contenido y videos.',
      'Integración con eventos y recorridos.',
      'Varias sucursales y promociones.',
      'Presencia premium y campañas dirigidas.',
      'Métricas.',
      'Integraciones especiales.',
    ],
    idealTitle: 'Ideal para Aliado',
    idealFor: 'Hoteles, operadores turísticos, inmobiliarias, agencias, marcas regionales, instituciones y empresas con múltiples sucursales.',
  },
] as const

export const CONTACT_EMAIL = 'montealbancode@gmail.com'

export const commercialPlans = [
  {
    id: 'presencia',
    name: 'PRESENCIA',
    price: '$300 MXN',
    billing: 'por mes',
    tone: 'anil',
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
    idealFor: 'Pequeños negocios, cafeterías, tiendas, talleres y servicios locales.',
  },
  {
    id: 'impulso',
    name: 'IMPULSO',
    price: '$500 MXN',
    billing: 'por mes',
    tone: 'naranja',
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
    idealFor: 'Restaurantes, cafeterías, comercios, servicios turísticos y negocios que buscan visibilidad.',
  },
  {
    id: 'destacado',
    name: 'DESTACADO',
    price: '$900 MXN',
    billing: 'por mes',
    tone: 'grana',
    includesLabel: 'Todo Impulso, más',
    benefits: [
      'Posición destacada y tarjeta premium.',
      'Promoción periódica.',
      'Contenido para redes.',
      'Video corto estilo TikTok o Reel.',
      'Métricas básicas.',
      'Campañas o recomendaciones dentro de la app.',
      'Prioridad en categorías.',
      'Vinculación con eventos o lugares cercanos.',
    ],
    idealFor: 'Restaurantes consolidados, hoteles, recorridos, servicios turísticos y empresas locales con mayor interés comercial.',
  },
  {
    id: 'aliado',
    name: 'ALIADO',
    price: 'Desde $1,500 MXN',
    billing: 'por mes · cotización personalizada',
    tone: 'maguey',
    includesLabel: 'Una colaboración a la medida',
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
    idealFor: 'Hoteles, operadores turísticos, inmobiliarias, agencias, marcas regionales, instituciones y empresas con múltiples sucursales.',
  },
] as const

export function contactMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

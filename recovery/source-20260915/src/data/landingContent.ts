import { safeCampaignParameters } from './campaign'
import { productScreens, tripOptionsScreen } from './productScreens'

export const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=mx.oaxaca.rutasoaxaca'

export function withCampaignParameters(url: string) {
  if (typeof window === 'undefined') return url

  const destination = new URL(url)
  for (const [key, value] of Object.entries(safeCampaignParameters(window.location.search))) {
    destination.searchParams.set(key, value)
  }

  return destination.toString()
}

export const howItWorks = [
  { step: '01', icon: 'search', title: 'Busca tu destino', description: 'Escribe a dónde vas o elige el punto directamente en el mapa.', screen: productScreens[3] },
  { step: '02', icon: 'route', title: 'Elige una opción', description: 'Compara viaje directo, transbordo o caminata antes de salir.', screen: tripOptionsScreen },
  { step: '03', icon: 'near_me', title: 'Conoce tu ruta', description: 'Consulta el origen, el destino y las paradas de cada recorrido.', screen: productScreens[1] },
] as const
export const features = [
  { icon: 'route', title: 'Rutas con trabajo de campo', description: 'Cada parada fue capturada a pie, verificando el recorrido real del camión.', screen: productScreens[1] },
  { icon: 'multiple_stop', title: 'Directa, transbordo o caminando', description: '«Planea tu viaje» compara las opciones para llegar a tu destino.', screen: tripOptionsScreen },
  { icon: 'near_me', title: 'Paradas cerca de ti', description: 'Desde Cerca puedes consultar paradas y recorridos cercanos, con su dirección y sentido.', screen: productScreens[0] },
  { icon: 'theater_comedy', title: 'Eventos y cultura', description: 'Consulta la agenda de Oaxaca y revisa cómo llegar a cada evento.', screen: productScreens[2] },
  { icon: 'signal_wifi_off', title: 'Rutas disponibles sin internet', description: 'Consulta el catálogo de rutas y paradas guardado en tu teléfono aunque no tengas señal.', screen: productScreens[1] },
] as const

export type ProductScreen = { id: string; label: string; src: string; alt: string; width: number; height: number }
const screen = (id: string, label: string, alt: string, width: number, height: number): ProductScreen => ({ id, label, alt, width, height, src: `/assets/polish-202609/${id}-640.webp` })
export const productScreens = [
  screen('home', 'Inicio', 'Inicio real de YuuBus con accesos a Cerca, Viaje, Rutas y la agenda de Oaxaca', 1179, 2556),
  screen('routes', 'Rutas', 'Catálogo real de YuuBus con tarjeta de RA02, origen, destino y paradas', 1206, 2622),
  screen('events', 'Eventos', 'Agenda real de Oaxaca en YuuBus con el evento de Inspector', 1206, 2622),
  screen('trip', 'Viaje', 'Planificador real de YuuBus con Alameda de León como destino de Inspector', 1179, 2556),
] as const
export const tripOptionsScreen = screen('options', 'Opciones', 'Opciones reales de viaje hacia Alameda de León, ordenadas por duración estimada', 1179, 2556)

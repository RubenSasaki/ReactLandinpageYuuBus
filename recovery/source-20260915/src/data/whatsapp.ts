// Business number explicitly confirmed by Rubén on 2026-09-15.
export const WHATSAPP_NUMBER = '529711462985'
export type ContactIntent = 'advertise' | 'business' | 'collaborate' | 'general'
export const contactMessages: Record<ContactIntent, string> = {
  advertise: 'Hola, quiero información para anunciar mi negocio en YuuBus.',
  business: 'Hola, quiero información sobre la presencia de negocios en YuuBus.',
  collaborate: 'Hola, me interesa colaborar con YuuBus.',
  general: 'Hola, quiero información sobre YuuBus.',
}
export function whatsappLink(intent: ContactIntent) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessages[intent])}`
}

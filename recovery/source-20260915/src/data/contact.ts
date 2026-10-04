import { contactMailto } from './siteContent'
import { contactMessages, whatsappLink, type ContactIntent } from './whatsapp'
export type { ContactIntent } from './whatsapp'
export function contactLinks(intent: ContactIntent) {
  return {
    whatsapp: whatsappLink(intent),
    email: contactMailto(contactMessages[intent], contactMessages[intent]),
  }
}

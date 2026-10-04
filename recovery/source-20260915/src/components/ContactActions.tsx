import { contactLinks, type ContactIntent } from '../data/contact'
import { trackContact } from '../lib/analytics'

export function ContactActions({ intent = 'general', placement, compact = false }: { intent?: ContactIntent; placement: string; compact?: boolean }) {
  const links = contactLinks(intent)
  return <div className={`contact-actions${compact ? ' contact-actions--compact' : ''}`}>
    <a className="contact-whatsapp" href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackContact(intent, placement, 'whatsapp')}>Hablemos por WhatsApp <span aria-hidden="true">↗</span></a>
    <a className="contact-email" href={links.email} onClick={() => trackContact(intent, placement, 'email')}>Prefiero escribir por correo <span aria-hidden="true">↗</span></a>
  </div>
}

export const CONTACT_EMAIL = 'montealbancode@gmail.com'

export const commercialPlans = [
  { id: 'presencia', name: 'PRESENCIA', price: '$300 MXN / mes', tone: 'anil' },
  { id: 'impulso', name: 'IMPULSO', price: '$500 MXN / mes', tone: 'naranja' },
  { id: 'destacado', name: 'DESTACADO', price: '$900 MXN / mes', tone: 'grana' },
  { id: 'aliado', name: 'ALIADO', price: 'Desde $1,500 MXN / mes', tone: 'maguey' },
] as const

export function contactMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

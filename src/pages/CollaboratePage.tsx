import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { contactMailto } from '../data/siteContent'
import { usePageMetadata } from '../hooks/usePageMetadata'

const collaborationWays = [
  ['Reportar información', 'Comparte datos que puedan ayudar a revisar una parada, un recorrido o una referencia.'],
  ['Validar rutas', 'Apoya con observaciones de campo para contrastar la información disponible.'],
  ['Informar cambios', 'Avísanos cuando una ruta, parada o recorrido haya cambiado.'],
  ['Colaborar con datos', 'Contribuye con información verificable y respetuosa de los derechos de terceros.'],
  ['Desarrollo y diseño', 'Cuando corresponda, puedes manifestar interés en apoyar mejoras técnicas o visuales.'],
] as const

export function CollaboratePage() {
  usePageMetadata({
    title: 'Colabora con YuuBus | Movilidad en Oaxaca',
    description: 'Conoce formas de colaborar con información, validación de rutas, datos, desarrollo o diseño para mejorar YuuBus.',
    path: '/colabora',
  })

  return (
    <div className="content-page">
      <PageHeader />
      <main>
        <section className="content-hero" aria-labelledby="collaborate-title">
          <p className="section-tag">Comunidad Yuu Bus</p>
          <h1 id="collaborate-title">Ayúdanos a mejorar la información para moverse por Oaxaca.</h1>
          <p>La colaboración comunitaria puede ayudar a detectar cambios y mantener información más clara.</p>
        </section>

        <section className="collaboration-grid" aria-label="Formas de colaborar">
          {collaborationWays.map(([title, description]) => (
            <article className="collaboration-card" key={title}>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="content-action" aria-labelledby="collaborate-action-title">
          <h2 id="collaborate-action-title">¿Te interesa participar?</h2>
          <p>Estas opciones no constituyen una oferta de empleo ni una promesa de pago.</p>
          <a
            href={contactMailto(
              'Quiero colaborar con Yuu Bus',
              'Hola, quiero colaborar con Yuu Bus. Esta es la forma en la que me gustaría apoyar:',
            )}
          >
            Quiero colaborar
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

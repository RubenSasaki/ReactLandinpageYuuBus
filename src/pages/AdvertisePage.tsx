import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { SponsorPlans } from '../components/SponsorPlans'
import { usePageMetadata } from '../hooks/usePageMetadata'

const opportunities = [
  'Presencia dentro de Yuu Bus.',
  'Ubicación de tu negocio.',
  'Información para saber cómo llegar.',
  'Promociones y contenido destacado, según el plan.',
  'Métricas disponibles según el plan contratado.',
]

export function AdvertisePage() {
  usePageMetadata({
    title: 'Anúnciate en YuuBus | Negocios de Oaxaca',
    description: 'Conoce los planes para mostrar tu negocio en YuuBus y ayudar a que más personas sepan cómo llegar.',
    path: '/anunciate',
  })

  return (
    <div className="content-page">
      <PageHeader />
      <main>
        <section className="content-hero" aria-labelledby="advertise-title">
          <p className="section-tag">Negocios y patrocinadores</p>
          <h1 id="advertise-title">Haz que más personas descubran tu negocio y sepan cómo llegar.</h1>
          <p>
            Yuu Bus puede conectar la presencia de tu negocio con información útil de movilidad para las personas que se desplazan por Oaxaca.
          </p>
        </section>

        <section className="content-panel" aria-labelledby="advertise-options-title">
          <h2 id="advertise-options-title">Opciones de presencia</h2>
          <ul className="content-checklist">
            {opportunities.map((opportunity) => <li key={opportunity}>{opportunity}</li>)}
          </ul>
        </section>

        <SponsorPlans />
      </main>
      <Footer />
    </div>
  )
}

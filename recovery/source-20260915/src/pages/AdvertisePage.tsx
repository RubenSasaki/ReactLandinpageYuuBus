import { ContactActions } from '../components/ContactActions'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { SponsorPlans } from '../components/SponsorPlans'
import { ResponsiveScreenshot } from '../components/ResponsiveScreenshot'
import { productScreens } from '../data/productScreens'
import { usePageMetadata } from '../hooks/usePageMetadata'

export function AdvertisePage() {
  usePageMetadata({ title: 'Anúnciate en YuuBus | Negocios de Oaxaca', description: 'Dale presencia a tu negocio en YuuBus. Conoce los planes y contáctanos por WhatsApp para que más personas sepan dónde estás y cómo llegar.', path: '/anunciate' })
  return <div className="content-page commercial-page">
    <PageHeader />
    <main id="contenido">
      <section className="content-hero" aria-labelledby="advertise-title">
        <p className="section-tag">Tu negocio, más cerca</p>
        <h1 id="advertise-title">Haz que más personas descubran tu negocio y sepan cómo llegar.</h1>
        <p>YuuBus es la app para consultar transporte público y descubrir Oaxaca. Tu negocio puede estar presente cuando alguien busca un lugar al que ir.</p>
        <ContactActions intent="advertise" placement="advertise_hero" />
        <a className="commercial-text-link" href="#planes">Ver planes y precios ↓</a>
      </section>
      <section className="content-panel commercial-benefits" aria-labelledby="business-benefits-title">
        <h2 id="business-benefits-title">Que te conozcan. Que te encuentren. Que lleguen.</h2>
        <div className="commercial-benefit-grid">
          <article><span>01</span><h3>Cuenta qué ofreces</h3><p>Nombre, categoría, descripción y fotografías para que las personas conozcan tu negocio.</p></article>
          <article><span>02</span><h3>Facilita el contacto</h3><p>Ubicación, horarios, teléfono, WhatsApp y redes sociales, reunidos en tu perfil.</p></article>
          <article><span>03</span><h3>Ayuda a llegar</h3><p>Conecta tu ubicación con las opciones de transporte disponibles en YuuBus.</p></article>
        </div>
      </section>
      <section className="commercial-example" aria-labelledby="business-example-title">
        <div>
          <p className="section-tag">Del lugar al recorrido</p>
          <h2 id="business-example-title">Una dirección es útil. Saber cómo llegar, también.</h2>
          <p>La persona consulta un lugar, toca <strong>Cómo llegar</strong> y elige desde dónde salir. YuuBus le permite comparar las opciones de viaje disponibles.</p>
          <p>Así se ve el planificador real de la app, con Alameda de León como destino de un evento. Para tu negocio, revisamos contigo su ubicación y la información que aparecerá antes de publicarla.</p>
          <a className="commercial-text-link" href="#empezar">Cómo empezar ↓</a>
        </div>
        <figure><ResponsiveScreenshot screen={productScreens[3]} sizes="(max-width: 620px) 260px, 300px" /><figcaption>Captura real de «Planea tu viaje». Ejemplo de movilidad hacia un evento.</figcaption></figure>
      </section>
      <SponsorPlans />
      <section className="content-panel commercial-start" id="empezar" aria-labelledby="business-start-title">
        <p className="section-tag">Hablemos de tu negocio</p>
        <h2 id="business-start-title">Empieza con una conversación.</h2>
        <ol><li><strong>Escríbenos por WhatsApp.</strong> Cuéntanos qué tipo de negocio tienes.</li><li><strong>Revisamos juntos las opciones.</strong> Resolvemos dudas del plan y de la información de tu perfil.</li><li><strong>Confirma cómo aparecerás.</strong> Acordamos contigo los detalles antes de publicar.</li></ol>
        <ContactActions intent="advertise" placement="advertise_start" />
      </section>
    </main><Footer />
  </div>
}

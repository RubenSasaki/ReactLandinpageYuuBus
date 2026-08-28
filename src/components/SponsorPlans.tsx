import { commercialPlans, contactMailto } from '../data/siteContent'

export function SponsorPlans() {
  return (
    <section className="sponsor-section" id="planes" aria-labelledby="sponsor-title">
      <div className="sponsor-shell">
        <header className="sponsor-heading">
          <p className="section-tag">Planes actuales</p>
          <h2 className="section-title" id="sponsor-title">Elige el nivel de presencia para tu negocio.</h2>
        </header>

        <div className="sponsor-grid">
          {commercialPlans.map((plan) => (
            <article className={`sponsor-card sponsor-card--${plan.tone}`} key={plan.id}>
              <div className="sponsor-card-header">
                <h3>{plan.name}</h3>
                <p className="sponsor-price">{plan.price}</p>
              </div>
            </article>
          ))}
        </div>
        <a
          className="sponsor-contact sponsor-contact--global"
          href={contactMailto(
            'Anunciar mi negocio en Yuu Bus',
            'Hola, quiero anunciar mi negocio en Yuu Bus. ¿Podrían compartirme información sobre los planes?',
          )}
        >
          <span className="material-symbols-rounded" aria-hidden="true">mail</span>
          Quiero anunciar mi negocio
        </a>
      </div>
    </section>
  )
}

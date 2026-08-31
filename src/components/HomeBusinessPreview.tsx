import { commercialPlans } from '../data/siteContent'
import { trackSiteEvent } from '../lib/analytics'

const benefits = [
  'Presencia dentro de YuuBus.',
  'Ubicación e información para saber cómo llegar.',
  'Promociones y métricas según el plan.',
] as const

export function HomeBusinessPreview() {
  return (
    <section className="business-preview" aria-labelledby="business-preview-title">
      <div className="business-preview-copy">
        <p className="section-tag">NEGOCIOS EN OAXACA</p>
        <h2 id="business-preview-title">¿Tienes un negocio en Oaxaca?</h2>
        <p>Haz que más personas lo descubran y sepan cómo llegar.</p>
        <ul>
          {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
        </ul>
        <a
          href="/anunciate/"
          onClick={() => trackSiteEvent('business_plans_preview_click', { placement: 'home' })}
        >
          Conoce los planes
          <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
      <div className="business-plan-preview" aria-label="Vista previa de planes">
        {commercialPlans.map((plan) => (
          <div className={`business-plan-pill business-plan-pill--${plan.tone}`} key={plan.id}>
            <strong>{plan.name}</strong>
            <span>{plan.price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

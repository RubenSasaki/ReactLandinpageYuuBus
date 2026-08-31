import { commercialPlans, contactMailto } from '../data/siteContent'
import { trackSiteEvent } from '../lib/analytics'
import { PlanCheckIcon, PlanMailIcon } from './PlanIcons'

export function SponsorPlans() {
  return (
    <section className="sponsor-section" id="planes" aria-labelledby="sponsor-title">
      <div className="sponsor-shell">
        <header className="sponsor-heading">
          <p className="section-tag">Planes actuales</p>
          <h2 className="section-title" id="sponsor-title">Elige el nivel de presencia para tu negocio.</h2>
        </header>

        <div className="sponsor-grid">
          {commercialPlans.map((plan, index) => {
            const planNumber = String(index + 1).padStart(2, '0')
            return (
              <article className={`sponsor-card sponsor-card--${plan.tone}`} key={plan.id}>
                <div className="sponsor-card-header">
                  <span className="sponsor-plan-chip">PLAN {planNumber}</span>
                  <h3>{plan.name}</h3>
                  <p className="sponsor-price">{plan.price}</p>
                  <span className="sponsor-billing">{plan.billing}</span>
                </div>

                <div className="sponsor-card-body">
                  <strong className="sponsor-includes">{plan.includesLabel}</strong>
                  <ul className="sponsor-benefits">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit}>
                        <PlanCheckIcon className="plan-inline-icon plan-inline-icon--check" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sponsor-ideal">
                  <strong>Ideal para</strong>
                  <p>{plan.idealFor}</p>
                </div>

                <a
                  className="sponsor-contact"
                  href={contactMailto(
                    `Plan ${plan.name} de Yuu Bus`,
                    `Hola, me interesa el plan ${plan.name.charAt(0)}${plan.name.slice(1).toLowerCase()} de Yuu Bus.`,
                  )}
                  onClick={() => trackSiteEvent('business_plan_selected', { plan: plan.id, placement: 'anunciate' })}
                >
                  <PlanMailIcon className="plan-inline-icon plan-inline-icon--mail" />
                  Quiero este plan
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { SPONSOR_CONTACT_EMAIL, sponsorPlans } from '../data/landingContent'

function buildMailto(planName: string) {
  if (!SPONSOR_CONTACT_EMAIL) return undefined

  const subject = encodeURIComponent(`Información sobre ${planName}`)
  const body = encodeURIComponent(
    `Hola, me interesa conocer más sobre ${planName} de Yuu Bus. ¿Podrían compartirme información para continuar?`,
  )

  return `mailto:${SPONSOR_CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export function SponsorPlans() {
  return (
    <section className="sponsor-section" id="planes" aria-labelledby="sponsor-title">
      <div className="sponsor-shell">
        <header className="sponsor-heading">
          <p className="section-tag">PATROCINIOS</p>
          <h2 className="section-title" id="sponsor-title">Planes de patrocinio</h2>
        </header>

        <div className="sponsor-grid">
          {sponsorPlans.map((plan) => {
            const mailto = buildMailto(plan.name)

            return (
              <article className={`sponsor-card sponsor-card--${plan.tone}`} key={plan.id}>
                <div className="sponsor-card-header">
                  <div className="sponsor-card-meta">
                    <span className="sponsor-plan-chip">PLAN {plan.id}</span>
                    {plan.priceLabel ? <span className="sponsor-price-label">{plan.priceLabel}</span> : null}
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="sponsor-price">{plan.price}</p>
                </div>

                <div className="sponsor-card-body">
                  {plan.includesLabel ? (
                    <strong className="sponsor-includes">{plan.includesLabel}</strong>
                  ) : null}
                  <ul className="sponsor-benefits">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit}>
                        <span className="material-symbols-rounded" aria-hidden="true">check_circle</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sponsor-ideal">
                  <strong>{plan.idealTitle}</strong>
                  <p>{plan.idealFor}</p>
                </div>

                {mailto ? (
                  <a className="sponsor-contact" href={mailto}>
                    <span className="material-symbols-rounded" aria-hidden="true">mail</span>
                    Solicitar información
                  </a>
                ) : (
                  <button
                    className="sponsor-contact"
                    type="button"
                    disabled
                    title="Falta configurar el correo de contacto"
                  >
                    <span className="material-symbols-rounded" aria-hidden="true">mail</span>
                    Solicitar información
                  </button>
                )}
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

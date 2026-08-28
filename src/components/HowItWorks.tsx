import { howItWorks } from '../data/landingContent'

export function HowItWorks() {
  return (
    <section className="how-section" id="rutas" aria-labelledby="how-title">
      <header className="section-heading">
        <p className="section-tag">Cómo funciona</p>
        <h2 className="section-title" id="how-title">De tu destino a una ruta, en tres pasos.</h2>
      </header>

      <div className="how-grid">
        {howItWorks.map((item) => (
          <article className="how-card" key={item.step}>
            <div className="how-screen">
              <img
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
            </div>
            <div className="how-copy">
              <span className="how-step">{item.step}</span>
              <span className="material-symbols-rounded" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const destinations = [
  { icon: 'festival', label: 'Evento' },
  { icon: 'storefront', label: 'Negocio local' },
  { icon: 'location_on', label: 'Lugar' },
] as const

export function DiscoverySection() {
  return (
    <section className="discovery-section" id="oaxaca" aria-labelledby="discovery-title">
      <div className="discovery-copy">
        <p className="section-tag">Movilidad + descubrimiento</p>
        <h2 className="section-title" id="discovery-title">
          No solamente te mostramos qué existe en Oaxaca. <span>También te mostramos cómo llegar.</span>
        </h2>
        <p>
          Descubre cultura, lugares y comercio local sin perder de vista lo más importante: la ruta para llegar.
        </p>
        <div className="discovery-paths" aria-label="De un destino a su ruta">
          {destinations.map((destination) => (
            <div className="discovery-path" key={destination.label}>
              <span className="material-symbols-rounded" aria-hidden="true">{destination.icon}</span>
              <strong>{destination.label}</strong>
              <span className="material-symbols-rounded discovery-arrow" aria-hidden="true">arrow_forward</span>
              <span>cómo llegar</span>
            </div>
          ))}
        </div>
      </div>
      <figure className="discovery-screen">
        <img
          src="/assets/screens/eventos.webp"
          alt="Agenda cultural de Oaxaca con rutas para llegar a los eventos"
          width="944"
          height="2048"
          loading="lazy"
        />
        <figcaption>Eventos y cultura conectados con movilidad.</figcaption>
      </figure>
    </section>
  )
}

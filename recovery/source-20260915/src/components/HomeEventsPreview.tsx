import { useEffect, useState } from 'react'
type EventPreview = { id: string; slug: string; title: string; venue: string; image: string | null; imageAlt: string; startDate: string }
export function HomeEventsPreview() {
  const [events, setEvents] = useState<EventPreview[]>([])
  useEffect(() => {
    const controller = new AbortController()
    void fetch('/events-preview.json', { signal: controller.signal }).then(r => { if (!r.ok) throw new Error(); return r.json() }).then(data => {
      if (!Array.isArray(data.events)) return
      setEvents(data.events.filter((e: EventPreview) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug) && typeof e.title === 'string').slice(0, 3))
    }).catch(() => { /* The agenda link stays available without the optional preview. */ })
    return () => controller.abort()
  }, [])
  return <section className="home-events section" aria-labelledby="home-events-title">
    <header className="section-heading"><p className="section-tag">AGENDA DE OAXACA</p><h2 className="section-title" id="home-events-title">Un plan para salir.<br />Una ruta para llegar.</h2><p>Consulta el evento, ubica el recinto y planea tu viaje con YuuBus.</p></header>
    <div className="event-grid">{events.map(event => <article className="event-card" key={event.id}><a href={`/eventos/${event.slug}/`}>
      {event.image && <img src={event.image} alt={event.imageAlt} width="600" height="450" loading="lazy" referrerPolicy="no-referrer" />}
      <div><p className="section-tag">{new Intl.DateTimeFormat('es-MX', {day:'numeric',month:'long',timeZone:'America/Mexico_City'}).format(new Date(`${event.startDate}T12:00:00-06:00`))}</p><h3>{event.title}</h3><p>{event.venue}</p><strong>Ver evento y cómo llegar →</strong></div>
    </a></article>)}</div><a className="event-secondary" href="/eventos/">Ver toda la agenda →</a>
  </section>
}

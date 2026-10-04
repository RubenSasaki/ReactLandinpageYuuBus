import { useEffect, useState, type CSSProperties } from 'react'
import { trackSiteEvent } from '../lib/analytics'

type RoutePreview = {
  id: string
  slug: string
  name: string
  origin: string
  destination: string
  stopCount: number
  color: string
}

export function HomeRoutesPreview() {
  const [routes, setRoutes] = useState<RoutePreview[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/routes-preview.json', { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<RoutePreview[]> : [])
      .then((items) => setRoutes(items.slice(0, 4)))
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  if (routes.length === 0) return null

  return (
    <section className="routes-preview" aria-labelledby="routes-preview-title">
      <header>
        <p className="section-tag">RED YUUBUS</p>
        <h2 id="routes-preview-title">Explora rutas</h2>
        <p>Consulta recorridos y paradas registradas para moverte por Oaxaca.</p>
      </header>
      <div className="routes-preview-grid">
        {routes.map((route) => (
          <a
            className="route-preview-card"
            href={`/rutas/${route.slug}/`}
            key={route.id}
            style={{ '--route-color': route.color } as CSSProperties}
            onClick={() => trackSiteEvent('routes_preview_click', { route_id: route.id, placement: 'home' })}
          >
            <span className="route-preview-code">{route.id}</span>
            <strong>{route.origin} → {route.destination}</strong>
            <span>{route.stopCount} paradas registradas</span>
          </a>
        ))}
      </div>
      <a
        className="routes-preview-cta"
        href="/rutas/"
        onClick={() => trackSiteEvent('routes_preview_click', { route_id: 'all', placement: 'home' })}
      >
        Ver todas las rutas
        <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
      </a>
    </section>
  )
}

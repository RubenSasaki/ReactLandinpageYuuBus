import { routeStats } from '../data/routeStats.generated'

const stats = [
  { value: routeStats.routes.toLocaleString('es-MX'), label: 'Rutas disponibles' },
  { value: routeStats.stops.toLocaleString('es-MX'), label: 'Paradas registradas' },
] as const

export function Stats() {
  return (
    <div className="stats" aria-label="Cobertura actual de Yuu Bus">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <div className="stat-num">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
      <p className="stats-trust">
        <span className="material-symbols-rounded" aria-hidden="true">route</span>
        Hecho para moverse por Oaxaca.
      </p>
    </div>
  )
}

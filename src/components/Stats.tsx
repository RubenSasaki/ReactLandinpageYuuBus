import { stats } from '../data/landingContent'

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

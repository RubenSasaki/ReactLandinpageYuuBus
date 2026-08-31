import { SecondaryNavigation } from './SecondaryNavigation'

export function PageHeader() {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <a className="page-brand" href="/" aria-label="Yuu Bus — inicio">
          <img src="/yuubus-icon-192.png" alt="" width="192" height="192" />
          <span>Yuu Bus</span>
        </a>
        <nav className="page-header-links" aria-label="Navegación principal">
          <a className="page-header-primary" href="/rutas/">Rutas</a>
          <a className="page-header-primary" href="/anunciate/">Anúnciate</a>
          <SecondaryNavigation />
          <a className="page-home-link" href="/">Inicio</a>
        </nav>
      </div>
    </header>
  )
}

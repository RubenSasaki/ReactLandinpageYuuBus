import { GOOGLE_PLAY_URL } from '../data/landingContent'

export function Header() {
  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <a className="nav-logo" href="#inicio" aria-label="Yuu Bus: Rutas Oaxaca — inicio">
          <span className="nav-logo-icon nav-logo-icon--official" aria-hidden="true">
            <img src="/yuubus-icon.png" alt="" width="600" height="600" />
          </span>
          <span className="nav-logo-text">Yuu Bus</span>
        </a>

        <div className="nav-actions">
          <a className="nav-link" href="#features">
            Características
          </a>
          <a className="nav-link" href="#planes">
            Planes
          </a>
          <a
            className="nav-link nav-download"
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar Yuu Bus en Google Play"
          >
            Descargar
          </a>
        </div>
      </div>
    </nav>
  )
}

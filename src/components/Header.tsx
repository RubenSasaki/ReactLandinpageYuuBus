import { useEffect } from 'react'
import { GOOGLE_PLAY_URL, withCampaignParameters } from '../data/landingContent'
import { trackConversion } from '../lib/analytics'

export function Header() {
  useEffect(() => {
    const updateHeader = () => document.body.classList.toggle('is-scrolled', window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      document.body.classList.remove('is-scrolled')
    }
  }, [])

  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <a className="nav-logo" href="#inicio" aria-label="Yuu Bus: Rutas Oaxaca — inicio">
          <span className="nav-logo-icon nav-logo-icon--official" aria-hidden="true">
            <img src="/yuubus-icon-192.png" alt="" width="192" height="192" />
          </span>
          <span className="nav-logo-text">Yuu Bus</span>
        </a>

        <div className="nav-actions">
          <a className="nav-link" href="#rutas">
            Rutas
          </a>
          <a className="nav-link" href="#features">
            Características
          </a>
          <a className="nav-link" href="#oaxaca">
            Oaxaca
          </a>
          <a className="nav-link" href="/privacy/">
            Privacidad
          </a>
          <a
            className="nav-link nav-download"
            href={withCampaignParameters(GOOGLE_PLAY_URL)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar Yuu Bus en Google Play"
            onClick={() => trackConversion('download_click', { platform: 'android', placement: 'navbar' })}
          >
            Descargar
          </a>
        </div>
      </div>
    </nav>
  )
}

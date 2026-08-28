import type { CSSProperties } from 'react'
import { GOOGLE_PLAY_URL, withCampaignParameters } from '../data/landingContent'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { trackConversion } from '../lib/analytics'
import { AppShowcase } from './AppShowcase'

export function Hero() {
  const { tilt, onPointerMove, onPointerLeave } = usePointerTilt(3)
  const downloadUrl = withCampaignParameters(GOOGLE_PLAY_URL)

  return (
    <section className="hero" id="inicio">
      <div className="hero-depth" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="material-symbols-rounded" aria-hidden="true">android</span>
            Disponible para Android
          </div>
          <h1 className="hero-title">
            Encuentra rutas de transporte público en <span>Oaxaca.</span>
          </h1>
          <p className="hero-sub">
            Busca tu destino, consulta recorridos y descubre cómo llegar en Citibús,
            microbuses y colectivos de Oaxaca de Juárez.
          </p>
          <div className="btns" id="download">
            <a
              className="btn-download btn-android"
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('download_click', { platform: 'android', placement: 'hero' })}
            >
              <span className="material-symbols-rounded btn-icon" aria-hidden="true">android</span>
              <span className="btn-label"><small>Disponible en</small><strong>Google Play</strong></span>
            </a>
            <a
              className="btn-download btn-secondary"
              href="#rutas"
              onClick={() => trackConversion('explore_routes_click', { platform: 'web', placement: 'hero' })}
            >
              <span className="material-symbols-rounded btn-icon" aria-hidden="true">route</span>
              <span className="btn-label"><strong>Explorar rutas</strong></span>
            </a>
          </div>
          <p className="hero-availability">Próximamente en App Store.</p>
          <div
            className="qr-section"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
              '--qr-rotate-x': `${tilt.x}deg`,
              '--qr-rotate-y': `${tilt.y}deg`,
            } as CSSProperties}
          >
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Yuu Bus: Rutas Oaxaca en Google Play"
              onClick={() => trackConversion('download_click', { platform: 'android', placement: 'hero_qr' })}
            >
              <img className="qr-image" src="/qr-code.png" alt="QR para descargar Yuu Bus: Rutas Oaxaca en Google Play" width="104" height="104" />
            </a>
            <div className="qr-label">
              <strong>Escanea para descargar</strong>
              <p>Abre Yuu Bus en Google Play.</p>
            </div>
          </div>
        </div>
        <AppShowcase />
      </div>
    </section>
  )
}

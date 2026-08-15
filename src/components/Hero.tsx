import type { CSSProperties } from 'react'
import { GOOGLE_PLAY_URL } from '../data/landingContent'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { AppShowcase } from './AppShowcase'

export function Hero() {
  const { tilt, onPointerMove, onPointerLeave } = usePointerTilt(3)

  return (
    <section className="hero" id="inicio">
      <div className="hero-depth" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="material-symbols-rounded" aria-hidden="true">celebration</span>
            Disponible para Android
          </div>
          <h1 className="hero-title">
            El transporte<br />de <span>Oaxaca</span>,<br />en tu mano.
          </h1>
          <p className="hero-sub">
            Consulta rutas de Citibús, microbuses y colectivos en Oaxaca de Juárez.
            Encuentra paradas cercanas, planea tu viaje y muévete con más claridad.
          </p>
          <div className="btns" id="download">
            <a className="btn-download btn-android" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-rounded btn-icon" aria-hidden="true">android</span>
              <span className="btn-label"><small>Descargar en</small><strong>Google Play</strong></span>
            </a>
            <button className="btn-download btn-ios" type="button" disabled aria-disabled="true">
              <span className="material-symbols-rounded btn-icon" aria-hidden="true">phone_iphone</span>
              <span className="btn-label"><small>Próximamente en</small><strong>App Store</strong></span>
            </button>
          </div>
          <div
            className="qr-section"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
              '--qr-rotate-x': `${tilt.x}deg`,
              '--qr-rotate-y': `${tilt.y}deg`,
            } as CSSProperties}
          >
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir Yuu Bus: Rutas Oaxaca en Google Play">
              <img className="qr-image" src="/qr-code.png" alt="QR para descargar Yuu Bus: Rutas Oaxaca en Google Play" width="104" height="104" />
            </a>
            <div className="qr-label">
              <strong>Escanea para descargar</strong>
              <p>Apunta la cámara de tu teléfono y descarga Yuu Bus directo desde Google Play.</p>
            </div>
          </div>
        </div>
        <AppShowcase />
      </div>
    </section>
  )
}

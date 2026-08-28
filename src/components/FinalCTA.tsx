import type { CSSProperties } from 'react'
import { GOOGLE_PLAY_URL, withCampaignParameters } from '../data/landingContent'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { trackConversion } from '../lib/analytics'

export function FinalCTA() {
  const { tilt, onPointerMove, onPointerLeave } = usePointerTilt(2.4)
  const downloadUrl = withCampaignParameters(GOOGLE_PLAY_URL)

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta-copy">
        <p className="section-tag">Yuu Bus: Rutas Oaxaca</p>
        <h2 id="final-cta-title">Tu siguiente ruta empieza aquí.</h2>
        <p>Consulta rutas, paradas y recorridos de transporte público desde tu teléfono.</p>
        <a
          className="btn-download btn-android final-download"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion('download_click', { platform: 'android', placement: 'final_cta' })}
        >
          <span className="material-symbols-rounded btn-icon" aria-hidden="true">android</span>
          <span className="btn-label"><small>Disponible en</small><strong>Google Play</strong></span>
        </a>
        <small className="final-availability">Próximamente en App Store.</small>
      </div>
      <a
        className="final-qr"
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escanear o abrir Yuu Bus en Google Play"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={() => trackConversion('download_click', { platform: 'android', placement: 'final_qr' })}
        style={{
          '--qr-rotate-x': `${tilt.x}deg`,
          '--qr-rotate-y': `${tilt.y}deg`,
        } as CSSProperties}
      >
        <img src="/qr-code.png" alt="QR de descarga de Yuu Bus en Google Play" width="180" height="180" loading="lazy" />
        <span>Escanea para descargar</span>
      </a>
    </section>
  )
}

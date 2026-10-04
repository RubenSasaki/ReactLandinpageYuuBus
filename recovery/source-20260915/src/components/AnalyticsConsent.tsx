import { useEffect, useState } from 'react'
import { getMeasurementConsent, setMeasurementConsent } from '../lib/analytics'

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(() => getMeasurementConsent() === null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const openPreferences = () => setVisible(true)
    window.addEventListener('yuubus:open-cookie-preferences', openPreferences)
    return () => window.removeEventListener('yuubus:open-cookie-preferences', openPreferences)
  }, [])

  if (!visible) return null

  const choose = (consent: 'granted' | 'denied') => {
    setMeasurementConsent(consent)
    setVisible(false)
  }

  return (
    <aside className="measurement-consent" aria-label="Preferencias de cookies">
      <div className="measurement-copy">
        <strong>Preferencias de cookies</strong>
        <p>
          Usamos cookies y tecnologías similares para medir el uso del sitio y mejorar nuestras campañas. Puedes aceptar o rechazar las cookies opcionales.
        </p>
        <div className="measurement-details" id="cookie-preference-details" hidden={!showDetails}>
          La medición opcional permite conocer visitas y clics de conversión, y evaluar campañas publicitarias con proveedores externos. Consulta el <a href="/privacy/">Aviso de Privacidad</a>.
        </div>
      </div>
      <div className="measurement-actions">
        <button className="measurement-accept" type="button" onClick={() => choose('granted')}>Aceptar</button>
        <button type="button" onClick={() => choose('denied')}>Rechazar</button>
        <button
          type="button"
          aria-expanded={showDetails}
          aria-controls="cookie-preference-details"
          onClick={() => setShowDetails((current) => !current)}
        >
          Configurar
        </button>
      </div>
    </aside>
  )
}

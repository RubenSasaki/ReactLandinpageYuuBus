import { useState } from 'react'
import { getMeasurementConsent, setMeasurementConsent } from '../lib/analytics'

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(() => getMeasurementConsent() === null)

  if (!visible) return null

  const choose = (consent: 'granted' | 'denied') => {
    setMeasurementConsent(consent)
    setVisible(false)
  }

  return (
    <aside className="measurement-consent" aria-label="Preferencias de medición">
      <div>
        <strong>Medición opcional</strong>
        <p>
          Podemos usar Meta Pixel para medir visitas y clics de descarga. Puedes continuar sin medición.
          {' '}<a href="/privacy/">Privacidad</a>
        </p>
      </div>
      <div className="measurement-actions">
        <button type="button" onClick={() => choose('denied')}>Sin medición</button>
        <button className="measurement-accept" type="button" onClick={() => choose('granted')}>Aceptar</button>
      </div>
    </aside>
  )
}

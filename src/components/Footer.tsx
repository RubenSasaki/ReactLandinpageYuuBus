import { CONTACT_EMAIL } from '../data/siteContent'
import { openCookiePreferences } from '../lib/analytics'

export function Footer() {
  return (
    <footer>
      <div className="footer-greca" aria-hidden="true" />
      <img className="footer-logo" src="/yuubus-icon-192.png" alt="Icono oficial de Yuu Bus" width="192" height="192" loading="lazy" />
      <strong className="footer-brand">Yuu Bus: Rutas Oaxaca</strong>
      <span className="footer-studio">Un producto de MonteCode</span>
      <strong className="footer-trust">Hecho para moverse por Oaxaca.</strong>
      <nav className="footer-links" aria-label="Enlaces del pie de página">
        <a href="/rutas/">Rutas</a>
        <a href="/anunciate/">Anúnciate</a>
        <a href="/colabora/">Colabora</a>
        <a href="/privacy/">Aviso de Privacidad</a>
        <a href="/terminos/">Términos y Condiciones</a>
      </nav>
      <p>
        Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México<br />
        App no oficial. Datos capturados por la comunidad.<br />
        Contacto: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <button className="footer-cookie-button" type="button" onClick={openCookiePreferences}>Preferencias de cookies</button>
    </footer>
  )
}

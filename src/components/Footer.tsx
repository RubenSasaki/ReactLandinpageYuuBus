import { SPONSOR_CONTACT_EMAIL } from '../data/landingContent'

export function Footer() {
  return (
    <footer>
      <img className="footer-logo" src="/yuubus-icon-192.png" alt="Icono oficial de Yuu Bus" width="192" height="192" loading="lazy" />
      <strong className="footer-brand">Yuu Bus: Rutas Oaxaca</strong>
      <span className="footer-studio">Un producto de MonteCode</span>
      <nav className="footer-links" aria-label="Enlaces del pie de página">
        <a href="#rutas">Rutas</a>
        <a href="#features">Características</a>
        <a href="#oaxaca">Oaxaca</a>
        <a href="/privacy/">Privacidad</a>
      </nav>
      <p>
        Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México<br />
        App no oficial. Datos capturados por la comunidad.<br />
        Contacto: <a href={`mailto:${SPONSOR_CONTACT_EMAIL}`}>{SPONSOR_CONTACT_EMAIL}</a>
      </p>
    </footer>
  )
}

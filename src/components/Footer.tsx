import { SPONSOR_CONTACT_EMAIL } from '../data/landingContent'

export function Footer() {
  return (
    <footer>
      <img className="footer-logo" src="/yuubus-icon.png" alt="Icono oficial de Yuu Bus" width="600" height="600" loading="lazy" />
      <strong className="footer-brand">Yuu Bus: Rutas Oaxaca</strong>
      <span className="footer-studio">Un producto de MonteCode</span>
      <p>
        Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México<br />
        App no oficial. Datos capturados por la comunidad.<br />
        Contacto: <a href={`mailto:${SPONSOR_CONTACT_EMAIL}`}>{SPONSOR_CONTACT_EMAIL}</a>
      </p>
    </footer>
  )
}

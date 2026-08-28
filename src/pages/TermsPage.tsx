import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { CONTACT_EMAIL } from '../data/siteContent'
import { usePageMetadata } from '../hooks/usePageMetadata'

export function TermsPage() {
  usePageMetadata({
    title: 'Términos y Condiciones | Yuu Bus: Rutas Oaxaca',
    description: 'Consulta los Términos y Condiciones de uso de Yuu Bus: Rutas Oaxaca.',
    path: '/terminos',
  })

  return (
    <div className="legal-page">
      <PageHeader />
      <header className="legal-hero">
        <div>
          <p className="privacy-eyebrow">Yuu Bus · MonteCode</p>
          <h1 id="terms-title">Términos y Condiciones</h1>
          <p>Condiciones generales para utilizar Yuu Bus: Rutas Oaxaca.</p>
          <span>Última actualización: 28 de agosto de 2026</span>
        </div>
      </header>

      <main className="legal-content" aria-labelledby="terms-title">
        <aside className="legal-review" role="note">
          <strong>REQUIERE DEFINICIÓN / REVISIÓN LEGAL:</strong> identidad legal completa del responsable, domicilio para notificaciones, legislación aplicable y jurisdicción competente.
        </aside>

        <h2>1. Objeto del servicio</h2>
        <p>Yuu Bus ofrece información de apoyo para consultar rutas, paradas, recorridos, opciones de viaje y contenido relacionado con la movilidad en Oaxaca. Es una aplicación comunitaria no oficial y no sustituye la información de las autoridades o de los operadores de transporte.</p>

        <h2>2. Uso permitido</h2>
        <p>El servicio debe utilizarse de forma lícita, personal y respetuosa. No está permitido interferir con su funcionamiento, intentar acceder sin autorización a sus sistemas ni utilizarlo para perjudicar a otras personas.</p>

        <h2>3. Disponibilidad de la información</h2>
        <p>Se procura mantener información útil y clara, pero no se garantiza que el servicio esté disponible sin interrupciones ni que todos los datos estén completos o actualizados en todo momento.</p>

        <h2>4. Rutas, horarios y datos sujetos a cambios</h2>
        <p>Las rutas, paradas, horarios, tarifas, tiempos y condiciones del transporte pueden cambiar sin aviso. Antes de viajar, cada persona debe considerar las condiciones actuales, indicaciones oficiales y su entorno.</p>

        <h2>5. Contenido y servicios de terceros</h2>
        <p>Yuu Bus puede mostrar mapas, enlaces, imágenes o información suministrada por terceros. Su disponibilidad y tratamiento se rigen también por las condiciones y políticas de esos proveedores.</p>

        <h2>6. Cuentas, cuando corresponda</h2>
        <p>Actualmente Yuu Bus no requiere una cuenta general para consultar rutas. Si en el futuro se habilitan cuentas, se informarán las condiciones aplicables antes de su uso.</p>

        <h2>7. Contribuciones de usuarios</h2>
        <p>Quien envíe reportes o datos debe procurar que sean veraces, pertinentes y que no vulneren derechos de terceros. Yuu Bus puede revisar, corregir o descartar contribuciones que no puedan verificarse.</p>
        <p><strong>REQUIERE DEFINICIÓN / REVISIÓN LEGAL:</strong> alcance de la autorización o licencia aplicable a contribuciones de usuarios.</p>

        <h2>8. Propiedad intelectual</h2>
        <p>La marca, identidad visual, software y materiales propios de Yuu Bus o MonteCode están protegidos por la normativa aplicable. Los contenidos de terceros conservan la titularidad y condiciones que correspondan.</p>

        <h2>9. Limitación razonable de responsabilidad</h2>
        <p>Yuu Bus es una herramienta informativa de apoyo. Dentro de los límites permitidos por la ley, Yuu Bus y sus colaboradores no son responsables por decisiones de viaje tomadas exclusivamente con base en la aplicación, interrupciones del servicio o cambios de transporte ajenos a su control.</p>

        <h2>10. Privacidad</h2>
        <p>El tratamiento de datos y el uso de cookies o tecnologías similares se explican en el <a href="/privacy/">Aviso de Privacidad</a>.</p>

        <h2>11. Modificaciones</h2>
        <p>Estos términos pueden actualizarse cuando cambien el servicio o los requisitos aplicables. La versión vigente mostrará su fecha de actualización.</p>

        <h2>12. Contacto</h2>
        <p>Para consultas sobre estos términos: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </main>
      <Footer />
    </div>
  )
}

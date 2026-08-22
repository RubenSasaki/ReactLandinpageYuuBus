import { useEffect } from 'react'

export function PrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Política de privacidad | Yuu Bus: Rutas Oaxaca'

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="privacy-header-inner">
          <p className="privacy-eyebrow">MonteCode · Código con raíz</p>
          <h1 id="privacy-title">Política de privacidad</h1>
          <p className="privacy-subtitle">
            Información sobre el tratamiento de datos en Yuu Bus: Rutas Oaxaca.
          </p>
          <div className="privacy-metadata">
            <span>Última actualización: 12 de junio de 2026</span>
            <span>Paquete: mx.oaxaca.rutasoaxaca</span>
          </div>
        </div>
      </header>

      <main className="privacy-content" aria-labelledby="privacy-title">
        <section className="privacy-summary">
          <strong>Resumen:</strong> Yuu Bus no requiere una cuenta y no vende información personal. La ubicación se solicita
          sólo cuando el usuario utiliza funciones que la necesitan y no se accede a ella en segundo plano.
        </section>

        <h2>1. Responsable y alcance</h2>
        <p>
          Esta política corresponde a la aplicación <strong>Yuu Bus: Rutas Oaxaca</strong>, desarrollada por{' '}
          <strong>MonteCode</strong>. Describe cómo la aplicación accede, utiliza, almacena y protege información al ofrecer
          mapas, rutas de transporte, paradas cercanas y eventos de Oaxaca.
        </p>

        <h2>2. Ubicación del dispositivo</h2>
        <p>
          La aplicación puede solicitar ubicación aproximada o precisa para mostrar la posición del usuario en el mapa,
          encontrar paradas cercanas, recomendar puntos de abordaje y seguir una ruta mientras la función está activa.
        </p>
        <ul>
          <li>El permiso es opcional y se solicita mediante el sistema operativo.</li>
          <li>La ubicación se utiliza mientras la aplicación está en uso.</li>
          <li>La aplicación no solicita acceso a la ubicación en segundo plano.</li>
          <li>MonteCode no opera un servidor que reciba o almacene el historial de ubicación del usuario.</li>
          <li>Si se rechaza el permiso, siguen disponibles las funciones que no requieren posicionamiento automático.</li>
        </ul>

        <h2>3. Información almacenada localmente</h2>
        <p>
          La aplicación guarda en el dispositivo preferencias como idioma, accesibilidad, tutoriales vistos, rutas o
          paradas favoritas y cachés necesarios para consultar rutas y eventos con mayor rapidez o sin conexión. Esta
          información no se usa para identificar personalmente al usuario y permanece en el dispositivo hasta que se
          borren los datos de la aplicación o se desinstale.
        </p>

        <h2>4. Servicios de terceros y conexión a internet</h2>
        <p>
          Para mostrar mapas, imágenes y contenido actualizado, la aplicación realiza solicitudes a servicios externos.
          Esos proveedores pueden recibir datos técnicos habituales de una conexión, como dirección IP, fecha y hora,
          agente de usuario y el recurso solicitado. En el caso de los mapas, el recurso solicitado identifica la zona
          geográfica que se está visualizando, la cual podría coincidir con la ubicación del usuario.
        </p>
        <p>Los servicios utilizados actualmente incluyen:</p>
        <ul>
          <li><a href="https://carto.com/privacy/" rel="noopener noreferrer">CARTO</a>, para mosaicos del mapa.</li>
          <li>
            <a
              href="https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            , para archivos públicos de eventos y actualizaciones.
          </li>
          <li>
            <a href="https://foundation.wikimedia.org/wiki/Policy:Privacy_policy" rel="noopener noreferrer">
              Wikimedia
            </a>
            , para algunas imágenes informativas.
          </li>
          <li>
            <a href="https://ko-fi.com/home/privacy" rel="noopener noreferrer">Ko-fi</a>, únicamente cuando el usuario
            decide abrir voluntariamente el enlace externo de apoyo.
          </li>
        </ul>
        <p>El tratamiento realizado directamente por esos servicios se rige por sus respectivas políticas de privacidad.</p>

        <h2>5. Datos que no solicitamos</h2>
        <ul>
          <li>No se requiere crear una cuenta ni proporcionar contraseña.</li>
          <li>No se solicitan nombre legal, correo, teléfono ni datos de pago.</li>
          <li>No se integran anuncios ni identificadores publicitarios.</li>
          <li>No se venden datos personales.</li>
          <li>No se usan datos personales para publicidad o perfilado.</li>
        </ul>

        <h2>6. Conservación y eliminación</h2>
        <p>
          MonteCode no mantiene una base de datos de cuentas o ubicaciones de los usuarios. Las preferencias y cachés
          locales pueden eliminarse desde los ajustes del dispositivo al borrar los datos de la aplicación, o al
          desinstalarla.
        </p>

        <h2>7. Seguridad</h2>
        <p>
          La aplicación limita los permisos a los necesarios para sus funciones y utiliza conexiones HTTPS para solicitar
          contenido remoto. Ningún método de transmisión o almacenamiento es infalible, pero se aplican medidas razonables
          para reducir el acceso o uso no autorizado.
        </p>

        <h2>8. Menores de edad</h2>
        <p>
          Yuu Bus es una herramienta general de movilidad y turismo. No está dirigida específicamente a menores de 13 años
          y no recopila intencionalmente información personal de niñas o niños.
        </p>

        <h2>9. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse cuando cambien las funciones, los proveedores o los requisitos legales. La fecha
          de la versión vigente se mostrará al inicio de esta página.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Para preguntas sobre privacidad o el funcionamiento de la aplicación:{' '}
          <a href="mailto:rubengioreyes@outlook.com">rubengioreyes@outlook.com</a>.
        </p>
      </main>

      <footer className="privacy-footer">
        © 2026 MonteCode. Yuu Bus es una aplicación comunitaria no oficial de movilidad y turismo de Oaxaca.
      </footer>
    </div>
  )
}

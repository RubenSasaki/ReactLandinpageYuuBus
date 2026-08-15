import { useEffect, useState } from 'react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-scrolled', scrolled)
    return () => document.body.classList.remove('is-scrolled')
  }, [scrolled])

  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <a className="nav-logo" href="#inicio" aria-label="Yuu Bus: Rutas Oaxaca — inicio">
          <span className="nav-logo-icon nav-logo-icon--official" aria-hidden="true">
            <img src="/yuubus-icon.png" alt="" width="600" height="600" />
          </span>
          <span className="nav-logo-text">Yuu Bus</span>
        </a>
        <div className="nav-actions">
          <a className="nav-link" href="#features">Características</a>
          <a className="nav-link" href="#planes">Planes</a>
          <a className="nav-link nav-download" href="#download">Descargar</a>
        </div>
      </div>
    </nav>
  )
}

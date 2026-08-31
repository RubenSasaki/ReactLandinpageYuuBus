import { useEffect, useState } from 'react'
import { GOOGLE_PLAY_URL, withCampaignParameters } from '../data/landingContent'
import { trackConversion } from '../lib/analytics'

export function Header() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const updateHeader = () => document.body.classList.toggle('is-scrolled', window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      document.body.classList.remove('is-scrolled')
    }
  }, [])

  useEffect(() => {
    const sections = ['inicio', 'rutas', 'features', 'oaxaca']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.15, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <a className="nav-logo" href="#inicio" aria-label="Yuu Bus: Rutas Oaxaca — inicio">
          <span className="nav-logo-icon nav-logo-icon--official" aria-hidden="true">
            <img src="/yuubus-icon-192.png" alt="" width="192" height="192" />
          </span>
          <span className="nav-logo-text">Yuu Bus</span>
        </a>

        <div className="nav-actions">
          <a className="nav-link" href="/rutas/">
            Rutas
          </a>
          <a className="nav-link" href="/anunciate/">
            Anúnciate
          </a>
          <a className={`nav-link nav-optional${activeSection === 'oaxaca' ? ' is-active' : ''}`} href="#oaxaca" aria-current={activeSection === 'oaxaca' ? 'location' : undefined}>
            Oaxaca
          </a>
          <a
            className="nav-link nav-download"
            href={withCampaignParameters(GOOGLE_PLAY_URL)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar Yuu Bus en Google Play"
            onClick={() => trackConversion('download_click', { platform: 'android', placement: 'navbar' })}
          >
            Descargar
          </a>
        </div>
      </div>
    </nav>
  )
}

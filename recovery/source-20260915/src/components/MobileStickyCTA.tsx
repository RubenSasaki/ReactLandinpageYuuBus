import { useEffect, useState } from 'react'
import { GOOGLE_PLAY_URL, withCampaignParameters } from '../data/landingContent'
import { trackConversion } from '../lib/analytics'

export function MobileStickyCTA() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [finalCtaVisible, setFinalCtaVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('#inicio')
    const finalCta = document.querySelector('.final-cta')
    if (!hero || !finalCta || !('IntersectionObserver' in window)) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    const finalObserver = new IntersectionObserver(
      ([entry]) => setFinalCtaVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )

    heroObserver.observe(hero)
    finalObserver.observe(finalCta)
    return () => {
      heroObserver.disconnect()
      finalObserver.disconnect()
    }
  }, [])

  const visible = !heroVisible && !finalCtaVisible

  return (
    <aside className={`mobile-sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <span className="mobile-sticky-mark material-symbols-rounded" aria-hidden="true">route</span>
      <span className="mobile-sticky-copy">
        <strong>Yuu Bus</strong>
        <small>Rutas Oaxaca</small>
      </span>
      <a
        href={withCampaignParameters(GOOGLE_PLAY_URL)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackConversion('download_click', { platform: 'android', placement: 'mobile_sticky' })}
      >
        Descargar
      </a>
    </aside>
  )
}

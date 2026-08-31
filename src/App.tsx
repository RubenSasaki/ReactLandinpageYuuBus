import { useEffect } from 'react'
import { AnalyticsConsent } from './components/AnalyticsConsent'
import { LandingPage } from './pages/LandingPage'
import { AdvertisePage } from './pages/AdvertisePage'
import { CollaboratePage } from './pages/CollaboratePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { initializeMetaPixel, openCookiePreferences, trackSiteEvent } from './lib/analytics'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const staticPage = document.body.dataset.yuubusStaticPage

  useEffect(() => {
    initializeMetaPixel()

    if (staticPage === 'routes') {
      trackSiteEvent('routes_page_view', { path: '/rutas/' })
    } else if (staticPage === 'route-detail') {
      trackSiteEvent('route_detail_view', {
        route_id: document.body.dataset.routeId ?? 'unknown',
      })
    }

    const handleStaticClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('[data-cookie-preferences]')) openCookiePreferences()
    }
    document.addEventListener('click', handleStaticClick)
    return () => document.removeEventListener('click', handleStaticClick)
  }, [staticPage])

  let page

  if (path === '/privacy') page = <PrivacyPage />
  else if (path === '/terminos') page = <TermsPage />
  else if (path === '/anunciate') page = <AdvertisePage />
  else if (path === '/colabora') page = <CollaboratePage />
  else page = <LandingPage />

  return (
    <>
      {staticPage ? null : page}
      <AnalyticsConsent />
    </>
  )
}

import { useEffect } from 'react'
import { AnalyticsConsent } from './components/AnalyticsConsent'
import { LandingPage } from './pages/LandingPage'
import { AdvertisePage } from './pages/AdvertisePage'
import { CollaboratePage } from './pages/CollaboratePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { initializeMetaPixel } from './lib/analytics'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  useEffect(() => initializeMetaPixel(), [])

  let page

  if (path === '/privacy') page = <PrivacyPage />
  else if (path === '/terminos') page = <TermsPage />
  else if (path === '/anunciate') page = <AdvertisePage />
  else if (path === '/colabora') page = <CollaboratePage />
  else page = <LandingPage />

  return (
    <>
      {page}
      <AnalyticsConsent />
    </>
  )
}

import { LandingPage } from './pages/LandingPage'
import { PrivacyPage } from './pages/PrivacyPage'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/privacy') return <PrivacyPage />
  return <LandingPage />
}

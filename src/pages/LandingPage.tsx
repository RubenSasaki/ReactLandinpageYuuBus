import { EventBanner } from '../components/EventBanner'
import { FeatureExplorer } from '../components/FeatureExplorer'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SponsorPlans } from '../components/SponsorPlans'
import { Stats } from '../components/Stats'

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeatureExplorer />
        <EventBanner />
        <SponsorPlans />
      </main>
      <Footer />
    </>
  )
}

import { useEffect } from 'react'
import { AnalyticsConsent } from '../components/AnalyticsConsent'
import { DiscoverySection } from '../components/DiscoverySection'
import { FeatureExplorer } from '../components/FeatureExplorer'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { MobileStickyCTA } from '../components/MobileStickyCTA'
import { ProblemSection } from '../components/ProblemSection'
import { RouteDivider } from '../components/BrandMotifs'
import { Stats } from '../components/Stats'
import { initializeMetaPixel } from '../lib/analytics'

export function LandingPage() {
  useEffect(() => initializeMetaPixel(), [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ProblemSection />
        <RouteDivider />
        <HowItWorks />
        <FeatureExplorer />
        <RouteDivider />
        <DiscoverySection />
        <FinalCTA />
      </main>
      <Footer />
      <AnalyticsConsent />
      <MobileStickyCTA />
    </>
  )
}

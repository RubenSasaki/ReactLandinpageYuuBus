import { HomeEventsPreview } from '../components/HomeEventsPreview'
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
import { HomeBusinessPreview } from '../components/HomeBusinessPreview'
import { HomeRoutesPreview } from '../components/HomeRoutesPreview'

export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a><Header />
      <main id="contenido">
        <Hero />
        <Stats />
        <ProblemSection />
        <RouteDivider />
        <HowItWorks />
        <FeatureExplorer />
        <RouteDivider />
        <DiscoverySection />
        <HomeEventsPreview />
        <HomeRoutesPreview />
        <FinalCTA />
        <HomeBusinessPreview />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}

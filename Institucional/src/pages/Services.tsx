import {
  ServicesCtaSection,
  ServicesFitSection,
  ServicesHeroSection,
  ServicesInfrastructureSection,
  ServicesRoadmapSection,
  ServicesSystemsSection,
} from '../components/sections/services/ServicesSections'

export default function Services() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesInfrastructureSection />
      <ServicesSystemsSection />
      <ServicesRoadmapSection />
      <ServicesFitSection />
      <ServicesCtaSection />
    </>
  )
}
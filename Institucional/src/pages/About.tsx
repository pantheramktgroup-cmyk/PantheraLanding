import {
  AboutCtaSection,
  AboutCultureSection,
  AboutHeroSection,
  AboutOperationsSection,
  AboutPrinciplesSection,
  AboutStorySection,
  AboutTeamSection,
} from '../components/sections/about/AboutSections'

export default function About() {
  return (
    <>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutPrinciplesSection />
      <AboutOperationsSection />
      <AboutTeamSection />
      <AboutCultureSection />
      <AboutCtaSection />
    </>
  )
}
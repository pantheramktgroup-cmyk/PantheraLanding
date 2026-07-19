import {
  HomeApexSection,
  HomeFinalCtaSection,
  HomeHeroSection,
  HomeManifestoSection,
  HomeResultsPreviewSection,
  HomeServicesPreviewSection,
} from '../components/sections/home/HomeSections'

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeManifestoSection />
      <HomeServicesPreviewSection />
      <HomeApexSection />
      <HomeResultsPreviewSection />
      <HomeFinalCtaSection />
    </>
  )
}
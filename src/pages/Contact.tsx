import {
  ContactChannelsSection,
  ContactClosingSection,
  ContactConsultSection,
  ContactFaqSection,
  ContactHeroSection,
} from '../components/sections/contact/ContactSections'

export default function Contact() {
  const showConsultSection = false

  return (
    <>
      <ContactHeroSection />
      <ContactChannelsSection />
      {showConsultSection && <ContactConsultSection />}
      <ContactFaqSection />
      <ContactClosingSection />
    </>
  )
}
import {
  ContactChannelsSection,
  ContactClosingSection,
  ContactConsultSection,
  ContactFaqSection,
  ContactHeroSection,
} from '../components/sections/contact/ContactSections'

export default function Contact() {
  return (
    <>
      <ContactHeroSection />
      <ContactChannelsSection />
      <ContactConsultSection />
      <ContactFaqSection />
      <ContactClosingSection />
    </>
  )
}
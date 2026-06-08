import { landingCopy } from '../../content/landingCopy'
import { scrollToBooking } from '../../lib/scrollToBooking'

const { footer } = landingCopy

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Panthera-Marketing-Group/61554106953726/',
    icon: (
      <path d="M15.5 8.5h-2.1c-.7 0-1 .34-1 1.08V11h3l-.38 3h-2.62v7h-3.1v-7H7v-3h2.3V9.22C9.3 6.68 10.82 5 13.1 5c1.1 0 2.05.08 2.4.12v3.38Z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pantheramktgroup/',
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.2" cy="7.8" r="0.8" />
      </>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@PantheraMktGroup',
    icon: (
      <>
        <rect x="4" y="7" width="16" height="10" rx="3" />
        <path d="M10.5 9.8v4.4L14.5 12l-4-2.2Z" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pantheramktgroup/?viewAsMember=true',
    icon: (
      <>
        <path d="M6.5 10h3v8h-3v-8Z" />
        <path d="M8 6.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z" />
        <path d="M11 10h2.9v1.08c.4-.64 1.28-1.28 2.62-1.28 2.08 0 3.48 1.36 3.48 4.28V18h-3v-3.58c0-1.12-.42-1.84-1.38-1.84-.78 0-1.22.52-1.42 1.02-.08.18-.1.44-.1.68V18H11v-8Z" />
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-panthera-deep border-t border-[rgba(245,245,245,0.06)]">
      <div className="container-panthera py-16 md:py-20">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <img
              src={footer.logo.src}
              alt={footer.logo.alt}
              className="h-5 w-auto brightness-0 invert opacity-60 mb-3"
              loading="lazy"
            />
            <p className="text-xs font-sans text-panthera-ash tracking-wide">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-sans text-panthera-ash hover:text-panthera-white transition-colors duration-200 tracking-wide uppercase"
                    onClick={
                      link.href === '#booking'
                        ? (e) => {
                            e.preventDefault()
                            scrollToBooking()
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(245,245,245,0.06)] mb-8" />

        {/* Legal + Social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-xs font-sans text-panthera-ash/40 shrink-0">
            {footer.copyright}
          </p>

          <div className="flex items-center gap-3" aria-label="Redes sociales">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.055] text-panthera-ash/35 hover:text-panthera-white/70 hover:border-white/[0.12] hover:bg-white/[0.025] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
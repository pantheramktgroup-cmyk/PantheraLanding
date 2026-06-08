import { landingCopy } from '../../content/landingCopy'
import { scrollToBooking } from '../../lib/scrollToBooking'

const { footer } = landingCopy

const iconStyle = {
  fill: 'none',
  stroke: 'currentColor',
}

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Panthera-Marketing-Group/61554106953726/',
    icon: (
      <path
        d="M14.2 8.3h-1.4c-.72 0-1.08.42-1.08 1.16V11h2.34l-.32 2.28h-2.02V19H9.18v-5.72H7.4V11h1.78V9.18C9.18 7.1 10.42 6 12.34 6c.84 0 1.48.06 1.86.12v2.18Z"
        style={iconStyle}
      />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pantheramktgroup/',
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="3.2" style={iconStyle} />
        <circle cx="12" cy="12" r="2.7" style={iconStyle} />
        <circle cx="15.7" cy="8.3" r="0.55" style={iconStyle} />
      </>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@PantheraMktGroup',
    icon: (
      <>
        <rect x="5" y="8" width="14" height="8" rx="2.4" style={iconStyle} />
        <path d="M11 10.3v3.4L14.1 12 11 10.3Z" style={iconStyle} />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pantheramktgroup/?viewAsMember=true',
    icon: (
      <>
        <path d="M7 10.2V18" style={iconStyle} />
        <path d="M7 7v.1" style={iconStyle} />
        <path d="M11 18v-7.8" style={iconStyle} />
        <path d="M11 13.4c0-2.05 1.18-3.35 2.95-3.35 1.78 0 3.05 1.18 3.05 3.55V18" style={iconStyle} />
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
                className="footer-social-link group flex h-9 w-9 items-center justify-center rounded-full border border-[#E3F78D]/12 bg-transparent text-[#E3F78D]/70 hover:text-[#E3F78D] hover:border-[#E3F78D]/34 hover:bg-[#E3F78D]/[0.025] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="footer-social-icon h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    fill: 'none',
                    stroke: 'currentColor',
                  }}
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
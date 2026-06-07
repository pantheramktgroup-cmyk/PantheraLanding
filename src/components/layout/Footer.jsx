import { landingCopy } from '../../content/landingCopy'
import { scrollToBooking } from '../../lib/scrollToBooking'

const { footer } = landingCopy

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

        {/* Legal */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-sans text-panthera-ash/50 leading-relaxed max-w-xl">
            {footer.legal}
          </p>
          <p className="text-xs font-sans text-panthera-ash/40 shrink-0">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

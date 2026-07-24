import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { siteCopy } from '../../content/siteCopy'

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
  const { ctas } = siteCopy

  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0 panthera-grid-bg opacity-[0.18]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 subtle-noise opacity-[0.2]" aria-hidden="true" />

      <motion.div
        className="container-panthera relative py-7 sm:py-8 md:py-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <div>
            <div className="mb-2 flex items-center">
              {siteCopy.brand.logo ? (
                <NavLink to="/#inicio" aria-label="Panthera Group — Ir al inicio">
                  <img src={siteCopy.brand.logo} alt="Panthera Group" className="h-6 w-auto object-contain" />
                </NavLink>
              ) : (
                <span className="font-display text-lg font-semibold tracking-[-0.02em] text-panthera-white">Panthera®</span>
              )}
            </div>
            <p className="text-[11px] leading-6 text-panthera-ash sm:text-[13px] lg:whitespace-nowrap">Infraestructura de demanda para expertos y negocios high-ticket.</p>
          </div>

          <div>
            <NavLink
              to="/landing#booking"
              className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-panthera-green transition-colors duration-300 hover:text-panthera-white"
            >
              {ctas.primary}
            </NavLink>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-panthera-white/38">© 2026 Panthera Group</p>
            <div className="flex items-center justify-center gap-3" aria-label="Redes sociales">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="footer-social-link group flex h-9 w-9 items-center justify-center rounded-full border border-[#E3F78D]/12 bg-transparent text-[#E3F78D]/70 transition-all duration-300 hover:border-[#E3F78D]/34 hover:bg-[#E3F78D]/[0.025] hover:text-[#E3F78D]"
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
      </motion.div>
    </footer>
  )
}
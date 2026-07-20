import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { siteCopy } from '../../content/siteCopy'

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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-panthera-white/38">© 2026 Panthera Group</p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
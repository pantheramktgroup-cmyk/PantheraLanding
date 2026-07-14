import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import AnimatedTextReveal from './AnimatedTextReveal'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', className, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <motion.div
          className={cn('mb-5 flex items-center gap-3', align === 'center' && 'justify-center')}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="accent-line" aria-hidden="true" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-panthera-green">{eyebrow}</p>
        </motion.div>
      ) : null}
      <AnimatedTextReveal
        text={title}
        className={cn(
          'interactive-title text-balance font-display text-[2rem] font-medium leading-[0.98] tracking-[-0.055em] sm:text-4xl lg:text-[3.4rem]',
          align === 'center' && 'mx-auto',
          titleClassName,
        )}
        align={align === 'center' ? 'center' : 'left'}
        delay={0.05}
      />
      {subtitle ? (
        <motion.p
          className={cn('mt-6 max-w-2xl text-sm leading-7 text-panthera-ash sm:text-[15px]', align === 'center' && 'mx-auto')}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'
import NoiseOverlay from './NoiseOverlay'

type MediaCardProps = {
  src: string
  alt?: string
  type?: 'image' | 'video'
  className?: string
  caption?: string
  objectPosition?: string
}

export default function MediaCard({ src, alt = '', type = 'image', className, caption, objectPosition = 'center' }: MediaCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <figure className={cn('relative overflow-hidden rounded-sm border border-white/10 bg-panthera-card', className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <NoiseOverlay />
      {type === 'video' ? (
        <motion.video
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          initial={{ scale: 1.06 }}
          animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={src}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          initial={{ scale: 1.06 }}
          animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-[11px] uppercase tracking-[0.22em] text-panthera-white/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
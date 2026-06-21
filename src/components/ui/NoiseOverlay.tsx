import { cn } from '../../lib/utils'

type NoiseOverlayProps = {
  className?: string
}

export default function NoiseOverlay({ className }: NoiseOverlayProps) {
  return <div className={cn('noise-overlay', className)} aria-hidden="true" />
}
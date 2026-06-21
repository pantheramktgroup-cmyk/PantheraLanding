/**
 * Badge — small pill label for hero trust signals
 */
export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-widest text-panthera-ash border border-[rgba(245,245,245,0.12)] rounded-full ${className}`}
    >
      <span className="w-1 h-1 rounded-full bg-panthera-green shrink-0" aria-hidden="true" />
      {children}
    </span>
  )
}

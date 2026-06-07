/**
 * SectionEyebrow — uppercase label shown above section headlines
 */
export default function SectionEyebrow({ children, className = '', light = false }) {
  return (
    <p
      className={`font-sans text-xs uppercase tracking-widest mb-4 ${
        light ? 'text-panthera-white/40' : 'text-panthera-green'
      } ${className}`}
    >
      {children}
    </p>
  )
}

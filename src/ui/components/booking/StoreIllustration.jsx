// Placeholder storefront drawing until the client provides a real showroom photo.
export function StoreIllustration({ className }) {
  return (
    <svg viewBox="0 0 360 260" fill="none" stroke="#9AA4B8" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 80 L340 80 L340 250 L20 250 Z" />
      <path d="M10 80 L30 30 L330 30 L350 80" fill="#DDE2EB" />
      <path d="M50 30 L40 80 M90 30 L85 80 M130 30 L128 80 M170 30 L170 80 M210 30 L212 80 M250 30 L255 80 M290 30 L300 80" />
      <rect x="44" y="104" width="170" height="146" rx="4" fill="#F4F6F9" />
      <rect x="240" y="104" width="76" height="146" rx="4" />
      <circle cx="96" cy="160" r="16" />
      <circle cx="140" cy="160" r="16" />
      <path d="M112 158 Q118 152 124 158" />
      <path d="M64 210 L194 210" />
    </svg>
  )
}

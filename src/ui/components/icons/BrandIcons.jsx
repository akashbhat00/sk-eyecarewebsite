const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function WhatsAppIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8 19.6L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2L9 9.5z" />
    </svg>
  )
}

export function InstagramIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
    </svg>
  )
}

export function ContactLensIcon({ size = 24, className, strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} strokeWidth={strokeWidth}>
      <path d="M3 15c0-5 4-9 9-9s9 4 9 9" />
      <path d="M3 15c3 2 15 2 18 0" />
    </svg>
  )
}

/** SK Eye Care logo mark. `inverted` draws it on dark backgrounds. */
export function LogoMark({ size = 44, inverted = false }) {
  const tile = inverted ? '#FFFFFF' : '#0B1F4E'
  const line = inverted ? '#0B1F4E' : '#FFFFFF'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={tile} />
      <circle cx="13.5" cy="21" r="5.5" fill="none" stroke={line} strokeWidth="2.2" />
      <circle cx="26.5" cy="21" r="5.5" fill="none" stroke={line} strokeWidth="2.2" />
      <path d="M19 20.5 Q20 19.3 21 20.5" stroke={line} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="26.5" cy="21" r="1.7" fill="#C9A84C" />
    </svg>
  )
}

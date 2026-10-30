import { cn } from '../../../utils/cn.util'

const VARIANTS = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800',
  outline: 'border-[1.5px] border-navy-900 text-navy-900 hover:bg-navy-50',
  light: 'bg-white text-navy-900 hover:bg-navy-50',
  'outline-light': 'border-[1.5px] border-white/50 text-white hover:bg-white/10',
  whatsapp: 'bg-whatsapp-solid text-white hover:brightness-110',
  ghost: 'text-navy-900 hover:bg-surface',
}

const SIZES = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-[52px] px-6 text-base',
}

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * @param {{ variant?: keyof VARIANTS, size?: keyof SIZES, href?: string, external?: boolean, fullWidth?: boolean }} props
 */
export function Button({ variant = 'primary', size = 'md', href, external, fullWidth, className, children, ...rest }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  )

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

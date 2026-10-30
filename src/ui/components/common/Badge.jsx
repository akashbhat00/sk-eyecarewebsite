import { cn } from '../../../utils/cn.util'

const VARIANTS = {
  gold: 'bg-gold-500 text-navy-900',
  navy: 'bg-navy-900 text-white',
  'outline-gold': 'border-[1.5px] border-gold-500 bg-white text-navy-900',
}

export function Badge({ variant = 'gold', className, children }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em]',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

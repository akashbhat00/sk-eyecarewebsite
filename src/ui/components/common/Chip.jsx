import { cn } from '../../../utils/cn.util'

/** Pill button. Pass `pressed` to make it a toggle (sets aria-pressed). */
export function Chip({ pressed, className, children, ...rest }) {
  const isToggle = pressed !== undefined
  return (
    <button
      type="button"
      aria-pressed={isToggle ? pressed : undefined}
      className={cn(
        'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors',
        pressed
          ? 'border-[1.5px] border-navy-900 bg-navy-900 text-white'
          : 'border-line-strong bg-white text-navy-900 hover:border-navy-900',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

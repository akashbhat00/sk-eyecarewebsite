import { cn } from '../../../utils/cn.util'

export const inputClasses = (hasError) =>
  cn(
    'h-12 w-full min-w-0 rounded-xl border bg-white px-3.5 text-[15px] text-ink outline-none transition-colors focus:border-navy-900',
    hasError ? 'border-danger' : 'border-line-strong',
  )

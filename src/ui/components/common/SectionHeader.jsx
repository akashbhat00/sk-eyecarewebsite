import { cn } from '../../../utils/cn.util'

export function SectionHeader({ id, title, subtitle, action, className }) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div className="flex flex-col gap-1.5">
        <h2 id={id} className="text-[22px] font-extrabold tracking-[-0.02em] md:text-[30px]">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted md:text-[15px]">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

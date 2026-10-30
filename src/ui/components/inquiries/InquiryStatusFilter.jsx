import { INQUIRY_STATUS_LABELS } from '../../../domain/inquiry/inquiry.constants'
import { cn } from '../../../utils/cn.util'

export function InquiryStatusFilter({ value, counts, onChange }) {
  const total = counts ? Object.values(counts).reduce((sum, n) => sum + n, 0) : null
  const tabs = [{ value: null, label: 'All', count: total }].concat(
    Object.entries(INQUIRY_STATUS_LABELS).map(([status, label]) => ({ value: status, label, count: counts?.[status] })),
  )
  return (
    <div role="tablist" aria-label="Filter by status" className="scrollbar-none flex gap-2 overflow-x-auto">
      {tabs.map((tab) => {
        const selected = value === tab.value
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold',
              selected ? 'border-navy-900 bg-navy-900 text-white' : 'border-line-strong bg-white text-navy-900',
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span className={cn('rounded-full px-1.5 text-xs font-bold', selected ? 'bg-white/20' : 'bg-surface')}>{tab.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

import { INQUIRY_STATUS_LABELS } from '../../../domain/inquiry/inquiry.constants'
import { cn } from '../../../utils/cn.util'

const STATUS_STYLES = {
  new: 'bg-gold-500/20 text-gold-700 border-gold-500/40',
  contacted: 'bg-navy-50 text-navy-900 border-navy-100',
  done: 'bg-success/10 text-success border-success/30',
}

/** Status dropdown that only offers transitions the service allows. */
export function InquiryStatusSelect({ inquiry, canTransition, onChange, disabled }) {
  const options = Object.keys(INQUIRY_STATUS_LABELS).filter(
    (status) => status === inquiry.status || canTransition(inquiry.status, status),
  )
  return (
    <select
      aria-label={`Status for ${inquiry.name}`}
      value={inquiry.status}
      disabled={disabled}
      onChange={(event) => onChange(inquiry, event.target.value)}
      className={cn('h-10 rounded-full border px-3 text-[13px] font-bold outline-none', STATUS_STYLES[inquiry.status])}
    >
      {options.map((status) => (
        <option key={status} value={status}>
          {INQUIRY_STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  )
}

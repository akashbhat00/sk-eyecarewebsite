import { formatDate, formatDateTime, formatPhone } from '../../../utils/format.util'
import { InquiryContactActions } from './InquiryContactActions'
import { InquiryStatusSelect } from './InquiryStatusSelect'

/** Mobile list item for one enquiry. */
export function InquiryCard({ inquiry, canTransition, onStatusChange }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold">{inquiry.name}</h3>
          <span className="text-sm text-muted">{formatPhone(inquiry.phone)}</span>
        </div>
        <InquiryStatusSelect inquiry={inquiry} canTransition={canTransition} onChange={onStatusChange} />
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted">Service</dt>
          <dd className="font-semibold">{inquiry.service}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Preferred slot</dt>
          <dd className="font-semibold">
            {formatDate(inquiry.preferredDate)}
            {inquiry.preferredTime && <span className="block font-normal text-ink-soft">{inquiry.preferredTime}</span>}
          </dd>
        </div>
      </dl>
      {inquiry.message && <p className="rounded-xl bg-surface p-3 text-sm text-ink-soft">{inquiry.message}</p>}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">Received {formatDateTime(inquiry.createdAt)}</span>
        <InquiryContactActions inquiry={inquiry} />
      </div>
    </article>
  )
}

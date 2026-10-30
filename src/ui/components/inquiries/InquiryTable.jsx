import { formatDate, formatDateTime, formatPhone } from '../../../utils/format.util'
import { InquiryContactActions } from './InquiryContactActions'
import { InquiryStatusSelect } from './InquiryStatusSelect'

/** Desktop table of enquiries. */
export function InquiryTable({ inquiries, canTransition, onStatusChange }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-surface text-xs uppercase tracking-[0.06em] text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">Received</th>
            <th scope="col" className="px-4 py-3 font-bold">Customer</th>
            <th scope="col" className="px-4 py-3 font-bold">Service</th>
            <th scope="col" className="px-4 py-3 font-bold">Preferred slot</th>
            <th scope="col" className="px-4 py-3 font-bold">Message</th>
            <th scope="col" className="px-4 py-3 font-bold">Status</th>
            <th scope="col" className="px-4 py-3 font-bold"><span className="sr-only">Contact</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="align-top">
              <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDateTime(inquiry.createdAt)}</td>
              <td className="px-4 py-3">
                <span className="block font-bold">{inquiry.name}</span>
                <span className="text-muted">{formatPhone(inquiry.phone)}</span>
              </td>
              <td className="px-4 py-3 font-semibold">{inquiry.service}</td>
              <td className="whitespace-nowrap px-4 py-3">
                {formatDate(inquiry.preferredDate)}
                {inquiry.preferredTime && <span className="block text-ink-soft">{inquiry.preferredTime}</span>}
              </td>
              <td className="max-w-64 px-4 py-3 text-ink-soft">{inquiry.message ?? '—'}</td>
              <td className="px-4 py-3">
                <InquiryStatusSelect inquiry={inquiry} canTransition={canTransition} onChange={onStatusChange} />
              </td>
              <td className="px-4 py-3">
                <InquiryContactActions inquiry={inquiry} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

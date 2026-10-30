import { Inbox, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Spinner } from '../../components/common/Spinner'
import { InquiryCard } from '../../components/inquiries/InquiryCard'
import { InquiryStatusFilter } from '../../components/inquiries/InquiryStatusFilter'
import { InquiryTable } from '../../components/inquiries/InquiryTable'
import { useInquiries } from '../../hooks/useInquiries'

export function AdminInquiriesPage() {
  const [statusFilter, setStatusFilter] = useState(null)
  const [actionError, setActionError] = useState(null)
  const { inquiries, counts, isLoading, error, reload, changeStatus, canTransition } = useInquiries(statusFilter)

  const handleStatusChange = async (inquiry, nextStatus) => {
    setActionError(await changeStatus(inquiry, nextStatus))
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em]">Enquiries</h1>
          <p className="text-sm text-muted">
            {counts ? `${counts.new} new · ${counts.contacted} contacted · ${counts.done} done` : 'Booking requests from the website'}
          </p>
        </div>
        <button
          type="button"
          onClick={reload}
          aria-label="Refresh enquiries"
          className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white text-navy-900"
        >
          <RefreshCw size={18} aria-hidden="true" />
        </button>
      </div>

      <InquiryStatusFilter value={statusFilter} counts={counts} onChange={setStatusFilter} />

      {(error || actionError) && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          {actionError ?? error}
        </p>
      )}

      {isLoading && inquiries.length === 0 ? (
        <div className="flex justify-center py-16 text-navy-900">
          <Spinner className="size-6" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line-strong bg-white py-16 text-center">
          <Inbox size={32} className="text-muted" aria-hidden="true" />
          <p className="font-semibold">No enquiries here yet</p>
          <p className="text-sm text-muted">New bookings from the website will appear here.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 md:hidden">
            {inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} canTransition={canTransition} onStatusChange={handleStatusChange} />
            ))}
          </div>
          <div className="hidden md:block">
            <InquiryTable inquiries={inquiries} canTransition={canTransition} onStatusChange={handleStatusChange} />
          </div>
        </>
      )}
    </div>
  )
}

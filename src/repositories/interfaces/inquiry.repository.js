/**
 * Data-access contract for enquiries. Every backend (Supabase, memory, a future REST API)
 * implements this shape; services depend only on it.
 *
 * @typedef {import('../../domain/inquiry/inquiry.model').Inquiry} Inquiry
 * @typedef {import('../../domain/inquiry/inquiry.model').NewInquiry} NewInquiry
 * @typedef {import('../../domain/inquiry/inquiry.model').InquiryStatus} InquiryStatus
 * @typedef {import('../../domain/inquiry/inquiry.model').InquiryStatusCounts} InquiryStatusCounts
 *
 * @typedef {Object} InquiryRepository
 * @property {(data: NewInquiry) => Promise<Inquiry | null>} create
 *   Anonymous visitors can insert but not read back, so implementations may return null.
 * @property {(filter?: { status?: InquiryStatus }) => Promise<Inquiry[]>} findAll  newest first
 * @property {(id: string) => Promise<Inquiry | null>} findById
 * @property {(id: string, status: InquiryStatus) => Promise<Inquiry>} updateStatus
 * @property {() => Promise<InquiryStatusCounts>} countByStatus
 */

export {}

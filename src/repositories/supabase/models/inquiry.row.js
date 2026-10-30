/**
 * Shape of a row in the `inquiries` table (supabase/migrations/002_inquiries.sql).
 *
 * @typedef {Object} InquiryRow
 * @property {string} id
 * @property {string} created_at
 * @property {string} name
 * @property {string} phone
 * @property {string} service
 * @property {string | null} preferred_date
 * @property {string | null} preferred_time
 * @property {string | null} message
 * @property {'new' | 'contacted' | 'done'} status
 */

export const INQUIRY_TABLE = 'inquiries'

export const INQUIRY_COLUMNS =
  'id, created_at, name, phone, service, preferred_date, preferred_time, message, status'

/** @param {InquiryRow} row @returns {import('../../../domain/inquiry/inquiry.model').Inquiry} */
export function toInquiry(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    phone: row.phone,
    service: row.service,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    message: row.message,
    status: row.status,
  }
}

/** @param {import('../../../domain/inquiry/inquiry.model').NewInquiry} inquiry */
export function toInquiryInsertRow(inquiry) {
  return {
    name: inquiry.name,
    phone: inquiry.phone,
    service: inquiry.service,
    preferred_date: inquiry.preferredDate ?? null,
    preferred_time: inquiry.preferredTime ?? null,
    message: inquiry.message ?? null,
  }
}

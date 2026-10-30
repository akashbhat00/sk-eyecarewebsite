/**
 * @typedef {'new' | 'contacted' | 'done'} InquiryStatus
 *
 * @typedef {Object} Inquiry
 * @property {string} id
 * @property {string} createdAt        ISO timestamp
 * @property {string} name
 * @property {string} phone            10-digit Indian mobile number, no country code
 * @property {string} service
 * @property {string | null} preferredDate  YYYY-MM-DD
 * @property {string | null} preferredTime
 * @property {string | null} message
 * @property {InquiryStatus} status
 *
 * @typedef {Pick<Inquiry, 'name' | 'phone' | 'service' | 'preferredDate' | 'preferredTime' | 'message'>} NewInquiry
 *
 * @typedef {Record<InquiryStatus, number>} InquiryStatusCounts
 */

export {}

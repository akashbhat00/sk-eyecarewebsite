import { INQUIRY_STATUS } from '../../domain/inquiry/inquiry.constants'
import { AppError, ERROR_CODES } from '../../shared/errors/app-error'

/**
 * In-memory implementation for tests and local development without Supabase.
 * @param {{ seed?: import('../../domain/inquiry/inquiry.model').Inquiry[], now?: () => Date }} [options]
 * @returns {import('../interfaces/inquiry.repository').InquiryRepository}
 */
export function createMemoryInquiryRepository({ seed = [], now = () => new Date() } = {}) {
  const store = new Map(seed.map((inquiry) => [inquiry.id, { ...inquiry }]))
  let sequence = store.size

  const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt)

  return {
    async create(data) {
      sequence += 1
      const inquiry = {
        id: `mem-${sequence}`,
        createdAt: now().toISOString(),
        name: data.name,
        phone: data.phone,
        service: data.service,
        preferredDate: data.preferredDate ?? null,
        preferredTime: data.preferredTime ?? null,
        message: data.message ?? null,
        status: INQUIRY_STATUS.NEW,
      }
      store.set(inquiry.id, inquiry)
      return { ...inquiry }
    },

    async findAll({ status } = {}) {
      return [...store.values()]
        .filter((inquiry) => !status || inquiry.status === status)
        .sort(byNewest)
        .map((inquiry) => ({ ...inquiry }))
    },

    async findById(id) {
      const inquiry = store.get(id)
      return inquiry ? { ...inquiry } : null
    },

    async updateStatus(id, status) {
      const inquiry = store.get(id)
      if (!inquiry) throw new AppError(ERROR_CODES.UNKNOWN, 'Enquiry not found.')
      inquiry.status = status
      return { ...inquiry }
    },

    async countByStatus() {
      const counts = Object.fromEntries(Object.values(INQUIRY_STATUS).map((status) => [status, 0]))
      for (const inquiry of store.values()) counts[inquiry.status] += 1
      return counts
    },
  }
}

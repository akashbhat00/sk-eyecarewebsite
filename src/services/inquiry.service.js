import { STATUS_TRANSITIONS } from '../domain/inquiry/inquiry.constants'
import { validateNewInquiry } from '../domain/inquiry/inquiry.schema'
import { AppError, ERROR_CODES } from '../shared/errors/app-error'

/**
 * Enquiry use-cases. Holds business rules; persistence is delegated to the repository.
 * @param {{ inquiryRepository: import('../repositories/interfaces/inquiry.repository').InquiryRepository | null }} deps
 */
export function createInquiryService({ inquiryRepository }) {
  function repository() {
    if (!inquiryRepository) {
      throw new AppError(ERROR_CODES.NOT_CONFIGURED, 'Online booking is not available yet.')
    }
    return inquiryRepository
  }

  function canTransition(from, to) {
    return STATUS_TRANSITIONS[from]?.includes(to) ?? false
  }

  return {
    canTransition,

    /** Validates without storing; used when bookings are handed off to WhatsApp instead. */
    validate: validateNewInquiry,

    /** Validates and stores a visitor's enquiry. Throws AppError(VALIDATION) with fieldErrors. */
    async submitInquiry(input) {
      const result = validateNewInquiry(input)
      if (!result.success) {
        throw new AppError(ERROR_CODES.VALIDATION, 'Please fix the highlighted fields.', {
          fieldErrors: result.fieldErrors,
        })
      }
      await repository().create(result.data)
    },

    listInquiries(filter = {}) {
      return repository().findAll(filter)
    },

    getStatusCounts() {
      return repository().countByStatus()
    },

    async changeStatus(inquiry, nextStatus) {
      if (!canTransition(inquiry.status, nextStatus)) {
        throw new AppError(
          ERROR_CODES.INVALID_TRANSITION,
          `Cannot move an enquiry from "${inquiry.status}" to "${nextStatus}".`,
        )
      }
      return repository().updateStatus(inquiry.id, nextStatus)
    },
  }
}

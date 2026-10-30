import { AppError, ERROR_CODES } from '../../shared/errors/app-error'

const PG_CHECK_VIOLATION = '23514'
const PG_INSUFFICIENT_PRIVILEGE = '42501'

export function toAppErrorFromSupabase(error) {
  if (error instanceof AppError) return error
  if (error?.code === PG_CHECK_VIOLATION) {
    return new AppError(ERROR_CODES.VALIDATION, 'Some details look invalid. Please check and try again.', { cause: error })
  }
  if (error?.code === PG_INSUFFICIENT_PRIVILEGE || error?.status === 401 || error?.status === 403) {
    return new AppError(ERROR_CODES.UNAUTHORIZED, 'You do not have permission to do that.', { cause: error })
  }
  if (error?.name === 'TypeError' || /fetch|network/i.test(error?.message ?? '')) {
    return new AppError(ERROR_CODES.NETWORK, 'Network error. Check your connection and try again.', { cause: error })
  }
  return new AppError(ERROR_CODES.UNKNOWN, 'Something went wrong. Please try again.', { cause: error })
}

export function throwIfError({ data, error }) {
  if (error) throw toAppErrorFromSupabase(error)
  return data
}

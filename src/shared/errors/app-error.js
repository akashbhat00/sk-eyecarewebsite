export const ERROR_CODES = {
  VALIDATION: 'validation',
  UNAUTHORIZED: 'unauthorized',
  INVALID_CREDENTIALS: 'invalid_credentials',
  NOT_CONFIGURED: 'not_configured',
  INVALID_TRANSITION: 'invalid_transition',
  NETWORK: 'network',
  UNKNOWN: 'unknown',
}

export class AppError extends Error {
  /**
   * @param {string} code  one of ERROR_CODES
   * @param {string} message  user-facing message
   * @param {{ fieldErrors?: Record<string, string>, cause?: unknown }} [details]
   */
  constructor(code, message, details = {}) {
    super(message, { cause: details.cause })
    this.name = 'AppError'
    this.code = code
    this.fieldErrors = details.fieldErrors ?? null
  }
}

export function toAppError(error) {
  if (error instanceof AppError) return error
  return new AppError(ERROR_CODES.UNKNOWN, 'Something went wrong. Please try again.', { cause: error })
}

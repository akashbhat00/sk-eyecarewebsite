import { AppError, ERROR_CODES } from '../../shared/errors/app-error'

/**
 * In-memory auth for tests and local development. Any email works with the configured password.
 * @param {{ password?: string, role?: 'owner' | 'staff' }} [options]
 * @returns {import('../interfaces/auth.repository').AuthRepository}
 */
export function createMemoryAuthRepository({ password = 'demo1234', role = 'owner' } = {}) {
  let session = null
  const listeners = new Set()
  const notify = () => listeners.forEach((listener) => listener(session))

  return {
    async signIn(email, attempt) {
      if (attempt !== password) {
        throw new AppError(ERROR_CODES.INVALID_CREDENTIALS, 'Incorrect email or password.')
      }
      session = { userId: 'mem-user', email, role }
      notify()
      return session
    },

    async signOut() {
      session = null
      notify()
    },

    async getSession() {
      return session
    },

    onSessionChange(callback) {
      listeners.add(callback)
      return () => listeners.delete(callback)
    },
  }
}

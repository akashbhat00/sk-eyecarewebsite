import { isStaffSession } from '../domain/auth/session.model'
import { AppError, ERROR_CODES } from '../shared/errors/app-error'

/** @param {{ authRepository: import('../repositories/interfaces/auth.repository').AuthRepository | null }} deps */
export function createAuthService({ authRepository }) {
  function repository() {
    if (!authRepository) {
      throw new AppError(ERROR_CODES.NOT_CONFIGURED, 'Admin login is not set up yet.')
    }
    return authRepository
  }

  return {
    async login(email, password) {
      if (!email?.trim() || !password) {
        throw new AppError(ERROR_CODES.VALIDATION, 'Enter your email and password.')
      }
      const session = await repository().signIn(email.trim(), password)
      if (!isStaffSession(session)) {
        await repository().signOut()
        throw new AppError(ERROR_CODES.UNAUTHORIZED, 'This account does not have admin access.')
      }
      return session
    },

    logout() {
      return repository().signOut()
    },

    async getCurrentSession() {
      if (!authRepository) return null
      return authRepository.getSession()
    },

    onSessionChange(callback) {
      if (!authRepository) return () => {}
      return authRepository.onSessionChange(callback)
    },

    isStaff: isStaffSession,
  }
}

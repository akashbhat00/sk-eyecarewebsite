/**
 * @typedef {import('../../domain/auth/session.model').Session} Session
 *
 * @typedef {Object} AuthRepository
 * @property {(email: string, password: string) => Promise<Session>} signIn
 * @property {() => Promise<void>} signOut
 * @property {() => Promise<Session | null>} getSession
 * @property {(callback: (session: Session | null) => void) => () => void} onSessionChange
 *   returns an unsubscribe function
 */

export {}

/**
 * @typedef {'owner' | 'staff'} StaffRole
 *
 * @typedef {Object} Session
 * @property {string} userId
 * @property {string} email
 * @property {StaffRole | null} role   null when signed in but not a staff member
 */

export const STAFF_ROLES = ['owner', 'staff']

/** @param {Session | null} session */
export function isStaffSession(session) {
  return Boolean(session && STAFF_ROLES.includes(session.role))
}

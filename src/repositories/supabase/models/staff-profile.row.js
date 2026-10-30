/**
 * Shape of a row in the `staff_profiles` table (supabase/migrations/001_staff_profiles.sql).
 *
 * @typedef {Object} StaffProfileRow
 * @property {string} user_id
 * @property {'owner' | 'staff'} role
 * @property {string} created_at
 */

export const STAFF_PROFILE_TABLE = 'staff_profiles'

/**
 * @param {{ id: string, email?: string }} user  Supabase auth user
 * @param {StaffProfileRow | null} profile
 * @returns {import('../../../domain/auth/session.model').Session}
 */
export function toSession(user, profile) {
  return {
    userId: user.id,
    email: user.email ?? '',
    role: profile?.role ?? null,
  }
}

import { AppError, ERROR_CODES } from '../../shared/errors/app-error'
import { STAFF_PROFILE_TABLE, toSession } from './models/staff-profile.row'
import { toAppErrorFromSupabase } from './supabase-error.mapper'

/** @returns {import('../interfaces/auth.repository').AuthRepository} */
export function createSupabaseAuthRepository(client) {
  async function loadSession(user) {
    if (!user) return null
    const { data, error } = await client
      .from(STAFF_PROFILE_TABLE)
      .select('user_id, role, created_at')
      .eq('user_id', user.id)
      .maybeSingle()
    if (error) throw toAppErrorFromSupabase(error)
    return toSession(user, data)
  }

  return {
    async signIn(email, password) {
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.status === 400) {
          throw new AppError(ERROR_CODES.INVALID_CREDENTIALS, 'Incorrect email or password.', { cause: error })
        }
        throw toAppErrorFromSupabase(error)
      }
      return loadSession(data.user)
    },

    async signOut() {
      const { error } = await client.auth.signOut()
      if (error) throw toAppErrorFromSupabase(error)
    },

    async getSession() {
      const { data, error } = await client.auth.getSession()
      if (error) throw toAppErrorFromSupabase(error)
      return loadSession(data.session?.user ?? null)
    },

    onSessionChange(callback) {
      const { data } = client.auth.onAuthStateChange((_event, session) => {
        // Supabase warns against awaiting client calls inside this callback; defer the profile lookup.
        setTimeout(() => {
          loadSession(session?.user ?? null)
            .then(callback)
            .catch(() => callback(null))
        }, 0)
      })
      return () => data.subscription.unsubscribe()
    },
  }
}

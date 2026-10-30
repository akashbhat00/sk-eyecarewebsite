import { AppError, ERROR_CODES } from '../../shared/errors/app-error'
import { STAFF_PROFILE_TABLE, toSession } from './models/staff-profile.row'
import { toAppErrorFromSupabase } from './supabase-error.mapper'

/**
 * @param {() => Promise<import('@supabase/supabase-js').SupabaseClient>} getClient
 * @returns {import('../interfaces/auth.repository').AuthRepository}
 */
export function createSupabaseAuthRepository(getClient) {
  async function loadSession(user) {
    if (!user) return null
    const client = await getClient()
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
      const client = await getClient()
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
      const client = await getClient()
      const { error } = await client.auth.signOut()
      if (error) throw toAppErrorFromSupabase(error)
    },

    async getSession() {
      const client = await getClient()
      const { data, error } = await client.auth.getSession()
      if (error) throw toAppErrorFromSupabase(error)
      return loadSession(data.session?.user ?? null)
    },

    onSessionChange(callback) {
      let unsubscribe = () => {}
      let cancelled = false
      getClient().then((client) => {
        if (cancelled) return
        const { data } = client.auth.onAuthStateChange((_event, session) => {
          // Supabase warns against awaiting client calls inside this callback; defer the profile lookup.
          setTimeout(() => {
            loadSession(session?.user ?? null)
              .then(callback)
              .catch(() => callback(null))
          }, 0)
        })
        unsubscribe = () => data.subscription.unsubscribe()
      })
      return () => {
        cancelled = true
        unsubscribe()
      }
    },
  }
}

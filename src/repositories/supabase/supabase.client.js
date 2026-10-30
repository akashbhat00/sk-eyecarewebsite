/**
 * Returns a lazy loader for the Supabase client, or null when keys are missing.
 * supabase-js is fetched on first use so visitors who never submit a form don't download it.
 */
export function createSupabaseClientLoader({ supabaseUrl, supabaseAnonKey }) {
  if (!supabaseUrl || !supabaseAnonKey) return null
  let clientPromise
  return () => {
    clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      }),
    )
    return clientPromise
  }
}

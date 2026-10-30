import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient({ supabaseUrl, supabaseAnonKey }) {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  })
}

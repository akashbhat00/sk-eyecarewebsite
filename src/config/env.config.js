const env = import.meta.env

export const BACKEND = {
  SUPABASE: 'supabase',
  MEMORY: 'memory',
}

export const envConfig = {
  backend: env.VITE_BACKEND || BACKEND.SUPABASE,
  supabaseUrl: env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY || '',
}

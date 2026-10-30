import { BACKEND } from '../config/env.config'
import { createMemoryAuthRepository } from './memory/memory-auth.repository'
import { createMemoryInquiryRepository } from './memory/memory-inquiry.repository'
import { createSupabaseAuthRepository } from './supabase/supabase-auth.repository'
import { createSupabaseClientLoader } from './supabase/supabase.client'
import { createSupabaseInquiryRepository } from './supabase/supabase-inquiry.repository'

/**
 * Picks the data-access implementation. To add a custom backend, add a case here
 * that returns repositories implementing the same interfaces.
 *
 * @param {typeof import('../config/env.config').envConfig} config
 * @returns {{ isConfigured: boolean, inquiryRepository: import('./interfaces/inquiry.repository').InquiryRepository | null, authRepository: import('./interfaces/auth.repository').AuthRepository | null }}
 */
export function createRepositories(config) {
  switch (config.backend) {
    case BACKEND.MEMORY:
      return {
        isConfigured: true,
        inquiryRepository: createMemoryInquiryRepository(),
        authRepository: createMemoryAuthRepository(),
      }

    case BACKEND.SUPABASE: {
      const getClient = createSupabaseClientLoader(config)
      if (!getClient) return { isConfigured: false, inquiryRepository: null, authRepository: null }
      return {
        isConfigured: true,
        inquiryRepository: createSupabaseInquiryRepository(getClient),
        authRepository: createSupabaseAuthRepository(getClient),
      }
    }

    default:
      throw new Error(`Unknown VITE_BACKEND "${config.backend}"`)
  }
}

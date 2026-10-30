import { envConfig } from '../config/env.config'
import { createRepositories } from '../repositories/repository.factory'
import { createAuthService } from './auth.service'
import { createInquiryService } from './inquiry.service'

/**
 * Composition root: wires repositories into services. Register new services here.
 * @param {ReturnType<typeof createRepositories>} repositories
 */
export function createServices(repositories) {
  return {
    isBackendConfigured: repositories.isConfigured,
    inquiryService: createInquiryService(repositories),
    authService: createAuthService(repositories),
  }
}

/** @typedef {ReturnType<typeof createServices>} Services */

export const services = createServices(createRepositories(envConfig))

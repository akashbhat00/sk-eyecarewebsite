import { useContext } from 'react'
import { ServicesContext } from '../providers/contexts'

/** @returns {import('../../services/service.container').Services} */
export function useServices() {
  const services = useContext(ServicesContext)
  if (!services) throw new Error('useServices must be used inside <ServicesProvider>')
  return services
}

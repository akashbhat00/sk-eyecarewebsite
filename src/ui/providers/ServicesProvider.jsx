import { ServicesContext } from './contexts'

/** Injects the service container so components never import repositories or backends directly. */
export function ServicesProvider({ services, children }) {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
}

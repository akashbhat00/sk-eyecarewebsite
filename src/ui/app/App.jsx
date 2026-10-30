import { ServicesProvider } from '../providers/ServicesProvider'
import { AppRouter } from './AppRouter'

/** @param {{ services: import('../../services/service.container').Services }} props */
export function App({ services }) {
  return (
    <ServicesProvider services={services}>
      <AppRouter />
    </ServicesProvider>
  )
}

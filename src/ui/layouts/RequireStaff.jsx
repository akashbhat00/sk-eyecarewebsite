import { Navigate, useLocation } from 'react-router'
import { ROUTES } from '../../config/routes.config'
import { Spinner } from '../components/common/Spinner'
import { useAuth } from '../hooks/useAuth'

export function RequireStaff({ children }) {
  const { isLoading, isStaff } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-navy-900">
        <Spinner className="size-6" />
      </div>
    )
  }
  if (!isStaff) return <Navigate to={ROUTES.ADMIN_LOGIN} replace state={{ from: location.pathname }} />
  return children
}

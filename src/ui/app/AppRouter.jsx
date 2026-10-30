import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { ROUTES } from '../../config/routes.config'
import { Spinner } from '../components/common/Spinner'
import { PublicLayout } from '../layouts/PublicLayout'
import { HomePage } from '../pages/HomePage'

// Admin code is split out so visitors never download it.
const AdminArea = lazy(() => import('./AdminArea'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center text-navy-900">
      <Spinner className="size-6" />
    </div>
  )
}

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>
        <Route
          path={`${ROUTES.ADMIN}/*`}
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminArea />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </HashRouter>
  )
}

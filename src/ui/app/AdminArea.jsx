import { Navigate, Route, Routes } from 'react-router'
import { ROUTES } from '../../config/routes.config'
import { AdminLayout } from '../layouts/AdminLayout'
import { RequireStaff } from '../layouts/RequireStaff'
import { AdminInquiriesPage } from '../pages/admin/AdminInquiriesPage'
import { AdminLoginPage } from '../pages/admin/AdminLoginPage'
import { AuthProvider } from '../providers/AuthProvider'

const relative = (path) => path.replace(`${ROUTES.ADMIN}/`, '')

/** Admin routes; register new admin pages here and in config/admin-nav.config.js. */
export default function AdminArea() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={relative(ROUTES.ADMIN_LOGIN)} element={<AdminLoginPage />} />
        <Route
          element={
            <RequireStaff>
              <AdminLayout />
            </RequireStaff>
          }
        >
          <Route path={relative(ROUTES.ADMIN_INQUIRIES)} element={<AdminInquiriesPage />} />
        </Route>
        <Route index element={<Navigate to={ROUTES.ADMIN_INQUIRIES} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.ADMIN_INQUIRIES} replace />} />
      </Routes>
    </AuthProvider>
  )
}

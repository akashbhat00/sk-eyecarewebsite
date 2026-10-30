import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { ROUTES } from '../../../config/routes.config'
import { toAppError } from '../../../shared/errors/app-error'
import { Button } from '../../components/common/Button'
import { FormField, Input } from '../../components/common/FormField'
import { Spinner } from '../../components/common/Spinner'
import { LogoMark } from '../../components/icons/BrandIcons'
import { useAuth } from '../../hooks/useAuth'
import { useServices } from '../../hooks/useServices'

export function AdminLoginPage() {
  const { isBackendConfigured } = useServices()
  const { login, isStaff, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const destination = location.state?.from ?? ROUTES.ADMIN_INQUIRIES
  if (!isLoading && isStaff) return <Navigate to={destination} replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(destination, { replace: true })
    } catch (err) {
      setError(toAppError(err).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-raised md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <LogoMark size={40} />
          <div>
            <h1 className="text-lg font-extrabold">SK Eye Care Admin</h1>
            <p className="text-sm text-muted">Sign in to manage enquiries</p>
          </div>
        </div>

        {!isBackendConfigured ? (
          <div role="status" className="rounded-xl bg-gold-500/15 p-4 text-sm leading-relaxed text-ink-soft">
            <strong className="block text-navy-900">Admin isn’t set up yet</strong>
            Connect Supabase by adding the keys described in SETUP.md, then redeploy.
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField id="admin-email" label="Email">
              {(a11y) => <Input {...a11y} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />}
            </FormField>
            <FormField id="admin-password" label="Password">
              {(a11y) => (
                <Input {...a11y} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              )}
            </FormField>
            {error && (
              <p role="alert" className="text-sm font-medium text-danger">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" fullWidth disabled={submitting}>
              {submitting && <Spinner />}
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        )}

        <Link to={ROUTES.HOME} className="mt-6 block text-center text-sm font-semibold text-navy-900 hover:underline">
          ← Back to website
        </Link>
      </div>
    </main>
  )
}

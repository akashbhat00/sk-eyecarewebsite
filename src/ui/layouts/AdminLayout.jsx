import { ExternalLink, LogOut } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'
import { adminNavConfig } from '../../config/admin-nav.config'
import { ROUTES } from '../../config/routes.config'
import { cn } from '../../utils/cn.util'
import { LogoMark } from '../components/icons/BrandIcons'
import { useAuth } from '../hooks/useAuth'

export function AdminLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="min-h-screen bg-surface md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-4 py-3 md:sticky md:top-0 md:h-screen md:flex-col md:flex-nowrap md:items-stretch md:gap-1 md:border-b-0 md:border-r md:p-5">
        <div className="mr-auto flex items-center gap-2.5 md:mb-6 md:mr-0">
          <LogoMark size={34} />
          <span className="flex flex-col">
            <span className="text-sm font-extrabold">SK Eye Care</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Admin</span>
          </span>
        </div>
        <nav aria-label="Admin" className="scrollbar-none order-last flex w-full gap-1 overflow-x-auto md:order-none md:flex-col">
          {adminNavConfig.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold',
                  isActive ? 'bg-navy-900 text-white' : 'text-navy-900 hover:bg-surface',
                )
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1 md:mt-auto md:flex-col md:items-stretch md:gap-1">
          <Link
            to={ROUTES.HOME}
            aria-label="View website"
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-surface"
          >
            <ExternalLink size={18} aria-hidden="true" />
            <span className="hidden md:inline">View website</span>
          </Link>
          <p className="hidden truncate px-3 pt-2 text-xs text-muted md:block">{session?.email}</p>
          <button
            type="button"
            onClick={logout}
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-surface"
          >
            <LogOut size={18} aria-hidden="true" />
            <span className="sr-only md:not-sr-only">Log out</span>
          </button>
        </div>
      </aside>
      <main className="min-w-0 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

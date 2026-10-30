import { Outlet } from 'react-router'
import { MobileActionBar } from '../components/layout/MobileActionBar'
import { PromoStrip } from '../components/layout/PromoStrip'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { WishlistProvider } from '../providers/WishlistProvider'

export function PublicLayout() {
  return (
    <WishlistProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <PromoStrip />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <MobileActionBar />
      </div>
    </WishlistProvider>
  )
}

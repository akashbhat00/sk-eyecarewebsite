import { Link } from 'react-router'
import { ROUTES } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { cn } from '../../../utils/cn.util'
import { LogoMark } from '../icons/BrandIcons'

export function BrandLink({ inverted = false, compact = false, className }) {
  return (
    <Link
      to={ROUTES.HOME}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn('flex shrink-0 items-center gap-2.5 md:gap-3', inverted ? 'text-white' : 'text-navy-900', className)}
    >
      <LogoMark size={compact ? 36 : 44} inverted={inverted} />
      <span className="flex flex-col gap-0.5">
        <span className={cn('font-extrabold leading-none tracking-[-0.02em]', compact ? 'text-lg' : 'text-[21px]')}>
          {siteConfig.shortName}
        </span>
        <span
          className={cn(
            'font-semibold uppercase tracking-[0.08em]',
            compact ? 'text-[9.5px]' : 'text-[11px]',
            inverted ? 'text-on-navy' : 'text-muted',
          )}
        >
          &amp; {siteConfig.tagline} · Since {siteConfig.establishedYear}
        </span>
      </span>
    </Link>
  )
}

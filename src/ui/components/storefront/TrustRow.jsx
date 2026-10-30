import { ShieldCheck } from 'lucide-react'
import { siteConfig, yearsInBusiness } from '../../../config/site.config'
import { cn } from '../../../utils/cn.util'
import { Container } from '../common/Container'
import { Star } from '../common/StarRating'

const stats = [
  { value: `${yearsInBusiness}+`, label: ['years', 'in Jammu'] },
  { value: siteConfig.rating.value, star: true, label: ['rated', `on ${siteConfig.rating.source}`] },
  { value: '500+', label: ['frames', 'in store'] },
  { icon: true, label: ['Expert', 'opticians'] },
]

export function TrustRow() {
  return (
    <section aria-label="Why SK Eye Care" className="mt-10 bg-surface md:mt-[72px]">
      <Container as="ul" className="grid grid-cols-2 gap-3 py-6 md:py-11 lg:grid-cols-4 lg:gap-0">
        {stats.map((stat, i) => (
          <li
            key={stat.label.join(' ')}
            className={cn(
              'flex items-center gap-3 rounded-xl bg-white p-3.5 md:gap-4 lg:rounded-none lg:bg-transparent lg:px-6 lg:py-0',
              i > 0 && 'lg:border-l lg:border-[#DADEE7]',
            )}
          >
            {stat.icon ? (
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-500 md:size-12">
                <ShieldCheck size={22} strokeWidth={2} aria-hidden="true" />
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[26px] font-extrabold tracking-[-0.03em] md:text-[38px]">
                {stat.value}
                {stat.star && <Star size={22} />}
              </span>
            )}
            <span className="text-[13px] font-semibold leading-[1.35] text-ink-soft md:text-[15px]">
              {stat.label[0]}
              <br />
              {stat.label[1]}
            </span>
          </li>
        ))}
      </Container>
    </section>
  )
}

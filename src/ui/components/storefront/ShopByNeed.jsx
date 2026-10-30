import { ArrowRight } from 'lucide-react'
import { shopByNeed } from '../../../content/categories.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Container } from '../common/Container'
import { SectionHeader } from '../common/SectionHeader'
import { FrameIllustration } from './FrameIllustration'

export function ShopByNeed() {
  return (
    <Container as="section" id={SECTION_IDS.SHOP_BY_NEED} aria-labelledby="need-h" className="pt-10 md:pt-[72px]">
      <SectionHeader id="need-h" title="Shop by need" />
      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:gap-5 lg:grid-cols-3">
        {shopByNeed.map((need) => (
          <a
            key={need.title}
            href={buildWhatsAppLink(`Hi SK Eye Care, I'm looking for ${need.title.toLowerCase()}. What do you have?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col-reverse justify-between gap-3 rounded-2xl bg-surface p-4 text-navy-900 transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover md:h-[172px] md:flex-row md:items-center md:gap-4 md:p-7"
          >
            <span className="flex flex-col gap-1 md:gap-1.5">
              <span className="text-[15px] font-extrabold leading-snug tracking-[-0.01em] md:text-xl">{need.title}</span>
              <span className="text-xs leading-snug text-muted md:text-sm md:leading-[1.45]">{need.desc}</span>
              <span className="mt-1 hidden items-center gap-1.5 text-sm font-bold md:mt-2.5 md:flex">
                Explore <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </span>
            </span>
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white md:size-[116px]">
              <FrameIllustration shape={need.shape} color={need.color} lens={need.lens} decorative className="w-12 md:w-[88px]" />
            </span>
          </a>
        ))}
      </div>
    </Container>
  )
}

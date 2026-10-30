import { categoryCircles } from '../../../content/categories.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { SectionLink } from '../common/SectionLink'
import { FrameIllustration } from './FrameIllustration'

export function CategoryCircles() {
  return (
    <nav aria-label="Shop by category" id={SECTION_IDS.CATEGORIES} className="mx-auto max-w-[1440px]">
      <ul className="scrollbar-none flex gap-[18px] overflow-x-auto px-4 pb-1.5 pt-[18px] md:justify-center md:gap-10 md:px-8 md:pt-9 lg:gap-16 xl:px-20">
        {categoryCircles.map((category) => (
          <li key={category.label} className="shrink-0">
            <SectionLink
              to={SECTION_IDS.SHOP_BY_NEED}
              className="group flex w-[76px] flex-col items-center gap-2 text-navy-900 md:w-auto md:gap-3"
            >
              <span className="flex size-[72px] items-center justify-center rounded-full border border-line bg-surface transition-colors group-hover:border-navy-900 md:size-[116px]">
                <FrameIllustration {...category} decorative className="w-[52px] md:w-[82px]" />
              </span>
              <span className="text-center text-xs font-semibold leading-tight md:text-sm">{category.label}</span>
            </SectionLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

import { useState } from 'react'
import { SECTION_IDS } from '../../config/routes.config'
import { scrollToSection } from '../../utils/scroll.util'
import { BookingSection } from '../components/booking/BookingSection'
import { BestsellerGrid } from '../components/storefront/BestsellerGrid'
import { CategoryCircles } from '../components/storefront/CategoryCircles'
import { FrameShapeChips } from '../components/storefront/FrameShapeChips'
import { HeroCarousel } from '../components/storefront/HeroCarousel'
import { ReviewCarousel } from '../components/storefront/ReviewCarousel'
import { ServicesStrip } from '../components/storefront/ServicesStrip'
import { ShopByNeed } from '../components/storefront/ShopByNeed'
import { TrustRow } from '../components/storefront/TrustRow'
import { VisitUs } from '../components/storefront/VisitUs'

export function HomePage() {
  const [shapeFilter, setShapeFilter] = useState(null)

  const selectShape = (shape) => {
    setShapeFilter(shape)
    if (shape) scrollToSection(SECTION_IDS.BESTSELLERS)
  }

  return (
    <>
      <CategoryCircles />
      <HeroCarousel />
      <FrameShapeChips selected={shapeFilter} onSelect={selectShape} />
      <BestsellerGrid shapeFilter={shapeFilter} onClearFilter={() => setShapeFilter(null)} />
      <ShopByNeed />
      <ServicesStrip />
      <TrustRow />
      <BookingSection />
      <ReviewCarousel />
      <VisitUs />
    </>
  )
}

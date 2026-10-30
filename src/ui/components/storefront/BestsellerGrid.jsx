import { ArrowRight } from 'lucide-react'
import { frameShapeChips } from '../../../content/categories.content'
import { sampleProducts } from '../../../content/sample-products.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Container } from '../common/Container'
import { SectionHeader } from '../common/SectionHeader'
import { ProductCard } from './ProductCard'

export function BestsellerGrid({ shapeFilter, onClearFilter }) {
  const products = shapeFilter ? sampleProducts.filter((p) => p.shape === shapeFilter) : sampleProducts
  const filterLabel = frameShapeChips.find((chip) => chip.shape === shapeFilter)?.label

  return (
    <Container as="section" id={SECTION_IDS.BESTSELLERS} aria-labelledby="bestsellers-h" className="pt-9 md:pt-14">
      <SectionHeader
        id="bestsellers-h"
        title="Bestsellers"
        subtitle={
          filterLabel ? (
            <>
              Showing {filterLabel.toLowerCase()} frames ·{' '}
              <button type="button" onClick={onClearFilter} className="font-semibold text-navy-900 underline">
                Show all
              </button>
            </>
          ) : (
            'Most-loved frames at our Bantalab showroom'
          )
        }
        action={
          <a
            href={buildWhatsAppLink('Hi SK Eye Care, can you share more frames from your collection?')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 py-3 text-[13px] font-bold text-navy-900 hover:underline md:text-sm"
          >
            <span className="md:hidden">View all</span>
            <span className="hidden md:inline">View all frames</span>
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="hidden md:block" />
          </a>
        }
      />
      {products.length > 0 ? (
        <div className="mt-2 grid grid-cols-2 gap-3 md:mt-6 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface p-6 text-center text-sm text-muted">
          More {filterLabel?.toLowerCase()} frames are in store. Ask us on WhatsApp.
        </p>
      )}
    </Container>
  )
}

import { Heart } from 'lucide-react'
import { PRODUCT_BADGE } from '../../../content/sample-products.content'
import { cn } from '../../../utils/cn.util'
import { discountPercent, formatINR } from '../../../utils/format.util'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { useWishlist } from '../../hooks/useWishlist'
import { Badge } from '../common/Badge'
import { StarRating } from '../common/StarRating'
import { WhatsAppIcon } from '../icons/BrandIcons'
import { FrameIllustration } from './FrameIllustration'

export function ProductCard({ product }) {
  const { has, toggle } = useWishlist()
  const liked = has(product.id)
  const enquiry = `Hi SK Eye Care, I'm interested in the ${product.title} (${formatINR(product.price)}). Is it available?`

  return (
    <article className="flex flex-col overflow-hidden rounded-[14px] border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover md:rounded-2xl">
      <div className="relative flex h-[132px] items-center justify-center bg-surface md:h-[210px]">
        <FrameIllustration shape={product.shape} color={product.color} lens={product.lens} className="w-[78%] max-w-[210px]" />
        {product.badge === PRODUCT_BADGE.BESTSELLER && (
          <Badge className="absolute left-2.5 top-2.5 text-[9.5px] md:left-3.5 md:top-3.5 md:text-[11px]">Bestseller</Badge>
        )}
        {product.badge === PRODUCT_BADGE.NEW && (
          <Badge variant="outline-gold" className="absolute left-2.5 top-2.5 text-[9.5px] md:left-3.5 md:top-3.5 md:text-[11px]">
            New
          </Badge>
        )}
        <button
          type="button"
          aria-pressed={liked}
          aria-label={`${liked ? 'Remove' : 'Add'} ${product.title} ${liked ? 'from' : 'to'} wishlist`}
          onClick={() => toggle(product.id)}
          className="absolute right-0.5 top-0.5 flex size-11 items-center justify-center md:right-2 md:top-2"
        >
          <span className="flex size-[34px] items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(11,31,78,0.10)]">
            <Heart size={18} strokeWidth={1.9} className={cn('text-navy-900', liked && 'fill-navy-900')} />
          </span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 md:gap-1.5 md:px-[18px] md:pb-[18px] md:pt-4">
        <h3 className="text-sm font-bold leading-snug md:text-base">{product.title}</h3>
        <span className="text-xs text-muted md:text-[13px]">
          {product.shapeLabel} · {product.size}
        </span>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-extrabold md:text-[19px]">{formatINR(product.price)}</span>
          <span className="text-xs text-placeholder line-through md:text-[13px]">
            <span className="sr-only">MRP </span>
            {formatINR(product.mrp)}
          </span>
          <span className="text-[11px] font-bold text-success md:text-xs">{discountPercent(product.price, product.mrp)}% off</span>
        </div>
        <StarRating rating={product.rating} size={13} showValue />
        <a
          href={buildWhatsAppLink(enquiry)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${product.title} on WhatsApp`}
          className="mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-[1.5px] border-navy-900 text-[13px] font-bold text-navy-900 transition-colors hover:bg-navy-50 md:mt-2.5 md:text-sm"
        >
          <WhatsAppIcon size={18} className="text-whatsapp" />
          <span className="md:hidden">Enquire</span>
          <span className="hidden md:inline">Enquire on WhatsApp</span>
        </a>
      </div>
    </article>
  )
}

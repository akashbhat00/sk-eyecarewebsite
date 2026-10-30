import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { customerReviews } from '../../../content/reviews.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { cn } from '../../../utils/cn.util'
import { Container } from '../common/Container'
import { SectionHeader } from '../common/SectionHeader'
import { StarRating } from '../common/StarRating'

export function ReviewCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!card) return
    setActive(Math.round(track.scrollLeft / (card.clientWidth + 12)))
  }

  return (
    <section id={SECTION_IDS.REVIEWS} aria-labelledby="reviews-h" className="mx-auto max-w-[1440px] pt-10 md:pt-[72px]">
      <Container className="max-w-none">
        <SectionHeader
          id="reviews-h"
          title="What our customers say"
          subtitle={`Rated ${siteConfig.rating.value}★ on ${siteConfig.rating.source} by families across Jammu`}
          action={
            <div className="hidden gap-2.5 md:flex lg:hidden">
              <button type="button" aria-label="Previous reviews" onClick={() => scrollBy(-1)} className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white">
                <ChevronLeft size={18} strokeWidth={2.2} />
              </button>
              <button type="button" aria-label="Next reviews" onClick={() => scrollBy(1)} className="flex size-11 items-center justify-center rounded-full bg-navy-900 text-white">
                <ChevronRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          }
        />
      </Container>
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-none mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 md:mt-6 md:scroll-px-8 md:gap-5 md:px-8 lg:grid lg:grid-cols-4 lg:overflow-visible xl:px-20"
      >
        {customerReviews.map((review) => (
          <li key={review.name} className="w-[82%] shrink-0 snap-start md:w-[45%] lg:w-auto">
            <figure className="flex h-full flex-col gap-4 rounded-2xl bg-surface p-5 md:p-6">
              <StarRating rating={review.rating} size={16} />
              <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft md:text-[15px]">“{review.quote}”</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-[42px] items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {review.initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-navy-900">{review.name}</span>
                  <span className="text-xs text-muted">{review.place}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-4 flex justify-center gap-2 lg:hidden">
        {customerReviews.map((review, i) => (
          <span key={review.name} className={cn('h-2 rounded-full transition-all', i === active ? 'w-[26px] bg-navy-900' : 'w-2 bg-dot')} />
        ))}
      </div>
    </section>
  )
}

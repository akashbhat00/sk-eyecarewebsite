import { SECTION_IDS } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { SUBMIT_STATUS, useSubmitInquiry } from '../../hooks/useSubmitInquiry'
import { Container } from '../common/Container'
import { BookingForm } from './BookingForm'
import { BookingSuccess } from './BookingSuccess'
import { StoreIllustration } from './StoreIllustration'

export function BookingSection() {
  const booking = useSubmitInquiry()

  return (
    <Container
      as="section"
      id={SECTION_IDS.BOOK}
      aria-labelledby="book-h"
      className="grid gap-4 pt-10 md:gap-8 md:pt-[72px] lg:grid-cols-2"
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white px-[18px] py-[22px] shadow-raised md:gap-5 md:p-10">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-gold-700 md:text-xs">Book an eye test</span>
          <h2 id="book-h" className="text-[22px] font-extrabold tracking-[-0.02em] md:text-[30px]">
            Book a free eye test
          </h2>
          <p className="text-sm text-muted md:text-[15px]">Pick a slot and we&apos;ll confirm on WhatsApp.</p>
        </div>
        {booking.status === SUBMIT_STATUS.SUCCESS ? (
          <BookingSuccess booking={booking.lastBooking} channel={booking.channel} onReset={booking.reset} />
        ) : (
          <BookingForm booking={booking} />
        )}
      </div>

      <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-surface-2 lg:h-auto lg:min-h-[560px]">
        <StoreIllustration className="w-60 md:w-[360px]" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 shadow-raised md:inset-x-5 md:bottom-5 md:px-5 md:py-[18px]">
          <span className="flex flex-col gap-1">
            <span className="text-[13px] font-extrabold md:text-base">{siteConfig.name}</span>
            <span className="hidden text-[13px] text-muted md:block">
              {siteConfig.address.line1} · Family-run since {siteConfig.establishedYear}
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-gold-500 px-2.5 py-1.5 text-xs font-extrabold text-navy-900">
            {siteConfig.rating.value}★ {siteConfig.rating.source}
          </span>
        </div>
      </div>
    </Container>
  )
}

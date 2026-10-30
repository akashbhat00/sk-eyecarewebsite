import { Fragment } from 'react'
import { siteConfig } from '../../../config/site.config'

export function PromoStrip() {
  const messages = siteConfig.promoMessages.slice(0, 2)
  return (
    <div className="bg-navy-900 px-4 py-2 text-center text-xs font-medium leading-relaxed text-white md:py-2.5 md:text-[13px]">
      {messages.map((message, i) => (
        <Fragment key={message}>
          {i > 0 && (
            <span aria-hidden="true" className="mx-2 font-extrabold text-gold-500 md:mx-3">
              ·
            </span>
          )}
          <span className="whitespace-nowrap">{message}</span>
        </Fragment>
      ))}
    </div>
  )
}

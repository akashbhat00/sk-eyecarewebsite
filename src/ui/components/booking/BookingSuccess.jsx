import { CheckCircle2 } from 'lucide-react'
import { formatDate } from '../../../utils/format.util'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { buildBookingMessage, SUBMIT_CHANNEL } from '../../hooks/useSubmitInquiry'
import { Button } from '../common/Button'
import { WhatsAppIcon } from '../icons/BrandIcons'

export function BookingSuccess({ booking, channel, onReset }) {
  const viaWhatsApp = channel === SUBMIT_CHANNEL.WHATSAPP
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-2">
      <CheckCircle2 size={44} className="text-success" aria-hidden="true" />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-extrabold md:text-2xl">{viaWhatsApp ? 'Almost done!' : 'Request received!'}</h3>
        <p className="text-[15px] text-ink-soft">
          {viaWhatsApp
            ? 'Send the WhatsApp message that just opened and we’ll confirm your slot.'
            : `Thanks ${booking?.name ?? ''}. We’ll confirm your ${booking?.service.toLowerCase() ?? 'visit'} for ${formatDate(booking?.preferredDate)} on WhatsApp shortly.`}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {viaWhatsApp && booking && (
          <Button href={buildWhatsAppLink(buildBookingMessage(booking))} external variant="whatsapp">
            <WhatsAppIcon size={20} /> Open WhatsApp again
          </Button>
        )}
        <Button variant="outline" onClick={onReset}>
          Book another
        </Button>
      </div>
    </div>
  )
}

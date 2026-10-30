import { Phone } from 'lucide-react'
import { buildCallLink, buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { WhatsAppIcon } from '../icons/BrandIcons'

export function InquiryContactActions({ inquiry }) {
  const whatsappNumber = `91${inquiry.phone}`
  const greeting = `Hi ${inquiry.name}, this is SK Eye Care & Opticals about your ${inquiry.service.toLowerCase()} request.`
  return (
    <div className="flex gap-2">
      <a
        href={buildCallLink(`+${whatsappNumber}`)}
        aria-label={`Call ${inquiry.name}`}
        className="flex size-10 items-center justify-center rounded-full border border-line-strong text-navy-900 hover:bg-surface"
      >
        <Phone size={17} aria-hidden="true" />
      </a>
      <a
        href={buildWhatsAppLink(greeting, whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${inquiry.name}`}
        className="flex size-10 items-center justify-center rounded-full border border-line-strong text-whatsapp hover:bg-surface"
      >
        <WhatsAppIcon size={18} />
      </a>
    </div>
  )
}

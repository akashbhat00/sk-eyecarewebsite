import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { SECTION_IDS } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { buildCallLink, buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Button } from '../common/Button'
import { Container } from '../common/Container'
import { WhatsAppIcon } from '../icons/BrandIcons'

const mapQuery = encodeURIComponent(siteConfig.mapQuery)
const MAP_EMBED_URL = `https://www.google.com/maps?q=${mapQuery}&output=embed`
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-900">
        <Icon size={20} strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-[13px] font-semibold text-muted">{label}</span>
        {children}
      </div>
    </div>
  )
}

export function VisitUs() {
  const { address, hours, phone } = siteConfig
  return (
    <Container
      as="section"
      id={SECTION_IDS.VISIT}
      aria-labelledby="visit-h"
      className="grid gap-4 pb-10 pt-10 md:gap-8 md:pb-20 md:pt-[72px] lg:grid-cols-[5fr_7fr]"
    >
      <div className="flex flex-col gap-5 rounded-2xl border border-line p-5 md:gap-[22px] md:p-9">
        <h2 id="visit-h" className="text-[22px] font-extrabold tracking-[-0.02em] md:text-[30px]">
          Visit our showroom
        </h2>
        <InfoRow icon={MapPin} label="Address">
          <address className="text-[15px] font-semibold not-italic leading-normal">
            {address.line1}, {address.line2},
            <br />
            {address.city} – {address.postalCode}
          </address>
        </InfoRow>
        <InfoRow icon={Phone} label="Phone / WhatsApp">
          <a href={buildCallLink()} className="text-[15px] font-bold text-navy-900">
            {phone.display}
          </a>
        </InfoRow>
        <InfoRow icon={Clock} label="Opening hours">
          {hours.map((h) => (
            <span key={h.days} className="flex justify-between text-[15px]">
              <span>{h.days}</span>
              <strong>{h.time.replaceAll(':00', '')}</strong>
            </span>
          ))}
        </InfoRow>
        <div className="mt-auto flex gap-3">
          <Button href={DIRECTIONS_URL} external className="h-[50px] flex-1">
            <Navigation size={18} aria-hidden="true" /> Get Directions
          </Button>
          <Button href={buildWhatsAppLink()} external variant="outline" className="h-[50px] flex-1">
            <WhatsAppIcon size={18} className="text-whatsapp" /> WhatsApp us
          </Button>
        </div>
      </div>
      <div className="h-[260px] overflow-hidden rounded-2xl bg-surface-2 md:min-h-[440px] lg:h-auto">
        <iframe
          title={`Map showing ${siteConfig.name}, ${address.line1}, ${address.city}`}
          src={MAP_EMBED_URL}
          className="size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </Container>
  )
}

import { navCategories } from '../../../content/categories.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { fullAddress, siteConfig } from '../../../config/site.config'
import { buildCallLink, buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Container } from '../common/Container'
import { SectionLink } from '../common/SectionLink'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../icons/BrandIcons'
import { BrandLink } from './BrandLink'

const quickLinks = [
  { label: 'Book Eye Test', target: SECTION_IDS.BOOK },
  { label: 'Our Services', target: SECTION_IDS.SERVICES },
  { label: 'Store Location', target: SECTION_IDS.VISIT },
  { label: 'Customer Reviews', target: SECTION_IDS.REVIEWS },
]

const socials = [
  { label: 'Instagram', href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: 'WhatsApp', href: buildWhatsAppLink(), Icon: WhatsAppIcon },
]

function FooterHeading({ children }) {
  return <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.06em] text-white">{children}</p>
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 pb-24 pt-12 text-on-navy md:pb-12 md:pt-16">
      <Container className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:gap-12">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <BrandLink inverted />
          <p className="max-w-80 text-sm leading-relaxed">
            A family-run optical showroom in Bantalab, Jammu. Eye tests, frames, lenses and repairs, done with care.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Quick links" className="flex flex-col gap-3 text-sm">
          <FooterHeading>Quick links</FooterHeading>
          {quickLinks.map((link) => (
            <SectionLink key={link.label} to={link.target} className="hover:text-white hover:underline">
              {link.label}
            </SectionLink>
          ))}
        </nav>
        <nav aria-label="Footer categories" className="flex flex-col gap-3 text-sm">
          <FooterHeading>Categories</FooterHeading>
          {navCategories.map((link) => (
            <SectionLink key={link.label} to={link.target} className="hover:text-white hover:underline">
              {link.label}
            </SectionLink>
          ))}
        </nav>
        <div className="col-span-2 flex flex-col gap-3 text-sm leading-relaxed md:col-span-1">
          <FooterHeading>Contact</FooterHeading>
          <span>{fullAddress}</span>
          <a href={buildCallLink()} className="font-bold text-white">
            {siteConfig.phone.display}
          </a>
          <span>
            {siteConfig.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days}: {h.time}
              </span>
            ))}
          </span>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] md:flex-row md:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </span>
        <span>
          {siteConfig.address.line1.split(', ').pop()}, {siteConfig.address.city}
        </span>
      </Container>
    </footer>
  )
}

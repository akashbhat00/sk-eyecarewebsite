import { Phone, X } from 'lucide-react'
import { useEffect } from 'react'
import { navCategories } from '../../../content/categories.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { buildCallLink, buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Button } from '../common/Button'
import { SectionLink } from '../common/SectionLink'
import { WhatsAppIcon } from '../icons/BrandIcons'
import { BrandLink } from './BrandLink'

const extraLinks = [
  { label: 'Book Eye Test', target: SECTION_IDS.BOOK },
  { label: 'Our Services', target: SECTION_IDS.SERVICES },
  { label: 'Store Location', target: SECTION_IDS.VISIT },
]

export function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 animate-fade-in md:hidden">
      <button type="button" aria-label="Close menu" tabIndex={-1} className="absolute inset-0 bg-navy-900/40" onClick={onClose} />
      <nav
        aria-label="Main menu"
        className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm animate-slide-in-right flex-col overflow-y-auto bg-white"
      >
            <div className="flex h-[60px] items-center justify-between border-b border-line pl-4 pr-2">
              <BrandLink compact />
              <button type="button" aria-label="Close menu" onClick={onClose} className="flex size-11 items-center justify-center">
                <X size={24} />
              </button>
            </div>
            <p className="px-4 pb-1 pt-5 text-xs font-bold uppercase tracking-[0.08em] text-muted">Shop</p>
            {navCategories.map((item) => (
              <SectionLink
                key={item.label}
                to={item.target}
                onClick={onClose}
                className="mx-4 flex h-12 items-center border-b border-line text-[15px] font-semibold text-navy-900"
              >
                {item.label}
              </SectionLink>
            ))}
            <p className="px-4 pb-1 pt-6 text-xs font-bold uppercase tracking-[0.08em] text-muted">Store</p>
            {extraLinks.map((item) => (
              <SectionLink
                key={item.label}
                to={item.target}
                onClick={onClose}
                className="mx-4 flex h-12 items-center border-b border-line text-[15px] font-semibold text-navy-900"
              >
                {item.label}
              </SectionLink>
            ))}
            <div className="mt-auto flex flex-col gap-3 p-4">
              <Button href={buildWhatsAppLink()} external variant="whatsapp" fullWidth>
                <WhatsAppIcon size={20} /> WhatsApp us
              </Button>
              <Button href={buildCallLink()} variant="outline" fullWidth>
                <Phone size={18} aria-hidden="true" /> {siteConfig.phone.display}
              </Button>
            </div>
      </nav>
    </div>
  )
}

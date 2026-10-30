import { Eye } from 'lucide-react'
import { SECTION_IDS } from '../../../config/routes.config'
import { scrollToSection } from '../../../utils/scroll.util'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { Button } from '../common/Button'
import { WhatsAppIcon } from '../icons/BrandIcons'

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-white px-4 pb-[calc(14px+env(safe-area-inset-bottom))] pt-2.5 shadow-bar md:hidden">
      <Button href={buildWhatsAppLink()} external variant="whatsapp" className="h-[50px] flex-1 whitespace-nowrap px-3">
        <WhatsAppIcon size={20} /> WhatsApp
      </Button>
      <Button onClick={() => scrollToSection(SECTION_IDS.BOOK)} className="h-[50px] flex-1 whitespace-nowrap px-3">
        <Eye size={20} aria-hidden="true" /> Book Eye Test
      </Button>
    </div>
  )
}

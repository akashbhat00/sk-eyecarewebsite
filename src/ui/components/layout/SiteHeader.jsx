import { Eye, Heart, Menu, Phone, Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { navCategories } from '../../../content/categories.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { siteConfig } from '../../../config/site.config'
import { scrollToSection } from '../../../utils/scroll.util'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { useWishlist } from '../../hooks/useWishlist'
import { Button } from '../common/Button'
import { Container } from '../common/Container'
import { SectionLink } from '../common/SectionLink'
import { WhatsAppIcon } from '../icons/BrandIcons'
import { BrandLink } from './BrandLink'
import { MobileMenu } from './MobileMenu'
import { SearchBar } from './SearchBar'

function HeaderIconAction({ as: Tag = 'button', icon, label, badge, ...rest }) {
  return (
    <Tag
      className="relative flex h-[52px] min-w-16 flex-col items-center justify-center gap-[3px] rounded-xl text-[11px] font-semibold text-navy-900 hover:bg-surface"
      {...rest}
    >
      {icon}
      {label}
      {badge > 0 && (
        <span className="absolute right-3 top-1 flex size-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-extrabold text-navy-900">
          {badge}
        </span>
      )}
    </Tag>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const [searchOpen, setSearchOpen] = useState(false)
  const { count } = useWishlist()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      {/* Mobile */}
      <div className="flex h-[60px] items-center gap-1 pl-4 pr-2 md:hidden">
        <BrandLink compact className="flex-1" />
        <button
          type="button"
          aria-label={searchOpen ? 'Close search' : 'Search'}
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((open) => !open)}
          className="flex size-11 items-center justify-center text-navy-900"
        >
          {searchOpen ? <X size={22} /> : <Search size={22} />}
        </button>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex size-11 items-center justify-center text-navy-900"
        >
          <Menu size={24} />
        </button>
      </div>
      {searchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <SearchBar autoFocus />
        </div>
      )}
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      {/* Desktop */}
      <Container className="hidden h-[84px] items-center gap-8 md:flex">
        <BrandLink />
        <SearchBar className="flex-1" />
        <div className="flex shrink-0 items-center gap-2">
          <HeaderIconAction
            icon={<Heart size={22} strokeWidth={1.9} aria-hidden="true" />}
            label="Wishlist"
            badge={count}
            aria-label={`Wishlist, ${count} saved`}
            onClick={() => scrollToSection(SECTION_IDS.BESTSELLERS)}
          />
          <HeaderIconAction
            as="a"
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={22} className="text-whatsapp" />}
            label="WhatsApp"
          />
          <Button onClick={() => scrollToSection(SECTION_IDS.BOOK)} className="ml-2 text-sm">
            <Eye size={18} aria-hidden="true" />
            Book Eye Test
          </Button>
        </div>
      </Container>
      <nav aria-label="Categories" className="hidden border-t border-[#EEF0F4] md:block">
        <Container className="flex h-[52px] items-center gap-6 text-sm font-semibold lg:gap-9">
          {navCategories.map((item) => (
            <SectionLink key={item.label} to={item.target} className="text-navy-900 hover:text-navy-800 hover:underline">
              {item.label}
            </SectionLink>
          ))}
          <span className="ml-auto hidden items-center gap-2 text-[13px] font-medium text-muted lg:flex">
            <Phone size={16} aria-hidden="true" />
            Call or WhatsApp
            <a href={`tel:${siteConfig.phone.e164}`} className="font-bold text-navy-900">
              {siteConfig.phone.display}
            </a>
          </span>
        </Container>
      </nav>
    </header>
  )
}

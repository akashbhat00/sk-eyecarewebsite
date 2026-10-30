import { Eye, RefreshCw, Sun, Truck, Wrench } from 'lucide-react'
import { storeServices } from '../../../content/services.content'
import { SECTION_IDS } from '../../../config/routes.config'
import { Container } from '../common/Container'
import { SectionHeader } from '../common/SectionHeader'
import { ContactLensIcon } from '../icons/BrandIcons'

const ICONS = {
  eye: Eye,
  wrench: Wrench,
  refresh: RefreshCw,
  sun: Sun,
  'contact-lens': ContactLensIcon,
  truck: Truck,
}

export function ServicesStrip() {
  return (
    <Container as="section" id={SECTION_IDS.SERVICES} aria-labelledby="services-h" className="pt-10 md:pt-[72px]">
      <SectionHeader id="services-h" title="Our services" subtitle="Everything your eyes need, under one roof" />
      <ul className="mt-4 grid grid-cols-3 gap-x-1 gap-y-[22px] rounded-[14px] border border-line px-2 py-5 md:mt-6 md:gap-6 md:rounded-2xl md:px-8 md:py-9 lg:grid-cols-6">
        {storeServices.map((service) => {
          const Icon = ICONS[service.icon]
          return (
            <li key={service.title} className="flex flex-col items-center gap-2 text-center md:gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-navy-50 text-navy-900 md:size-[60px]">
                <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="text-xs font-bold leading-tight md:text-[15px]">{service.title}</span>
              <span className="hidden text-[13px] leading-[1.45] text-muted md:block">{service.desc}</span>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

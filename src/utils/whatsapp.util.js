import { siteConfig } from '../config/site.config'

export function buildWhatsAppLink(message, phone = siteConfig.phone.whatsapp) {
  const base = `https://wa.me/${phone}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildCallLink(phone = siteConfig.phone.e164) {
  return `tel:${phone}`
}

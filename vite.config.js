import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fullAddress, siteConfig } from './src/config/site.config.js'

const escapeHtml = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char])

// Builds <head> SEO tags from site.config.js so shop details live in one place.
function seoTags() {
  const title = `${siteConfig.name} | Eye Tests, Spectacles & Sunglasses in Bantalab, Jammu`
  const description = `Family-run optical showroom in Bantalab, Jammu since ${siteConfig.establishedYear}. Free eye tests, 500+ frames, sunglasses, contact lenses and repairs. Call or WhatsApp ${siteConfig.phone.display}.`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Optician',
    name: siteConfig.name,
    telephone: siteConfig.phone.e164,
    foundingDate: String(siteConfig.establishedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '17:00' },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: siteConfig.rating.value, bestRating: 5 },
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
  }
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="theme-color" content="#0B1F4E" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="geo.placename" content="${escapeHtml(fullAddress)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    { name: 'site-seo', transformIndexHtml: (html) => html.replace('<!-- seo -->', seoTags()) },
  ],
  base: '/sk-eyecarewebsite/',
})

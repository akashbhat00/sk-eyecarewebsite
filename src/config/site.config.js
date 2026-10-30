export const siteConfig = {
  name: 'SK Eye Care & Opticals',
  shortName: 'SK Eye Care',
  tagline: 'Opticals',
  establishedYear: 2008,
  phone: {
    display: '+91 70061 52340',
    e164: '+917006152340',
    whatsapp: '917006152340',
  },
  address: {
    line1: 'Main Road, Bantalab',
    line2: 'Near Barnai Road',
    city: 'Jammu',
    region: 'Jammu and Kashmir',
    postalCode: '181123',
    country: 'IN',
  },
  mapQuery: 'SK Eye Care Opticals, Main Road, Bantalab, Jammu 181123',
  hours: [
    { days: 'Mon – Sat', time: '10:00 AM – 8:00 PM' },
    { days: 'Sunday', time: '11:00 AM – 5:00 PM' },
  ],
  rating: { value: 4.7, source: 'Justdial' },
  socials: {
    instagram: 'https://www.instagram.com/skeyecareopticals/',
    facebook: 'https://www.facebook.com/p/Sk-eye-care-opticals-100063930347517/',
    instagramHandle: '@skeyecareopticals',
  },
  promoMessages: [
    'Free eye test with every visit',
    'Home delivery across Jammu city',
    'Frames starting at ₹999',
  ],
}

export const fullAddress = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  `${siteConfig.address.city} - ${siteConfig.address.postalCode}`,
].join(', ')

export const yearsInBusiness = new Date().getFullYear() - siteConfig.establishedYear

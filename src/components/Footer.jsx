import { Eye, Share2, Users } from 'lucide-react'

export default function Footer() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer style={{ background: '#060f25' }} className="text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0B1F4E,#C9A84C)' }}>
              <Eye size={17} color="white" />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: 'Playfair Display,serif', color: '#C9A84C' }}>SK Eye Care & Opticals</div>
              <div className="text-xs text-gray-400">Bantalab, Jammu</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Trusted optical showroom since 2008. Quality eyewear, expert fitting, free eye tests.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { href: 'https://www.instagram.com/skeyecareopticals/', icon: Share2 },
              { href: 'https://www.facebook.com/p/Sk-eye-care-opticals-100063930347517/', icon: Users },
            ].map(({ href, icon: Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-600 hover:border-gold transition-colors"
                style={{ '--hover-border': '#C9A84C' }}>
                <Icon size={16} color="#9ca3af" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-sm mb-4" style={{ color: '#C9A84C' }}>Quick Links</div>
          {[['home','Home'],['collections','Collections'],['services','Services'],['about','About Us'],['contact','Contact']].map(([id,label]) => (
            <button key={id} onClick={() => scroll(id)} className="block text-sm text-gray-400 hover:text-white mb-2 transition-colors text-left">
              {label}
            </button>
          ))}
        </div>
        <div>
          <div className="font-bold text-sm mb-4" style={{ color: '#C9A84C' }}>Contact</div>
          <p className="text-sm text-gray-400 mb-1">Main Road, Bantalab</p>
          <p className="text-sm text-gray-400 mb-1">Jammu - 181123</p>
          <p className="text-sm text-gray-400 mb-4">Mon–Sat: 10 AM – 8 PM</p>
          <a href="https://wa.me/917006152340" target="_blank" rel="noopener noreferrer"
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold text-white" style={{ background: '#25D366' }}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        © 2026 SK Eye Care & Opticals, Bantalab, Jammu. All rights reserved.
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { Menu, X, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'Collections', 'Services', 'About', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (link) => {
    setOpen(false)
    const id = link.toLowerCase()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0B1F4E, #C9A84C)' }}>
            <Eye size={20} color="white" />
          </div>
          <div>
            <div className="font-bold text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: scrolled ? '#0B1F4E' : 'white' }}>
              SK Eye Care
            </div>
            <div className="text-xs leading-tight" style={{ color: scrolled ? '#C9A84C' : '#e4c26e' }}>
              & Opticals
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ color: scrolled ? '#0B1F4E' : 'white' }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/919999000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: '#25D366' }}
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: scrolled ? '#0B1F4E' : 'white' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-xl px-6 py-4"
          >
            {links.map(link => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left py-3 text-base font-medium border-b border-gray-100"
                style={{ color: '#0B1F4E' }}
              >
                {link}
              </button>
            ))}
            <a
              href="https://wa.me/919999000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: '#25D366' }}
            >
              💬 WhatsApp Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

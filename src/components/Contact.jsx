import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Share2, Users } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>Visit Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: '#0B1F4E' }}>Find Us in Bantalab</h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 1, x: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: MapPin, title: 'Address', lines: ['Main Road, Bantalab', 'Near Barnai Road, Jammu - 181123'] },
              { icon: Phone, title: 'Phone / WhatsApp', lines: ['+91 99999 00000'] },
              { icon: Clock, title: 'Store Hours', lines: ['Mon – Sat: 10:00 AM – 8:00 PM', 'Sunday: 11:00 AM – 5:00 PM'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl" style={{ background: '#FDF8F0' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#0B1F4E' }}>
                  <Icon size={18} color="white" />
                </div>
                <div>
                  <div className="font-bold text-sm mb-1" style={{ color: '#0B1F4E' }}>{title}</div>
                  {lines.map(l => <div key={l} className="text-sm text-gray-500">{l}</div>)}
                </div>
              </div>
            ))}
            <a href="https://wa.me/919999000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-full text-white font-semibold text-base w-full transition-transform hover:scale-105"
              style={{ background: '#25D366' }}>
              💬 Chat on WhatsApp
            </a>
            <div className="flex gap-4">
              {[
                { href: 'https://www.instagram.com/skeyecareopticals/', icon: Share2, label: 'Instagram' },
                { href: 'https://www.facebook.com/p/Sk-eye-care-opticals-100063930347517/', icon: Users, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border-2 text-sm font-semibold transition-all hover:scale-105"
                  style={{ borderColor: '#0B1F4E', color: '#0B1F4E' }}>
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 1, x: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden h-96 shadow-lg">
            <iframe
              title="SK Eye Care Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.8!2d74.84!3d32.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e8bXXXXXXXXXX%3A0x0!2sBantalab%2C+Jammu%2C+Jammu+and+Kashmir+181123!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

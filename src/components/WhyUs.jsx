import { motion } from 'framer-motion'
import { BadgeCheck, Gem, IndianRupee } from 'lucide-react'

const reasons = [
  {
    icon: BadgeCheck,
    title: 'Expert Opticians',
    desc: '17+ years of experience fitting lenses and frames — you are in trusted hands.',
  },
  {
    icon: Gem,
    title: 'Premium Brands',
    desc: 'Curated collection of leading eyewear brands at our Bantalab showroom.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    desc: 'Quality eyecare for every budget — transparent pricing with no hidden costs.',
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="py-20 px-6" style={{ background: '#0B1F4E' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Families in Jammu Trust SK Eye Care
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              Since 2008, SK Eye Care & Opticals has been the go-to destination for eye care in
              Bantalab, Jammu. We've helped thousands of customers see clearly and look great —
              whether it's their first pair of glasses or their tenth.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our showroom on Main Road, Bantalab carries a wide selection of frames for men, women,
              and children, along with contact lenses, accessories, and on-site expert fitting.
              Walk in — and walk out with perfect vision.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/919999000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: '#C9A84C', color: '#0B1F4E' }}
              >
                Visit Us Today →
              </a>
            </div>
          </motion.div>

          {/* Right: cards */}
          <div className="space-y-5">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: '#C9A84C' }}
                  >
                    <Icon size={22} color="#0B1F4E" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {r.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Eye, Wrench, FlaskConical, Shield, ScanEye, Truck } from 'lucide-react'

const services = [
  {
    icon: Eye,
    title: 'Free Eye Testing',
    desc: 'Comprehensive eye examination by trained opticians using modern diagnostic tools.',
    color: '#0B1F4E',
  },
  {
    icon: Wrench,
    title: 'Frame Fitting & Repair',
    desc: 'Expert frame adjustments, nose pad replacements, and on-the-spot minor repairs.',
    color: '#C9A84C',
  },
  {
    icon: FlaskConical,
    title: 'Lens Replacement',
    desc: 'Replace scratched or outdated lenses in your favourite frame — any prescription.',
    color: '#0B1F4E',
  },
  {
    icon: Shield,
    title: 'Anti-Glare & Coatings',
    desc: 'Anti-glare, blue-light blocking, photochromic, and UV coatings for all lenses.',
    color: '#C9A84C',
  },
  {
    icon: ScanEye,
    title: 'Contact Lens Fitting',
    desc: 'Trial fittings, prescription matching, and guidance for first-time contact lens users.',
    color: '#0B1F4E',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    desc: 'Order your eyewear and get it delivered to your doorstep within Jammu city.',
    color: '#C9A84C',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: '#0B1F4E' }}>
            Complete Eye Care Services
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            From your first eye test to finding the perfect frame — we're with you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#FDF8F0' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: svc.color }}
                >
                  <Icon size={22} color="white" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0B1F4E', fontFamily: 'Playfair Display, serif' }}>
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

const stats = [
  { icon: '🏆', label: '17+ Years', sub: 'Serving Jammu' },
  { icon: '⭐', label: '4.7 / 5', sub: 'Customer Rating' },
  { icon: '👁️', label: 'Free Eye Test', sub: 'With Every Visit' },
  { icon: '🕶️', label: '500+ Frames', sub: 'In-store Collection' },
  { icon: '📍', label: 'Bantalab', sub: 'Jammu - 181123' },
]

export default function TrustBar() {
  return (
    <section className="py-6" style={{ background: '#0B1F4E' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-white"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="font-bold text-sm" style={{ color: '#C9A84C' }}>{stat.label}</div>
                <div className="text-xs text-gray-300">{stat.sub}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-white/20 ml-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

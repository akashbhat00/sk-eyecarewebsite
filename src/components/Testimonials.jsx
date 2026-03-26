import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Rahul Sharma',
    location: 'Bantalab, Jammu',
    text: 'Best optical shop in the area. They helped me pick the perfect frames and the eye test was thorough and free. Highly recommend!',
    stars: 5,
    avatar: 'RS',
  },
  {
    name: 'Priya Gupta',
    location: 'Barnai, Jammu',
    text: 'Very professional and friendly staff. Got my contact lenses fitted perfectly. The collection of frames is huge — loved the variety.',
    stars: 5,
    avatar: 'PG',
  },
  {
    name: 'Arun Dogra',
    location: 'Jammu',
    text: 'Been coming here for 5 years. SK Eye Care always has the latest styles and their pricing is very fair. Never going anywhere else!',
    stars: 5,
    avatar: 'AD',
  },
  {
    name: 'Sunita Verma',
    location: 'Nagrota, Jammu',
    text: 'Got spectacles for my son here. The kids collection is great and they adjusted the fit perfectly. Quick service and very helpful.',
    stars: 4,
    avatar: 'SV',
  },
]

function StarRow({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? '#C9A84C' : 'none'}
          stroke={i < count ? '#C9A84C' : '#d1d5db'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
            Customer Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: '#0B1F4E' }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRow count={5} />
            <span className="font-bold text-gray-700">4.7 / 5</span>
            <span className="text-gray-400 text-sm">on Justdial</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              style={{ background: '#FDF8F0' }}
            >
              <StarRow count={r.stars} />
              <p className="text-sm text-gray-600 leading-relaxed mt-4 mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: '#0B1F4E' }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#0B1F4E' }}>{r.name}</div>
                  <div className="text-xs text-gray-400">{r.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

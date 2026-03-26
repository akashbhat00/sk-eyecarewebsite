import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    title: 'Prescription Eyeglasses',
    desc: 'Single vision, bifocal, and progressive lenses in hundreds of stylish frames.',
    img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80',
    tag: 'Most Popular',
  },
  {
    title: 'Designer Sunglasses',
    desc: 'UV-protected sunnies for every style — from classic to contemporary.',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    tag: 'Trending',
  },
  {
    title: 'Contact Lenses',
    desc: 'Daily, monthly, and coloured contact lenses from leading brands.',
    img: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=600&q=80',
    tag: null,
  },
  {
    title: "Kids' Eyewear",
    desc: 'Durable, flexible, and fun frames designed specifically for children.',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    tag: null,
  },
  {
    title: 'Safety & Computer Glasses',
    desc: 'Blue-light blocking and anti-radiation lenses for digital eye protection.',
    img: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&q=80',
    tag: 'New',
  },
  {
    title: 'Sports & Outdoor',
    desc: 'Impact-resistant, lightweight frames for active lifestyles.',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    tag: null,
  },
]

export default function Collections() {
  return (
    <section id="collections" className="py-20 px-6" style={{ background: '#FDF8F0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: '#0B1F4E' }}>
            Find Your Perfect Pair
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
            From prescription glasses to stylish sunglasses — browse our wide range of eyewear for every need and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.tag && (
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: '#C9A84C' }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0B1F4E', fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                <button
                  className="flex items-center gap-1 text-sm font-semibold transition-colors hover:gap-2"
                  style={{ color: '#C9A84C' }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Range <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

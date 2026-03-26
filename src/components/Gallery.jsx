import { motion } from 'framer-motion'

const images = [
  { src: 'https://images.unsplash.com/photo-1602360061433-7dc394c82b5e?w=600&q=80', alt: 'Eyewear display', tall: true },
  { src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', alt: 'Prescription glasses', tall: false },
  { src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', alt: 'Sunglasses collection', tall: false },
  { src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', alt: 'Frame selection', tall: true },
  { src: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=600&q=80', alt: 'Optical store', tall: false },
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80', alt: 'Contact lenses', tall: false },
]

export default function Gallery() {
  return (
    <section className="py-20 px-6" style={{ background: '#FDF8F0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
            Our Showroom
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: '#0B1F4E' }}>
            Take a Look Inside
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Step into our showroom in Bantalab, Jammu and explore our curated eyewear collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl ${img.tall ? 'row-span-2' : ''}`}
              style={{ height: img.tall ? '360px' : '170px' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/skeyecareopticals/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:scale-105"
            style={{ borderColor: '#0B1F4E', color: '#0B1F4E' }}
          >
            📸 Follow us on Instagram @skeyecareopticals
          </a>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1F4E 0%, #1a3a7a 50%, #0B1F4E 100%)',
      }}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: '#C9A84C' }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ background: '#C9A84C' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2 border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 border border-white" />
      </div>

      {/* Eyewear image overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1600&q=80"
          alt="Stylish eyewear"
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6 tracking-widest uppercase"
            style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            Bantalab, Jammu — Est. 2008
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          See the World Clearly —
          <br />
          <span style={{ color: '#C9A84C' }}>Style Meets Precision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Jammu's trusted optical showroom with 17+ years of expertise. Premium eyeglasses,
          sunglasses, and contact lenses — expertly fitted for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #e4c26e)' }}
          >
            Explore Collection
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full text-base font-semibold border-2 border-white text-white transition-all hover:bg-white hover:text-navy hover:scale-105"
            style={{ '--tw-text-opacity': 1 }}
          >
            Book Eye Test →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <ChevronDown
            size={28}
            className="animate-bounce text-gray-400 cursor-pointer"
            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </motion.div>
      </div>
    </section>
  )
}

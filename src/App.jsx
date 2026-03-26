import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Collections from './components/Collections'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <Collections />
      <Services />
      <WhyUs />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

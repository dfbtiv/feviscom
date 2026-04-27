import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Tryit from './components/Tryit'
import Learn from './components/Learn'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Hero />
      <Navbar />
      <HowItWorks />
      <Tryit />
      <Learn />
      <Footer />
    </div>
  )
}

export default App
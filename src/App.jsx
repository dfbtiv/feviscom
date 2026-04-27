import Navbar from './components/Navbar'
import Background from './components/Background'
import HowItWorks from './components/HowItWorks'
import Tryit from './components/Tryit'
import Learn from './components/Learn'
import Footer from './components/Footer'

function App() {
  const heroWrapper = "pt-48 px-8 max-w-5xl mx-auto flex flex-col items-center text-center min-h-[80vh]";
  const badgeStyle = "mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold flex items-center gap-2";
  const titleStyle = "text-5xl md:text-7xl font-extrabold text-slate-800 mb-6 tracking-tight leading-[1.1]";
  const buttonStyle = "px-10 py-4 bg-primary text-pure-white font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:scale-95";

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />

      {/* SECTION 1: HERO (ID: home) */}
      <main id="home" className={heroWrapper}>
        <div className={badgeStyle}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI Waste Detection engine
        </div>
        
        <h1 className={titleStyle}>
          Sort Smart. <br />
          <span className="text-primary">Save The Planet.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium">
          Instantly identify waste types and learn the correct disposal methods 
          with our advanced computer vision tool.
        </p>

        <button className={buttonStyle}>
          Try it now
        </button>
      </main>

      <HowItWorks />
      <Tryit />
      <Learn />
      <Footer />



    </div>
  )
}

export default App
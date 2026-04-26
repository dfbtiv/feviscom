import Navbar from './components/Navbar'
// import Card from './components/Card' 

function App() {
  return (
    <div className="relative min-h-[200vh] overflow-hidden">
      {/* bg */}
      <div className="absolute top-[-100px] left-[-200px] w-[739px] h-[805px] rounded-full opacity-80 bg-[rgba(195,233,86,0.40)] blur-[101px] -z-10"></div>
      <div className="absolute top-[300px] right-[-150px] w-[650px] h-[650px] rounded-full opacity-70 bg-[rgba(200,250,229,0.60)] blur-[135px] -z-10"></div>
      <div className="absolute bottom-[100px] left-[-250px] w-[913px] h-[913px] rounded-full opacity-80 bg-[rgba(240,253,250,0.50)] blur-[154px] -z-10"></div>
      
      <Navbar />

      <main className="pt-40 px-8 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-10 text-center">
          Sort Smart. Save The Planet.
        </h1>
      </main>

    </div>
  )
}

export default App
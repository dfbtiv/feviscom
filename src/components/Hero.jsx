import { ScanLine } from 'lucide-react';

const Hero = () => {
  const handleScroll = () => {
    document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-container">
      <div className="flex flex-col items-center w-full">
        
        {/* Badge */}
        <div className="hero-badge">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI Waste Detection Engine
        </div>
        
        {/* Title */}
        <h1 className="hero-title">
          Sort Smart. <span className="font-bold block md:inline">Save The Planet.</span>
        </h1>

        {/* Desc */}
        <p className="w-full max-w-[748px] text-primary/80 text-[16px] md:text-[20px] leading-relaxed mt-4 mb-8">
          Instantly identify waste types and learn the correct disposal methods 
          with our advanced computer vision tool.
        </p>

        {/* Action Button */}
        <button onClick={handleScroll} className="btn-hero">
          <ScanLine size={20} className="md:w-6 md:h-6" />
          Try it now 
        </button>

      </div>
    </section>
  );
};

export default Hero;
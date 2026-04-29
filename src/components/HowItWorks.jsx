import { ChevronLeft, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const sectionWrapper = "max-w-[1100px] mx-auto my-20 md:my-32 px-6 flex flex-col items-center relative overflow-hidden";
  
  // Card grid dengan snapping logic
  const cardGrid = "flex md:grid md:grid-cols-3 gap-6 w-full mt-12 overflow-x-auto md:overflow-hidden pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide";
  
  // Card style: min-w-[85%] biar user tau ada card selanjutnya di samping
  const stepCard = "glass-effect p-8 md:p-10 rounded-[32px] flex flex-col items-center text-center group transition-all duration-300 min-w-[85%] md:min-w-0 snap-center flex-shrink-0 border border-white/10";
  
  const iconCircle = "w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300";

  return (
    <section id="how-it-works" className={sectionWrapper}>
      {/* 1. Header */}
      <div className="text-center mb-4 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">How It Works</h2>
        <p className="text-primary/70 font-medium text-sm md:text-base">
          Three simple steps to smarter recycling and waste management.
        </p>
      </div>

      {/* 2. Mobile Arrows (Hidden on Desktop) */}
      <div className="flex md:hidden absolute top-[60%] left-2 right-2 justify-between pointer-events-none z-10">
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 animate-pulse">
          <ChevronLeft className="w-5 h-5 text-primary/40" />
        </div>
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 animate-pulse">
          <ChevronRight className="w-5 h-5 text-primary/40" />
        </div>
      </div>

      {/* 3. Cards Area */}
      <div className={cardGrid}>
        
        {/* Step 1: Capture */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-3">1. Capture</h3>
          <p className="text-primary/60 text-sm leading-relaxed">
            Snap a photo or upload an image of the waste item.
          </p>
        </div>

        {/* Step 2: AI Detects */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-3">2. AI Detects</h3>
          <p className="text-primary/60 text-sm leading-relaxed">
            Our computer vision model analyzes the material instantly.
          </p>
        </div>

        {/* Step 3: Eco Action */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-3">3. Eco Action</h3>
          <p className="text-primary/60 text-sm leading-relaxed">
            Get simple instructions on recycling and disposal.
          </p>
        </div>

      </div>

      {/* 4. Indicator Dots (Mobile Only) */}
      <div className="flex md:hidden gap-1.5 mt-2">
        <div className="w-6 h-1.5 bg-lime rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-primary/10 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-primary/10 rounded-full"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
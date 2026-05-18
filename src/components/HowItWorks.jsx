import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.85;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Styles section wrapper
  const sectionWrapper = "max-w-[1100px] mx-auto py-12 md:py-16 px-4 md:px-6 flex flex-col items-center relative scroll-mt-24";
  
  // Card Grid: Menggunakan snap-align untuk feel slider 
  const cardGrid = "flex md:grid md:grid-cols-3 gap-6 md:gap-8 w-full mt-8 md:mt-12 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide scroll-smooth";
  
  // Step Card: Penyesuaian ukuran font dan padding untuk layar kecil
  const stepCard = "glass-effect p-7 md:p-10 rounded-[32px] flex flex-col items-center text-center group transition-all duration-300 min-w-[85%] md:min-w-0 snap-center flex-shrink-0 border border-white/10 hover:border-white/20";
  
  const iconCircle = "w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-lime/20 transition-transform duration-300";

  return (
    <section id="how-it-works" className={sectionWrapper}>
      <div className="text-center mb-2 md:mb-4 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 font-['Segoe_UI']">How It Works</h2>
        <p className="text-primary/70 font-medium text-[13px] md:text-base max-w-[280px] md:max-w-full mx-auto">
          Three simple steps to smarter recycling and waste management.
        </p>
      </div>

      <div className="flex md:hidden absolute top-[60%] left-0 right-0 justify-between z-20 px-2 pointer-events-none">
        <button 
          onClick={() => scroll('left')}
          className="bg-white/40 backdrop-blur-md p-2.5 rounded-full border border-white/40 text-primary pointer-events-auto active:scale-90 transition-transform shadow-md"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="bg-white/40 backdrop-blur-md p-2.5 rounded-full border border-white/40 text-primary pointer-events-auto active:scale-90 transition-transform shadow-md"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className={cardGrid}>
        {/* Step 1 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 font-['Segoe_UI']">1. Capture</h3>
          <p className="text-primary/60 text-[13px] md:text-sm leading-relaxed">
            Snap a photo or upload an image of the waste item.
          </p>
        </div>

        {/* Step 2 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
             </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 font-['Segoe_UI']">2. AI Detects</h3>
          <p className="text-primary/60 text-[13px] md:text-sm leading-relaxed">
            Our computer vision model analyzes the material instantly.
          </p>
        </div>

        {/* Step 3 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 font-['Segoe_UI']">3. Eco Action</h3>
          <p className="text-primary/60 text-[13px] md:text-sm leading-relaxed">
            Get simple instructions on recycling and disposal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
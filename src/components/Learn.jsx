import { useState, useEffect } from 'react';
import { Leaf, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const sectionWrapper = "max-w-[1100px] mx-auto py-12 md:py-16 px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16 scroll-mt-24";
  const navigate = useNavigate();
  
  const [dbCategories, setDbCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [, setCurrentIndex] = useState(0);
  const colorVariants = [
    { bg: 'bg-blue-100/50', text: 'text-blue-600', border: 'border-blue-200/40' },
    { bg: 'bg-green-100/50', text: 'text-green-600', border: 'border-green-200/40' },
    { bg: 'bg-red-100/50', text: 'text-red-600', border: 'border-red-200/40' },
  ];

  const handleImpactClick = () => {
    navigate('/impact');
    window.scrollTo(0, 0); 
  };

  const categories = [
    { name: 'Plastics', color: 'bg-blue-100/50', textColor: 'text-blue-600' },
    { name: 'Organic', color: 'bg-green-100/50', textColor: 'text-green-600' },
    { name: 'E-Waste', color: 'bg-red-100/50', textColor: 'text-red-600' },
    { name: 'Paper', color: 'bg-yellow-100/50', textColor: 'text-yellow-600' },
  ];

  return (
    <section id="learn" className={sectionWrapper}>
      
      {/* Container Kiri: Teks & Button */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 md:w-[55%]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-medium uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /> Plastic Waste Hub
        </div>
        
        <h2 className="text-[32px] md:text-5xl font-extrabold text-primary leading-[1.2] md:leading-tight font-['Segoe_UI']">
          Not all plastics are created equal.
        </h2>
        
        <p className="text-primary/70 leading-relaxed text-sm md:text-lg max-w-[320px] md:max-w-full">
          Understanding waste categories ensures proper disposal. Our guide helps you identify materials and make eco-friendly choices.
        </p>

        <button 
          onClick={handleImpactClick}
          className="group w-full md:w-fit flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 text-sm md:text-base font-['Segoe_UI'] cursor-pointer"
        >
          Our Impact Goals
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Container Kanan: Grid Categories */}
      <div className="w-full md:w-[45%] grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-0">
        {categories.map((cat) => (
          <div 
            key={cat.name} 
            className={`${cat.color} aspect-square rounded-[24px] md:rounded-[32px] flex items-center justify-center shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer border border-white/50 group backdrop-blur-sm`}
          >
            <span className={`font-bold text-sm md:text-lg ${cat.textColor} group-hover:scale-110 transition-transform font-['Segoe_UI']`}>
              {cat.name}
            </span>
          </div>
        )}
      </div>
      
    </section>
  );
};

export default Learn;
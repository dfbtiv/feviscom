import { useState, useEffect } from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
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

  // 1. Fetch data dari DB (Simulasi 7 kategori)
  useEffect(() => {
    const fetchFromDB = () => {
      const mockData = [
        { id: 1, name: 'Plastics', image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600' },
        { id: 2, name: 'Organic', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500' },
        { id: 3, name: 'E-Waste', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500' },
        { id: 4, name: 'Paper', image: 'https://images.unsplash.com/photo-1603481546238-487240415921?w=500' },
        { id: 5, name: 'Glass', image: 'https://images.unsplash.com/photo-1577705993359-8771912555b2?w=500' },
        { id: 6, name: 'Metal', image: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?w=500' },
        { id: 7, name: 'Hazardous', image: 'https://images.unsplash.com/photo-1584438784894-089d6a128f3e?w=500' },
      ];
      setDbCategories(mockData);
      setVisibleCategories(mockData.slice(0, 3));
      setIsLoading(false);
    };

    setTimeout(fetchFromDB, 500);
  }, []);

  // 2. Logika Auto-Loop Bento ganti tiap 5 Detik
  useEffect(() => {
    if (dbCategories.length <= 3) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % dbCategories.length;
        
        const updatedItems = [];
        for (let i = 0; i < 3; i++) {
          const targetIndex = (nextIndex + i) % dbCategories.length;
          updatedItems.push(dbCategories[targetIndex]);
        }
        
        setVisibleCategories(updatedItems);
        return nextIndex;
      });
    }, 5000); 

    return () => clearInterval(interval); 
  }, [dbCategories]);

  return (
    <section id="learn" className={sectionWrapper}>
      
      {/* Container Kiri: Teks Judul & Tombol */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 md:w-[40%]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-medium uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /> Environmental Awareness
        </div>
        
        <h2 className="text-[32px] md:text-5xl font-extrabold text-primary leading-[1.2] md:leading-tight font-['Segoe_UI']">
          Knowledge is the key to sustainability.
        </h2>
        
        <p className="text-primary/70 leading-relaxed text-sm md:text-base max-w-[320px] md:max-w-full">
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

      <div className="w-full md:w-[60%]">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-primary/60 font-semibold text-sm">
            Loading categories into bento...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
            {visibleCategories.map((cat, index) => {
              const variant = colorVariants[index];
              const isFirstCard = index === 0;

              return (
                <div 
                  key={cat.id}
                  onClick={handleImpactClick} 
                  className={`relative flex flex-col overflow-hidden rounded-[24px] md:rounded-[32px] shadow-xs hover:shadow-xl hover:scale-[1.01] transition-all duration-700 cursor-pointer border bg-white/40 backdrop-blur-xs group ${variant.border} ${
                    isFirstCard ? 'col-span-2 aspect-[21/10]' : 'col-span-1 aspect-square'
                  }`}
                >
                  {/* Foto Background */}
                  <div className="absolute inset-0 w-full h-full bg-slate-100 z-0">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  
                  {/* Label Kategori */}
                  <div className="relative z-10 mt-auto p-4 md:p-6 flex items-center justify-between">
                    <div className={`px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm font-['Segoe_UI'] shadow-sm ${variant.bg} ${variant.text}`}>
                      {cat.name}
                    </div>
                    
                    {/* Mengubah gaya panah agar selalu terlihat sebagai penanda kalau card-nya clickable */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 text-white group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
    </section>
  );
};

export default Learn;
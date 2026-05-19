import { Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const navigate = useNavigate();

  const handleImpactClick = () => {
    navigate('/impact');
    window.scrollTo(0, 0); 
  };

  return (
    <section id="learn" className="max-w-[1100px] mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 scroll-mt-24">
      
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-14 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-medium uppercase tracking-wider mb-4">
          <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /> Edukasi Lingkungan
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-4 md:mb-6 font-['Segoe_UI']">
          Pilah Dengan Benar, Bumi Segar
        </h2>
        
        <p className="text-primary/70 leading-relaxed text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8 px-2">
          Setiap sampah plastik punya cara kelola yang berbeda. Biarkan EcoVision mengenali jenis plastiknya dan berikan panduan daur ulang yang paling tepat untukmu
        </p>

        <button 
          onClick={handleImpactClick}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 text-sm md:text-base font-['Segoe_UI'] cursor-pointer"
        >
          Pelajari Lebih Lanjut
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
    </section>
  );
};

export default Learn;
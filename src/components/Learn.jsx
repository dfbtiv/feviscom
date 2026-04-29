import { Leaf, ArrowRight } from 'lucide-react';

const Learn = () => {
  // Mengubah flex-col menjadi flex-row dan menambahkan gap antar container
  const sectionWrapper = "max-w-[1100px] mx-auto my-16 px-8 flex flex-col md:flex-row items-center gap-16 scroll-mt-10";
  
  const categories = [
    { name: 'Plastics', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { name: 'Organic', color: 'bg-green-100', textColor: 'text-green-600' },
    { name: 'E-Waste', color: 'bg-red-100', textColor: 'text-red-600' },
    { name: 'Paper', color: 'bg-yellow-100', textColor: 'text-yellow-600' },
  ];

  return (
    <section id="learn" className={sectionWrapper}>
      
      {/* 1. Container Kiri: Teks & Button (Lebar lebih besar sedikit) */}
      <div className="flex flex-col items-start text-left space-y-6 md:w-[55%]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <Leaf className="w-4 h-4" /> Environmental Awareness
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
          Knowledge is the key to sustainability.
        </h2>
        
        <p className="text-primary/70 leading-relaxed text-lg">
          Understanding waste categories ensures proper disposal. Our guide helps you identify materials and make eco-friendly choices.
        </p>

        <button className="flex items-center gap-2 px-8 py-4 bg-lime text-primary font-bold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group shadow-lg shadow-lime/20">
          Learn More 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 2. Container Kanan: Category Grid (Lebar sisa) */}
      <div className="w-full md:w-[45%] grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.name} 
            className={`${cat.color} aspect-square rounded-[32px] flex items-center justify-center shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer border border-white/50 group`}
          >
            <span className={`font-bold text-lg ${cat.textColor} group-hover:scale-110 transition-transform`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Learn;
import { Leaf, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const sectionWrapper = "max-w-[1100px] mx-auto py-12 md:py-16 px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16 scroll-mt-24";
  const navigate = useNavigate();
  
  const handleImpactClick = () => {
    navigate('/impact');
    window.scrollTo(0, 0); 
  };

  // Diubah menjadi sub-kategori plastik yang fokus dan berbobot edukasi
  const plasticTypes = [
    { 
      code: '1', 
      name: 'PET / PETE', 
      desc: 'Botol air, botol soda', 
      color: 'bg-blue-50/60 border-blue-200', 
      textColor: 'text-blue-600',
      badge: 'Daur Ulang Tinggi'
    },
    { 
      code: '2', 
      name: 'HDPE', 
      desc: 'Botol susu, botol shampoo', 
      color: 'bg-emerald-50/60 border-emerald-200', 
      textColor: 'text-emerald-600',
      badge: 'Aman & Kaku'
    },
    { 
      code: '4', 
      name: 'LDPE', 
      desc: 'Kantong plastik, wrap', 
      color: 'bg-amber-50/60 border-amber-200', 
      textColor: 'text-amber-600',
      badge: 'Lentur / Fleksibel'
    },
    { 
      code: '5', 
      name: 'PP', 
      desc: 'Tutup botol, wadah makanan', 
      color: 'bg-purple-50/60 border-purple-200', 
      textColor: 'text-purple-600',
      badge: 'Tahan Panas'
    },
  ];

  return (
    <section id="learn" className={sectionWrapper}>
      
      {/* Container Kiri: Teks & Button (Disesuaikan narasinya ke Plastik) */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 md:w-[50%]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-medium uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /> Plastic Waste Hub
        </div>
        
        <h2 className="text-[32px] md:text-5xl font-extrabold text-primary leading-[1.2] md:leading-tight font-['Segoe_UI']">
          Not all plastics are created equal.
        </h2>
        
        <p className="text-primary/70 leading-relaxed text-sm md:text-base max-w-[360px] md:max-w-full">
          Setiap jenis plastik memiliki karakteristik dan dampak lingkungan yang berbeda. Pahami kode resin di bawah ini untuk membantu AI mengenali dan memilah sampah plastik dengan benar.
        </p>

        <button 
          onClick={handleImpactClick}
          className="group w-full md:w-fit flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 text-sm md:text-base font-['Segoe_UI']"
        >
          Our Impact Goals
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Container Kanan: Grid Jenis Plastik yang Lebih Informatif */}
      <div className="w-full md:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 md:mt-0">
        {plasticTypes.map((type) => (
          <div 
            key={type.name} 
            className={`${type.color} p-5 rounded-[24px] flex flex-col justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all border group backdrop-blur-sm relative overflow-hidden`}
          >
            {/* Angka Kode Resin Besar Samar di Background */}
            <div className="absolute -bottom-4 -right-2 text-7xl font-black opacity-[0.06] select-none pointer-events-none font-['Segoe_UI']">
              {type.code}
            </div>

            <div>
              {/* Badge kecil status */}
              <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border mb-3 ${type.textColor}`}>
                Code {type.code} • {type.badge}
              </span>
              
              <h3 className="font-black text-lg text-gray-800 font-['Segoe_UI'] mb-1">
                {type.name}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {type.desc}
              </p>
            </div>

            {/* Link aksi kecil pemanis UI */}
            <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity ${type.textColor}`}>
              <Info size={14} /> Detail Karakteristik
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Learn;
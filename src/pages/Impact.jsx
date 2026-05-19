import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Footer from '../components/Footer';

const Impact = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const styles = {
    heroWrapper: "relative z-10 flex flex-col items-center max-w-6xl mx-auto px-4 sm:px-8 pt-[120px] sm:pt-[140px] pb-12",
    sectionWrapper16: "w-full py-10", 
    sectionWrapper10: "w-full pt-8 pb-4", 
    title: "text-primary text-center font-['Segoe_UI'] text-4xl sm:text-[45px] md:text-[75px] font-normal leading-[1.1] tracking-[-1px] md:tracking-[-4.8px]",
    titleBold: "font-bold",
    description: "w-full max-w-[748px] text-primary/80 text-center font-['Segoe_UI'] text-base sm:text-[18px] md:text-[20px] font-normal leading-relaxed mt-4",
    glassCard: "w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-xl shadow-black/5 transition-all hover:bg-white/50 font-['Segoe_UI']",
    matrixCard: "snap-center glass-effect p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex flex-col items-center text-center group transition-all duration-300 w-[85%] sm:w-[45%] md:w-[calc(33.333%-1rem)] flex-shrink-0 border border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/40 backdrop-blur-md font-['Segoe_UI']",
    button: "px-6 sm:px-10 py-3 sm:py-4 bg-primary text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:scale-95 flex items-center gap-2 sm:gap-4 font-['Segoe_UI'] text-sm sm:text-base",
    navBtn: "p-2.5 sm:p-3 rounded-full bg-white/60 backdrop-blur-md border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90",
  };

  // 1. PATH GAMBAR SUDAH DIARAHKAN KE FOLDER PUBLIC LOKAL
  // Pastikan nama file di folder public/images/ kamu sama persis dengan di bawah ya!
  const plasticMatrix = [
    { 
      name: 'Botol Plastik', 
      recyclability: 'Sangat Mudah', 
      image: '/images/botol.png' 
    },
    { 
      name: 'Kantong Kresek', 
      recyclability: 'Lumayan Sulit', 
      image: '/images/kresek.png' 
    },
    { 
      name: 'Bungkus Kemasan', 
      recyclability: 'Sulit', 
      image: '/images/snack.png' 
    },
    { 
      name: 'Gelas Plastik', 
      recyclability: 'Mudah', 
      image: '/images/gelas.png' 
    },
    { 
      name: 'Tutup Botol', 
      recyclability: 'Mudah', 
      image: '/images/tutupbotol.png' 
    },
    { 
      name: 'Sedotan Plastik', 
      recyclability: 'Lumayan Sulit', 
      image: '/images/sedotan.png' 
    },
    { 
      name: 'Styrofoam', 
      recyclability: 'Lumayan Sulit', 
      image: '/images/styrofoam.png' 
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      sliderRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div className="relative z-50"><Navbar /></div>
      <Background />

      <main className={styles.heroWrapper}>
        {/* SECTION 1: HEADER */}
        <header className="flex flex-col items-center w-full mb-12 sm:mb-16">
          <h1 className={styles.title}>
            <span className={styles.titleBold}>EcoVision:</span> Solusi Pintar Plastik
          </h1>
          <p className={styles.description}>
            Teknologi yang menggabungkan YOLOv8 untuk mendeteksi sampah plastik secara real-time, plus AI Generatif yang berguna untuk memberi informasi daur ulang yang mudah untuk diterapkan di rumah.
          </p>
        </header>

        {/* SECTION 2: SDG CARD */}
        <section className={styles.glassCard + " flex flex-col md:flex-row gap-6 sm:gap-8 items-start border-l-[6px] border-l-emerald-600 text-left"}>
          <div className="bg-emerald-50 p-4 rounded-3xl flex items-center justify-center min-w-[70px] sm:min-w-[80px] h-[70px] sm:h-[80px] shadow-inner">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-emerald-600 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lime-800 text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Dukung Misi Global (SDG 12 & 14)</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                Dukung kebiasaan daur ulang cerdas (SDG 12.5) dan lindungi lautan dari mikroplastik (SDG 14.1). EcoVision bantu kamu memilah sampah plastik dengan tepat sejak awal, mencegahnya berakhir menumpuk begitu saja di TPA
            </p>
            <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold text-sm inline-flex items-center gap-2 hover:underline">
              <Globe size={16} /> Lihat Detail SDG PBB
            </a>
          </div>
        </section>

        {/* SECTION 3: PLASTIC MATRIX SLIDER */}
        <section className={styles.sectionWrapper16}>
          <div className="flex justify-between items-end w-full mb-6 sm:mb-8">
            <div className="flex-1 text-left">
              <h2 className="text-lime-800 text-xl sm:text-2xl font-bold">Apa Saja yang Bisa Kamu Deteksi?</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Geser untuk melihat semua kategori</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={scrollLeft} className={styles.navBtn}><ChevronLeft size={20} /></button>
              <button onClick={scrollRight} className={styles.navBtn}><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="relative w-full"> 
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory subtle-scrollbar scroll-smooth"
            >
              {plasticMatrix.map((item, idx) => (
                <div key={idx} className={styles.matrixCard}>
                  {/* FOTO */}
                  <div className="bg-white p-2 rounded-2xl shadow-md transition-transform mb-4 md:mb-6 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center overflow-hidden border border-white/40 group-hover:-translate-y-2 group-hover:shadow-lg">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-xl"
                      // Jika file gambar belum kamu taruh di public, dia otomatis pakai fallback tulisan di bawah ini:
                      onError={(e) => { e.target.src = `https://placehold.co/200x200/e2f9cc/4d7111?text=${item.name.replace(" ", "+")}` }}
                    />
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg md:text-xl mb-2 text-center">{item.name}</h3>
                  
                  {/* LABEL KONTEKS DAUR ULANG (Sudah ditambahkan teks penjelas) */}
                  <div className="w-full mt-auto">
                    <div className="flex flex-col items-center pt-4 border-t border-primary/10 gap-2">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Kemudahan Daur Ulang</span>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${
                        item.recyclability.includes('Nggak') || item.recyclability.includes('Sulit') 
                          ? 'bg-rose-50 border-rose-200 text-rose-600' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      }`}>
                        {item.recyclability}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: RETURN BUTTON */}
        <div className={styles.sectionWrapper10}>
          <div className="flex flex-col items-center mb-1">
            <button onClick={() => {navigate('/'); window.scrollTo(0,0);}} className={styles.button}>
              <ArrowLeft size={20} /> Kembali ke Beranda
            </button>
          </div>
        </div>
      </main>

      <Footer className="pb-10" />
    </div>
  );
};

export default Impact;
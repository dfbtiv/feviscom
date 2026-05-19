import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Info, ArrowLeft, ChevronRight, Trash, ChevronLeft } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Footer from '../components/Footer';

const Impact = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const styles = {
    heroWrapper: "relative z-10 flex flex-col items-center max-w-6xl mx-auto px-8 pt-[140px] pb-12",
    sectionWrapper16: "w-full py-10", 
    sectionWrapper10: "w-full pt-8 pb-4", 
    badge: "px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold flex items-center gap-2 cursor-default mb-4 font-['Segoe_UI']",
    title: "text-primary text-center font-['Segoe_UI'] text-[45px] md:text-[75px] font-normal leading-[1.1] tracking-[-2px] md:tracking-[-4.8px]",
    titleBold: "font-bold",
    description: "w-full max-w-[748px] text-primary/80 text-center font-['Segoe_UI'] text-[18px] md:text-[20px] font-normal leading-relaxed mt-4",
    glassCard: "w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-[40px] p-8 md:p-10 shadow-xl shadow-black/5 transition-all hover:bg-white/50 font-['Segoe_UI']",
    matrixCard: "glass-effect p-8 md:p-10 rounded-[40px] flex flex-col items-center text-center group transition-all duration-300 min-w-[85%] md:min-w-[calc(33.333%-1.5rem)] flex-shrink-0 border border-white/10 hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/40 backdrop-blur-md font-['Segoe_UI']",
    button: "px-10 py-4 bg-primary text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:scale-95 flex items-center gap-4 font-['Segoe_UI']",
    navBtn: "p-3 rounded-full bg-white/50 border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30",
  };

  // Matriks disesuaikan ke bahasa yang lebih santai & mudah dimengerti
  const plasticMatrix = [
    { name: 'Botol PET (Kode 1)', recyclability: 'Sangat Mudah', tech: 'Deteksi lengkung botol', icon: <Trash className="text-blue-500" /> },
    { name: 'Botol HDPE (Kode 2)', recyclability: 'Sangat Mudah', tech: 'Pemetaan bodi tebal', icon: <Trash className="text-emerald-500" /> },
    { name: 'Kantong Kresek (Kode 4)', recyclability: 'Lumayan Susah', tech: 'Deteksi tekstur & lipatan', icon: <Trash className="text-slate-400" /> },
    { name: 'Gelas Cup PP (Kode 5)', recyclability: 'Bisa Didaur Ulang', tech: 'Analisis transparansi', icon: <Trash className="text-purple-500" /> },
    { name: 'Sedotan Plastik', recyclability: 'Nggak Bisa', tech: 'Deteksi pola lurus', icon: <Trash className="text-rose-500" /> },
  ];

  const isSlider = plasticMatrix.length > 3;
  const maxIndex = Math.max(0, plasticMatrix.length - 3);

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div className="relative z-50"><Navbar /></div>
      <Background />

      <main className={styles.heroWrapper}>
        {/* SECTION 1: HEADER */}
        <header className="flex flex-col items-center w-full mb-16">
          <div className={styles.badge}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Dampak Nyata Kami
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleBold}>EcoVision:</span> Solusi Pintar Plastik
          </h1>
          <p className={styles.description}>
            Inisiatif canggih yang gabungin YOLOv8 buat deteksi sampah plastik secara real-time, plus AI Generatif buat ngasih contekan daur ulang yang gampang diterapin di rumah.
          </p>
        </header>

        {/* SECTION 2: SDG CARD */}
        <section className={styles.glassCard + " flex flex-col md:flex-row gap-8 items-start border-l-[6px] border-l-emerald-600 text-left"}>
          <div className="bg-emerald-50 p-4 rounded-3xl flex items-center justify-center min-w-[80px] h-[80px] shadow-inner">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-600 flex items-center justify-center">
              <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lime-800 text-2xl font-bold mb-3">Dukung Misi Global (SDG 12 & 14)</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
              Membangun kebiasaan daur ulang yang lebih baik (SDG 12.5) dan cegah mikroplastik bocor ke lautan (SDG 14.1). Dengan deteksi AI otomatis, kita bantu pisahin sampah plastik sebelum akhirnya cuma numpuk di TPA.
            </p>
            <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold text-sm inline-flex items-center gap-2 hover:underline">
              <Globe size={16} /> Lihat Detail SDG PBB
            </a>
          </div>
        </section>

        {/* SECTION 3: PLASTIC MATRIX SLIDER */}
        <section className={styles.sectionWrapper16}>
          <div className="flex justify-between items-end w-full mb-8">
            <div className="flex-1 text-left">
              <h2 className="text-lime-800 text-2xl font-bold">Jenis Plastik yang Terdeteksi</h2>
              <p className="text-slate-500 text-sm">Gimana cara AI kita ngenalin berbagai macam bentuk plastik</p>
            </div>
            {isSlider && (
              <div className="flex gap-2">
                <button onClick={prevSlide} className={styles.navBtn}><ChevronLeft size={18} /></button>
                <button onClick={nextSlide} className={styles.navBtn}><ChevronRight size={18} /></button>
              </div>
            )}
          </div>

          <div className="relative w-full overflow-hidden"> 
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: isSlider ? `translateX(-${currentIndex * (100 / 3.05)}%)` : 'none' }}
            >
              {plasticMatrix.map((item, idx) => (
                <div key={idx} className={styles.matrixCard}>
                  <div className="bg-white/80 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-xl mb-4 text-center">{item.name}</h3>
                  <div className="w-full space-y-4 mt-auto">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-slate-400 italic">Daur Ulang</span>
                      {/* Penyesuaian warna teks berdasar kata kunci Nggak/Susah */}
                      <span className={item.recyclability.includes('Nggak') || item.recyclability.includes('Susah') ? 'text-rose-600' : 'text-emerald-600'}>
                        {item.recyclability}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] border-t border-primary/10 pt-4 pb-2">
                      <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                        <Info size={12} className="text-primary/40"/> Trik Analisis AI
                      </span>
                      <span className="text-primary/70 font-semibold">{item.tech}</span>
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
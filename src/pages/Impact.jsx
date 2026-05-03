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

  const wasteMatrix = [
    { name: 'Botol Plastik', recyclability: 'Highly Recyclable', tech: 'Structural contouring', icon: <Trash className="text-blue-500" /> },
    { name: 'Kantong Kresek', recyclability: 'Hard to Recycle', tech: 'Texture & Fold mapping', icon: <Trash className="text-slate-400" /> },
    { name: 'Bungkus Kemasan', recyclability: 'Non-Recyclable', tech: 'Multi-layer pattern', icon: <Trash className="text-rose-500" /> },
    { name: 'Kaca Bening', recyclability: 'Highly Recyclable', tech: 'Refractive Analysis', icon: <Trash className="text-emerald-500" /> },
    { name: 'Kardus Bekas', recyclability: 'Recyclable', tech: 'Fiber recognition', icon: <Trash className="text-amber-600" /> },
  ];

  const isSlider = wasteMatrix.length > 3;
  const maxIndex = Math.max(0, wasteMatrix.length - 3);

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div className="relative z-50"><Navbar /></div>
      <Background />

      <main className={styles.heroWrapper}>
        {/* SECTION 1: HEADER (Jarak ke bawah: 16) */}
        <header className="flex flex-col items-center w-full mb-16">
          <div className={styles.badge}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Impact Goals
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleBold}>Ecovision:</span> AI Sustainability
          </h1>
          <p className={styles.description}>
            A Software Engineering initiative utilizing YOLOv8 for real-time waste detection 
            and Generative AI for personalized waste handling insights.
          </p>
        </header>

        {/* SECTION 2: SDG CARD (Jarak ke bawah: 16) */}
        <section className={styles.glassCard + " flex flex-col md:flex-row gap-8 items-start border-l-[6px] border-l-red-500 text-left"}>
          <div className="bg-red-50 p-4 rounded-3xl flex items-center justify-center min-w-[80px] h-[80px] shadow-inner">
            <div className="w-10 h-10 rounded-full border-4 border-red-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lime-800 text-2xl font-bold mb-3">Our Contribution to SDG 12</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
              Target 12.5: By 2030, substantially reduce waste generation melalui pencegahan, 
              pengurangan, daur ulang, dan penggunaan kembali.
            </p>
            <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" className="text-red-500 font-bold text-sm inline-flex items-center gap-2 hover:underline">
              <Globe size={16} /> View Full UN Target Data
            </a>
          </div>
        </section>

        {/* SECTION 3: WASTE MATRIX SLIDER (Jarak ke bawah: 10) */}
        <section className={styles.sectionWrapper16}>
          <div className="flex justify-between items-end w-full mb-8">
            <div className="flex-1 text-left">
              <h2 className="text-lime-800 text-2xl font-bold">Waste Intelligence Matrix</h2>
              <p className="text-slate-500 text-sm">AI-Powered classification systems</p>
            </div>
            {isSlider && (
              <div className="flex gap-2">
                <button onClick={prevSlide} className={styles.navBtn}><ChevronLeft size={18} /></button>
                <button onClick={nextSlide} className={styles.navBtn}><ChevronRight size={18} /></button>
              </div>
            )}
          </div>

          <div className="relative w-full overflow-visible"> 
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: isSlider ? `translateX(-${currentIndex * (100 / 3.05)}%)` : 'none' }}
            >
              {wasteMatrix.map((item, idx) => (
                <div key={idx} className={styles.matrixCard}>
                  <div className="bg-white/80 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-xl mb-4">{item.name}</h3>
                  <div className="w-full space-y-4 mt-auto">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-slate-400 italic">Recyclability</span>
                      <span className={item.recyclability.includes('Non') ? 'text-rose-600' : 'text-emerald-600'}>{item.recyclability}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] border-t border-primary/10 pt-4 pb-2">
                      <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                        <Info size={12} className="text-primary/40"/> AI Role
                      </span>
                      <span className="text-primary/70 font-semibold">{item.tech}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: RETURN BUTTON (Jarak ke Footer: 6) */}
        <div className={styles.sectionWrapper10}>
          <div className="flex flex-col items-center mb-1"> {/* mb-6 untuk jarak skala 6 ke footer */}
            <button onClick={() => {navigate('/'); window.scrollTo(0,0);}} className={styles.button}>
              <ArrowLeft size={20} /> Return to Home
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER (Padding Bottom 10) */}
      <Footer className="pb-10" />
    </div>
  );
};

export default Impact;
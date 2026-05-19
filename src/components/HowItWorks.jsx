import { Sparkles } from 'lucide-react'; // Boleh pakai icon lain kalau mau variasi

const HowItWorks = () => {
  // Styles
  const sectionWrapper = "max-w-[1100px] mx-auto py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center relative scroll-mt-24";
  
  // Perubahan utama di sini: Pakai flex-col untuk mobile, grid untuk desktop. 
  // Hapus semua utility scroll dan snap.
  const cardGrid = "flex flex-col md:grid md:grid-cols-3 gap-6 sm:gap-8 w-full mt-8 sm:mt-10 md:mt-12";
  
  // Hapus min-w dan snap-center, biarkan width-nya full mengikuti flex-col
  const stepCard = "glass-effect p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[32px] flex flex-col items-center text-center group transition-all duration-300 border border-white/10 hover:border-white/20 w-full";
  
  const iconCircle = "w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-lime/20 transition-transform duration-300";

  return (
    <section id="how-it-works" className={sectionWrapper}>
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 font-['Segoe_UI']">Gimana sih cara kerjanya?</h2>
        <p className="text-primary/70 font-medium text-sm sm:text-base max-w-sm md:max-w-full mx-auto">
          Kelola sampah nggak perlu ribet. Ikuti tiga langkah simpel ini untuk memulai!
        </p>
      </div>

      <div className={cardGrid}>
        {/* Step 1 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-['Segoe_UI']">1. Ambil Foto</h3>
          
          {/* CLASSNAME DIUPDATE DI SINI */}
          <p className="text-primary/80 text-base font-medium leading-relaxed">
            Cukup jepret langsung foto sampahmu, atau unggah gambarnya dari galeri.
          </p>
        </div>

        {/* Step 2 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
             </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-['Segoe_UI']">2. Deteksi Sampah</h3>
          
          {/* CLASSNAME DIUPDATE DI SINI */}
          <p className="text-primary/80 text-base font-medium leading-relaxed">
            Sistem AI kami akan memproses dan mengenali jenis sampah plastikmu.
          </p>
        </div>

        {/* Step 3 */}
        <div className={stepCard}>
          <div className={iconCircle}>
             <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-['Segoe_UI']">3. Langkah Nyata</h3>
          
          {/* CLASSNAME DIUPDATE DI SINI */}
          <p className="text-primary/80 text-base font-medium leading-relaxed">
            Dapatkan panduan praktis ke mana harus membuangnya atau ide daur ulang yang menarik!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
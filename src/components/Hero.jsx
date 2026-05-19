import { ScanLine } from 'lucide-react';

const Hero = () => {
  const handleScroll = () => {
    document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-container">
      <div className="flex flex-col items-center w-full">
        
        {/* Badge */}
        <div className="hero-badge">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Teknologi AI Pendeteksi Sampah Plastik
        </div>
        
        {/* Title */}
        <h1 className="hero-title">
          Kenali Dulu. <span className="font-bold block md:inline">Kelola Kemudian.</span>
        </h1>

        {/* Desc */}
        <p className="w-full max-w-[748px] text-primary/80 text-base sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6 mb-6 sm:mb-8 px-2">
          Identifikasi 7 jenis sampah plastik harianmu seketika menggunakan AI. Mulai dari botol plastik hingga styrofoam, pelajari langkah daur ulangnya yang tepat hanya lewat satu jepretan.
        </p>

        {/* Action Button */}
        <button onClick={handleScroll} className="btn-hero">
          <ScanLine size={20} className="md:w-6 md:h-6" />
          Coba Scan Sekarang 
        </button>

      </div>
    </section>
  );
};

export default Hero;
import { ScanLine } from 'lucide-react';

const Hero = () => {
  // Menambahkan px-6 untuk mobile agar teks tidak menyentuh pinggir layar
  const heroWrapper = "flex flex-col items-center text-center min-h-[90vh] pt-[160px] md:pt-[200px] pb-16 px-6 md:px-8 max-w-6xl mx-auto relative z-10";
  
  const badgeStyle = "px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[12px] md:text-sm font-semibold flex items-center gap-2 cursor-default mb-2";
  
  // Ukuran font diturunkan drastis untuk mobile (text-[40px]) dan tetap besar di desktop (md:text-[75px])
  const titleStyle ="text-primary text-center font-['Segoe_UI'] text-[38px] md:text-[75px] font-normal leading-[1.2] md:leading-[1.1] tracking-[-1.5px] md:tracking-[-4.8px]";
  const titleBoldStyle ="font-bold block md:inline"; // Menjadikan "Save The Planet" baris baru di mobile
  
  // Deskripsi disesuaikan ukurannya agar proporsional
  const descStyle = "w-full max-w-[748px] text-primary/80 text-center font-['Segoe_UI'] text-[16px] md:text-[20px] font-normal leading-relaxed mt-4 mb-8";
  
  const buttonStyle = "px-8 py-3.5 md:px-10 md:py-4 bg-lime text-primary font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-lime/90 hover:-translate-y-1 active:scale-95 text-sm md:text-base flex items-center gap-4 cursor-pointer";

  return (
    <section id="home" className={heroWrapper}>
      <div className="flex flex-col items-center w-full">
        {/* Badge */}
        <div className={badgeStyle}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI Waste Detection engine
        </div>
        
        {/* Title */}
        <h1 className={titleStyle}>
          Sort Smart. <span className={titleBoldStyle}>Save The Planet.</span>
        </h1>

        {/* Desc */}
        <p className={descStyle}>
          Instantly identify waste types and learn the correct disposal methods 
          with our advanced computer vision tool.
        </p>

        {/* Button */}
        <button 
          onClick={() => {
            const element = document.getElementById('try-it');
            element?.scrollIntoView({ behavior: 'smooth' });
          }} 
          className={buttonStyle}
        >
          <ScanLine size={20} className="md:w-6 md:h-6" />
          Try it now 
        </button>
      </div>
    </section>
  );
};

export default Hero;
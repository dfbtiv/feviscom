import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Upload, Camera } from 'lucide-react';

const Tryit = () => {
  const [activeBtn, setActiveBtn] = useState('upload'); 
  
  const btnItems = [
    { id: 'upload', label: 'Upload', icon: <Upload size={18} /> }, // Label diperpendek buat mobile
    { id: 'camera', label: 'Camera', icon: <Camera size={18} /> },
  ];

  const styles = {
    card: "w-full max-w-[650px] md:aspect-[16/10] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 flex flex-col items-center justify-center border border-white/20 shadow-xl",
    dropZone: "w-full h-full border-2 border-dashed border-primary/20 rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center p-6 md:p-8 group cursor-pointer hover:border-primary/40 transition-all duration-300",
    navContainer: "relative flex flex-row gap-1 p-1 bg-primary/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-primary/10 w-full md:w-fit mx-auto",
    button: "relative flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-bold z-10 outline-none select-none transition-all duration-300 cursor-pointer"
  };

  return (
    <section id="try-it" className="max-w-[1024px] mx-auto my-16 md:my-32 px-5 md:px-8 flex flex-col items-center">
      
      {/* 1. Header - Font size lebih kecil di mobile */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">AI Waste Detection</h2>
        <p className="text-primary/70 font-medium text-sm md:text-base">Identify waste type and learn how to dispose of it.</p>
      </div>

      {/* 2. Main Card */}
      <div className={styles.card}>
        <div className={styles.dropZone}>
          
          {/* Floating Icon - Ukuran icon lebih kecil di mobile */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <ImagePlus size={35} className="text-primary/50 md:w-[45px] md:h-[45px]" />
          </div>

          <div className="space-y-1 mb-8 md:mb-10 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-primary">Drop your image here</h4>
            <p className="text-primary/60 text-xs md:text-sm">Supports JPG, PNG.</p>
          </div>
          
          {/* 3. Sliding Toggle */}
          <div className={styles.navContainer}>
            {btnItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveBtn(item.id)} 
                className={styles.button}
              >
                <span className={`relative z-20 flex items-center gap-2 transition-colors duration-500 ${
                  activeBtn === item.id ? 'text-primary' : 'text-primary/60'
                }`}>
                  {item.icon}
                  {item.label}
                </span>

                {/* Sliding Highlight */}
                {activeBtn === item.id && (
                  <motion.div
                    layoutId="active-pill" 
                    className="absolute inset-0 bg-lime rounded-lg md:rounded-xl z-10 shadow-lg shadow-lime/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Tryit;
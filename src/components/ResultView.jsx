import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCcw, Info, Leaf } from 'lucide-react';

const ResultView = ({ result, image, onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[800px] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Sisi Kiri: Visual */}
        <div className="w-full md:w-1/2 space-y-5">
          <div className="relative aspect-[4/5] md:aspect-square rounded-[28px] overflow-hidden border-2 border-lime/30 shadow-lg bg-black/5">
            <img src={image} alt="Detection" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-primary/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
               <div className="flex justify-between items-center text-white">
                  <span className="text-xs font-medium opacity-80">AI Confidence</span>
                  <span className="text-sm font-bold">{(result.confidence * 100).toFixed(0)}%</span>
               </div>
               <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence * 100}%` }}
                    className="h-full bg-lime"
                  />
               </div>
            </div>
          </div>
          
          <button 
            onClick={onReset}
            className="w-full py-4 flex items-center justify-center gap-3 bg-white/50 hover:bg-white/80 text-primary font-bold rounded-2xl transition-all border border-white/50 shadow-sm"
          >
            <RefreshCcw size={18} /> Try Another Scan
          </button>
        </div>

        {/* Sisi Kanan: Informasi */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lime mb-2">
              <CheckCircle2 size={20} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Detection Result</span>
            </div>
            <h3 className="text-4xl font-black text-primary leading-tight lowercase first-letter:uppercase">
              {result.label}
            </h3>
            <span className="inline-block mt-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
              Category: {result.category}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-white/40 rounded-[24px] border border-white/60">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <Info size={20} />
                <span className="font-extrabold text-sm uppercase">Disposal Guide</span>
              </div>
              <p className="text-primary/70 text-sm leading-relaxed font-medium">
                {result.action}
              </p>
            </div>

            <div className="p-5 bg-primary text-white rounded-[24px] shadow-xl shadow-primary/20 relative overflow-hidden group">
              <Leaf className="absolute -right-2 -bottom-2 w-20 h-20 opacity-10 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold opacity-60 uppercase mb-2 block">Eco Impact</span>
              <p className="text-sm leading-relaxed italic relative z-10">
                "{result.impact}"
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ResultView;
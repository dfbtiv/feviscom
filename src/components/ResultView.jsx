import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RefreshCcw, Info, Leaf, Layers } from "lucide-react";

const ResultView = ({ result, image, onReset, activeIndex, setActiveIndex }) => {
  // Ambil data objek yang sedang aktif dipilih
  const currentResult = result.allDetections[activeIndex];

  const getCategoryColor = (category) => {
    if (category?.includes("Recyclable")) return "from-green-500/30 to-emerald-500/30";
    if (category?.includes("Organic")) return "from-amber-500/30 to-yellow-500/30";
    if (category?.includes("Hazard")) return "from-red-500/30 to-orange-500/30";
    return "from-blue-500/30 to-cyan-500/30";
  };

  const getCategoryBadgeColor = (category) => {
    if (category?.includes("Recyclable")) return "bg-green-500/30 text-green-700 border-green-500/50";
    if (category?.includes("Organic")) return "bg-amber-500/30 text-amber-700 border-amber-500/50";
    if (category?.includes("Hazard")) return "bg-red-500/30 text-red-700 border-red-500/50";
    return "bg-blue-500/30 text-blue-700 border-blue-500/50";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "from-emerald-500 to-green-500";
    if (confidence >= 0.75) return "from-lime-500 to-green-500";
    if (confidence >= 0.6) return "from-yellow-500 to-orange-500";
    return "from-orange-500 to-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[900px] bg-gradient-to-br from-white/50 via-white/40 to-white/30 backdrop-blur-2xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/30 shadow-2xl"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-lime/20 rounded-full">
            <CheckCircle2 size={24} className="text-lime" />
          </div>
          <div>
            <p className="text-xs font-bold text-lime uppercase tracking-widest">
              {result.totalDetected} Objek Terdeteksi
            </p>
            <p className="text-sm text-primary/60">Hasil Klasifikasi Sampah</p>
          </div>
        </div>

        {/* UI MULTI-OBJECT SELECTOR */}
        {result.totalDetected > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white/40 p-1.5 rounded-2xl border border-white/50">
            <div className="pl-2 text-primary/50"><Layers size={16}/></div>
            {result.allDetections.map((det, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeIndex === idx 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-transparent text-primary hover:bg-white/50"
                }`}
              >
                {det.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Image Preview */}
        <motion.div className="space-y-4">
          <div className="relative rounded-[24px] overflow-hidden shadow-2xl bg-black/5 border-2 border-white/20 group">
            <img
              src={image}
              alt="Detection"
              className="w-full h-auto aspect-[4/5] md:aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Confidence Badge */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <p className="text-white text-xs font-bold">
                {(currentResult.confidence * 100).toFixed(1)}% Confident
              </p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-white/60 to-white/40 hover:from-white/80 hover:to-white/60 text-primary font-bold rounded-xl transition-all border border-white/50 shadow-md"
          >
            <RefreshCcw size={18} />
            <span>Coba Scan Lagi</span>
          </button>
        </motion.div>

        {/* Right Side: Information (Berubah dinamis sesuai tab yang diklik) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex} // Memaksa animasi ulang saat tab diubah
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col justify-start space-y-5"
          >
            {/* Waste Label */}
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-primary leading-tight">
                {currentResult.label}
              </h2>
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border border-white/40 ${getCategoryBadgeColor(currentResult.category)}`}>
                📂 {currentResult.category}
              </div>
            </div>

            {/* Disposal Guide */}
            <div className="p-5 bg-white/40 backdrop-blur-md rounded-[20px] border border-white/60">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/30 rounded-lg mt-0.5"><Info size={18} className="text-blue-600" /></div>
                <div className="flex-1">
                  <p className="font-extrabold text-primary text-sm mb-2 uppercase tracking-wide">💡 Panduan Pembuangan</p>
                  <p className="text-primary/70 text-sm">{currentResult.action}</p>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="p-5 bg-gradient-to-br from-lime/30 to-green-500/20 rounded-[20px] border border-lime/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime rounded-lg mt-0.5"><Leaf size={18} className="text-primary" /></div>
                <div className="flex-1">
                  <p className="font-extrabold text-primary text-sm mb-2 uppercase tracking-wide">🌍 Dampak Lingkungan</p>
                  <p className="text-primary text-sm italic font-medium">"{currentResult.impact}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResultView;
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RefreshCcw, Info, Leaf, Layers } from "lucide-react";

const ResultView = ({ result, image, onReset, activeIndex, setActiveIndex }) => {
  // Ambil data sampah yang sedang aktif dipilih
  const currentResult = result.allDetections[activeIndex] || result.allDetections[0];

  // LOGIKA PENGELOMPOKAN (GROUPING)
  const uniqueIndices = [];
  const labelCounts = {};
  const seenLabels = new Set();

  result.allDetections.forEach((det, idx) => {
    // Hitung ada berapa banyak sampah untuk tiap kategori (misal: Botol Plastik ada 2)
    labelCounts[det.label] = (labelCounts[det.label] || 0) + 1;
    
    // Simpan index pertama dari setiap jenis sampah biar tombol nggak duplikat
    if (!seenLabels.has(det.label)) {
      seenLabels.add(det.label);
      uniqueIndices.push(idx);
    }
  });

  // Fungsi untuk mendapatkan tingkat recyclability berdasarkan nama
  const getRecyclability = (label) => {
    const name = label?.toLowerCase() || "";
    if (name.includes("botol") && !name.includes("tutup")) return "Sangat Mudah";
    if (name.includes("kresek")) return "Lumayan Sulit";
    if (name.includes("kemasan")) return "Sulit";
    if (name.includes("gelas")) return "Mudah";
    if (name.includes("tutup")) return "Mudah";
    if (name.includes("sedotan")) return "Lumayan Sulit";
    if (name.includes("styrofoam")) return "Lumayan Sulit";
    return "Mudah"; // Default
  };

  // Fungsi untuk badge warna recyclability
  const getRecyclabilityBadgeColor = (recyclability) => {
    if (recyclability?.includes("Nggak") || recyclability?.includes("Sulit")) {
      return "bg-rose-500/30 text-rose-700 border-rose-500/50";
    }
    return "bg-emerald-500/30 text-emerald-700 border-emerald-500/50";
  };

  // Fungsi untuk extract nama simpel dari label (hapus detail dalam kurung)
  const getSimpleName = (label) => {
    return label?.split("(")[0].trim() || label;
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

        {/* UI MULTI-OBJECT SELECTOR (Hanya memunculkan jenis yang unik) */}
        {uniqueIndices.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white/40 p-1.5 rounded-2xl border border-white/50">
            <div className="pl-2 text-primary/50"><Layers size={16}/></div>
            {uniqueIndices.map((origIdx) => {
              const det = result.allDetections[origIdx];
              // Cek apakah tombol ini yang sedang aktif
              const isActive = det.label === currentResult.label;
              
              return (
                <button
                  key={origIdx}
                  onClick={() => setActiveIndex(origIdx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-transparent text-primary hover:bg-white/50"
                  }`}
                >
                  {/* Tampilkan nama + jumlah objek jika lebih dari 1 */}
                  {getSimpleName(det.label)} {labelCounts[det.label] > 1 ? `(${labelCounts[det.label]})` : ""}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Image Preview & Bounding Boxes */}
        <motion.div className="space-y-4">
          <div className="relative rounded-[24px] overflow-hidden shadow-2xl bg-black/5 border-2 border-white/20 flex justify-center items-center h-fit">
            
            <img
              src={image}
              alt="Detection"
              className="w-full h-auto block"
            />
            
            {/* BOUNDING BOX OVERLAY */}
            <div className="absolute inset-0 pointer-events-none">
              {result.allDetections.map((det, idx) => {
                if (!det.box) return null;

                // Cek apakah box ini termasuk dalam kategori yang sedang diklik
                const isBoxActive = currentResult.label === det.label;

                // Format YOLO xyxyn: [xmin, ymin, xmax, ymax]
                const xmin = det.box[0];
                const ymin = det.box[1];
                const xmax = det.box[2];
                const ymax = det.box[3];
                
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`absolute border-2 md:border-4 rounded-lg transition-all duration-300 pointer-events-auto cursor-pointer hover:opacity-100 ${
                      isBoxActive
                        ? "border-lime z-20 shadow-[0_0_15px_rgba(195,233,86,0.6)] bg-lime/10 hover:bg-lime/20" // Menyala jika aktif
                        : "border-white/50 z-10 opacity-50 hover:border-lime/70" // Meredup jika tidak aktif
                    }`}
                    style={{
                      left: `${xmin * 100}%`,
                      top: `${ymin * 100}%`,
                      width: `${(xmax - xmin) * 100}%`,
                      height: `${(ymax - ymin) * 100}%`,
                    }}
                  >
                    {/* Label Bounding Box (Hanya muncul untuk box yang aktif) */}
                    {isBoxActive && (
                      <span className="absolute -top-6 md:-top-8 left-[-2px] bg-lime text-primary text-[10px] md:text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md">
                        {getSimpleName(det.label)} ({(det.confidence * 100).toFixed(0)}%)
                      </span>
                    )}
                  </div>
                );
              })}
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

        {/* Right Side: Information */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentResult.label} // Key diubah jadi label biar animasinya halus saat pindah kategori
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col justify-start space-y-5"
          >
            {/* Waste Label */}
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-primary leading-tight">
                {getSimpleName(currentResult.label)}
              </h2>
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border border-white/40 ${getRecyclabilityBadgeColor(getRecyclability(currentResult.label))}`}>
                ♻️ {getRecyclability(currentResult.label)}
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
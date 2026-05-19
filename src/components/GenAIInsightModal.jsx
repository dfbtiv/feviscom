import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Lightbulb, Zap, Share2, Leaf, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

const GenAIInsightModal = ({ isOpen, insight, isLoading, result, image, onClose }) => {
  const cardRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  const handleShareCard = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    
    try {
      const imageBase64 = await toPng(cardRef.current, {
        backgroundColor: "#f8fafc",
        pixelRatio: 2, 
      });
      
      if (navigator.share) {
        const blob = await (await fetch(imageBase64)).blob();
        const file = new File([blob], "ecovision-card.png", { type: blob.type });
        
        await navigator.share({
          title: 'EcoVision Scan Result',
          text: `Cek wawasan lingkungan dari ${result?.label || 'sampah ini'} menggunakan EcoVision! 🌍`,
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.href = imageBase64;
        link.download = `ecovision-${Date.now()}.png`;
        link.click();
      }
    } catch (error) {
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] w-[95%] p-0 bg-transparent border-none shadow-none overflow-hidden flex flex-col max-h-[95vh]">
        <DialogTitle className="sr-only">Eco-Card Horizontal Insight</DialogTitle>

        <div className="overflow-y-auto w-full bg-white rounded-[32px] shadow-2xl hide-scrollbar relative">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 border-4 border-lime/30 border-t-lime rounded-full"
              />
              <p className="text-primary/70 font-bold animate-pulse">
                Menyusun wawasan lingkungan...
              </p>
            </div>
          ) : insight ? (
            <>
              {/* AREA FOTO ECO-CARD */}
              <div 
                ref={cardRef} 
                className="relative bg-[#fafaf9] overflow-hidden"
                style={{ padding: "36px 32px" }} 
              >
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-lime/30 rounded-full blur-[70px] pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none"></div>

                <div className="relative z-10">
                  
                  {/* WATERMARK HEADER ATAS */}
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200/60">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary p-1.5 rounded-lg">
                        <Leaf size={14} className="text-white" />
                      </div>
                      <span className="font-black text-lg tracking-tight text-primary">EcoVision</span>
                    </div>
                    <div className="text-[10px] font-extrabold text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
                      {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  {/* GRID UTAMA: 2 KOLOM */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    
                    {/* KOLOM KIRI (Foto & Status) */}
                    <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="relative mb-5 w-full max-w-[220px] aspect-square p-2 bg-white shadow-xl border border-gray-100 rounded-[24px]">
                        <img 
                          src={image || "/placeholder.png"} 
                          alt="Waste" 
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover rounded-[18px]"
                        />
                        <div className="absolute -bottom-2 right-2 bg-primary text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md border border-white">
                          {result?.confidence ? Math.round(result.confidence * 100) : 95}% Match
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                        <div className={`px-3 py-1 border text-[10px] font-black uppercase tracking-widest rounded-full ${
                          insight?.dapat_didaur_ulang 
                            ? "bg-green-50 border-green-200 text-green-600" 
                            : "bg-gray-100 border-gray-200 text-gray-500"
                        }`}>
                          {insight?.dapat_didaur_ulang ? "♻️ Recyclable" : "❌ Non-Recyclable"}
                        </div>

                        {insight?.tingkat_bahaya && (
                          <div className={`px-3 py-1 border text-[10px] font-black uppercase tracking-widest rounded-full ${
                            insight.tingkat_bahaya.toLowerCase() === 'tinggi' ? 'bg-red-100 text-red-700 border-red-200' :
                            insight.tingkat_bahaya.toLowerCase() === 'sedang' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                            'bg-lime/30 text-primary border-lime'
                          }`}>
                            Bahaya: {insight.tingkat_bahaya}
                          </div>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight">
                        {result?.label || "Nama Sampah"}
                      </h2>
                    </div>

                    {/* KOLOM KANAN (Insight Data) */}
                    <div className="md:col-span-3 w-full">
                      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        
                        {/* 1. Box Bahaya (Lebar Penuh) */}
                        {insight?.ringkasan_bahaya && (
                          <motion.div variants={item} className="sm:col-span-2 p-3.5 bg-white rounded-2xl border border-gray-100 relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            <h3 className="flex items-center gap-1.5 font-bold text-red-600 mb-1.5 text-xs uppercase tracking-wide">
                              <AlertCircle size={14} /> Bahaya Lingkungan
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                              {insight.ringkasan_bahaya}
                            </p>
                          </motion.div>
                        )}

                        {/* 2. Box Cara Buang (Lebar Penuh) */}
                        {insight?.cara_buang && (
                          <motion.div variants={item} className="sm:col-span-2 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <h3 className="flex items-center gap-1.5 font-bold text-blue-600 mb-1.5 text-xs uppercase tracking-wide">
                              <Trash2 size={14} /> Cara Buang
                            </h3>
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                              {insight.cara_buang}
                            </p>
                          </motion.div>
                        )}

                        {/* 3. Box Daur Ulang (Bersebelahan - Kiri) */}
                        {insight?.ide_daur_ulang && insight.ide_daur_ulang.length > 0 && (
                          <motion.div variants={item} className="p-3.5 bg-white rounded-2xl border border-gray-100 relative overflow-hidden shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="absolute top-0 left-0 w-1 h-full bg-lime"></div>
                              <h3 className="flex items-center gap-1.5 font-bold text-primary mb-2 text-xs uppercase tracking-wide">
                                <Zap size={14} /> Ide Daur Ulang
                              </h3>
                              <ul className="space-y-2">
                                {insight.ide_daur_ulang.slice(0, 2).map((ide, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-medium leading-relaxed">
                                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-lime/30 text-primary text-[9px] font-black flex-shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span>{ide}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}

                        {/* 4. Box Fakta Menarik (Bersebelahan - Kanan) */}
                        {insight?.fakta_menarik && (
                          <motion.div variants={item} className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100 relative overflow-hidden shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="absolute top-0 left-0 w-1 h-full bg-purple-400"></div>
                              <h3 className="flex items-center gap-1.5 font-bold text-purple-600 mb-1.5 text-xs uppercase tracking-wide">
                                <Lightbulb size={14} /> Fakta Menarik
                              </h3>
                              <p className="text-xs text-purple-800 font-medium italic">
                                "{insight.fakta_menarik}"
                              </p>
                            </div>
                          </motion.div>
                        )}

                      </motion.div>
                    </div>

                  </div>

                  {/* FOOTER WATERMARK */}
                  <div className="mt-5 pt-3 border-t border-gray-200/60 text-center">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                      <Sparkles size={10} /> Scan with EcoVision Computer Vision AI
                    </p>
                  </div>

                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
                <button
                  onClick={onClose}
                  className="w-1/4 py-3 px-4 bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold rounded-xl text-sm transition-all"
                >
                  Tutup
                </button>
                <button
                  onClick={handleShareCard}
                  disabled={isCapturing}
                  className="flex-1 py-3 px-4 bg-primary text-white hover:bg-primary/95 font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                >
                  <Share2 size={16} />
                  {isCapturing ? "Menyimpan Gambar..." : "Bagikan Eco-Card"}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenAIInsightModal;
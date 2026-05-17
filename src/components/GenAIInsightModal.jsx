import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Lightbulb, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GenAIInsightModal = ({ isOpen, insight, isLoading, onClose }) => {
  // Variabel animasi stagger yang simpel dan mulus
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Menghapus overlay bawaan jika ingin kustom, 
        tapi shadcn sudah punya overlay yang smooth.
        Kita styling DialogContent agar match dengan glass-effect kamu.
      */}
      <DialogContent className="sm:max-w-2xl bg-white/95 backdrop-blur-xl border-white/40 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto p-0">
        
        {/* Header - Sticky di atas */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-black text-primary">
              <div className="p-2 bg-lime/20 rounded-full">
                <Sparkles size={22} className="text-primary" />
              </div>
              AI Generated Insights
            </DialogTitle>
            <DialogDescription className="text-primary/60 font-medium">
              Analisis cerdas dan panduan daur ulang khusus untuk sampah ini.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 md:p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-5">
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
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {/* Ringkasan Bahaya */}
              {insight.ringkasanBahaya && (
                <motion.div variants={item} className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-red-500/10 rounded-xl flex-shrink-0 mt-0.5">
                      <AlertCircle size={22} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-red-900 mb-1.5 text-lg">
                        Ringkasan Bahaya
                      </h3>
                      <p className="text-red-900/80 leading-relaxed text-sm md:text-base">
                        {insight.ringkasanBahaya}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Ide Daur Ulang */}
              {insight.ideRecycling && Array.isArray(insight.ideRecycling) && insight.ideRecycling.length > 0 && (
                <motion.div variants={item} className="p-5 bg-lime/10 rounded-2xl border border-lime/20 hover:border-lime/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-lime/30 rounded-xl flex-shrink-0 mt-0.5">
                      <Zap size={22} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-primary mb-3 text-lg">
                        Ide Daur Ulang Kreatif
                      </h3>
                      <ul className="space-y-3">
                        {insight.ideRecycling.map((ide, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-primary/80">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm md:text-base leading-relaxed">
                              {ide}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Fakta Menarik */}
              {insight.faktaMenarik && (
                <motion.div variants={item} className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl flex-shrink-0 mt-0.5">
                      <Lightbulb size={22} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-blue-900 mb-1.5 text-lg">
                        Fakta Menarik
                      </h3>
                      <p className="text-blue-900/80 leading-relaxed text-sm md:text-base">
                        {insight.faktaMenarik}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Close Button Bottom */}
              <motion.div variants={item} className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Tutup & Mulai Aksi 🌍
                </button>
              </motion.div>

            </motion.div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenAIInsightModal;
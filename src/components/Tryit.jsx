import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImagePlus,
  Upload,
  Camera,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Check,
  X,
  Info
} from "lucide-react";
import ResultView from "./ResultView";
import GenAIInsightModal from "./GenAIInsightModal";
import { detectWaste, getGenAIInsight } from "../service/api";

const Tryit = () => {
  const [activeBtn, setActiveBtn] = useState("upload");
  const [prediction, setPrediction] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedImageBlob, setCapturedImageBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  
  // STATE UNTUK KAMERA
  const [cameraMode, setCameraMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const btnItems = [
    { id: "upload", label: "Upload", icon: <Upload size={18} /> },
    { id: "camera", label: "Camera", icon: <Camera size={18} /> },
  ];

  // Pastikan hardware mati kalau komponen ini ditinggalkan
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraMode(true);
      setError(null);
      setNotFound(false);
      setShowPreview(false); // Pastikan bukan mode preview

      // Matikan stream nyangkut (kalau ada)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;

      // Colok stream ke elemen video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Paksa play kalau tertahan browser
          videoRef.current.play().catch(e => console.log(e)); 
        }
      }, 100);
    } catch (err) {
      setError("Camera tidak dapat diakses. Pastikan Anda memberikan izin akses kamera.");
      setCameraMode(false);
    }
  };

  const stopCamera = () => {
    // Matikan dari akar-akarnya
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraMode(false);
    setShowPreview(false);
    setPreviewImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const base64Url = canvasRef.current.toDataURL("image/jpeg", 0.95);
      setPreviewImage(base64Url);
      
      // HANYA MENGUBAH STATE INI (Video akan disembunyikan via CSS, tidak dihapus dari React)
      setShowPreview(true);

      canvasRef.current.toBlob(
        (blob) => setCapturedImageBlob(blob),
        "image/jpeg",
        0.95
      );
    }
  };

  const retakePhoto = () => {
    setPreviewImage(null);
    setCapturedImageBlob(null);
    
    // MENGEMBALIKAN VIDEO VIA CSS (Langsung instan, tanpa loading hitam)
    setShowPreview(false);
  };

  const submitCapturedPhoto = async () => {
    if (capturedImageBlob) {
      setIsLoading(true);
      setError(null);
      setNotFound(false);
      setAiInsight(null);
      
      // Karena mau diproses, baru kita matikan kameranya
      stopCamera();
      setSelectedImage(previewImage);

      try {
        const response = await detectWaste(capturedImageBlob);
        if (response.status === "not_found") {
          setNotFound(true);
        } else {
          setPrediction(response); 
          setActiveIndex(0); 
        }
      } catch (err) {
        setError("Gagal menghubungi server. Silakan coba lagi.");
        setSelectedImage(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      setNotFound(false);
      setAiInsight(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file);

      try {
        const response = await detectWaste(file);
        if (response.status === "not_found") {
          setNotFound(true);
        } else {
          setPrediction(response); 
          setActiveIndex(0); 
        }
      } catch (err) {
        setError("Gagal menghubungi server. Silakan coba lagi.");
        setSelectedImage(null); 
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const triggerInput = async (mode) => {
    setActiveBtn(mode);
    if (mode === "camera") {
      await startCamera();
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.removeAttribute("capture");
        fileInputRef.current.click();
      }
    }
  };

  const handleRequestInsight = async () => {
    const currentItem = prediction?.allDetections[activeIndex];
    if (!currentItem?.className) return; 

    setShowInsightModal(true);
    setLoadingInsight(true);
    setAiInsight(null); 

    try {
      const insight = await getGenAIInsight(currentItem.className);
      setAiInsight(insight);
    } catch (err) {
      setAiInsight({
        ringkasan_bahaya: "Terjadi kesalahan saat menghasilkan insight dari AI.",
        ide_daur_ulang: ["Silakan coba lagi nanti"],
        fakta_menarik: "Informasi tidak tersedia saat ini.",
      });
    } finally {
      setLoadingInsight(false);
    }
  };

  const styles = {
    card: "w-full max-w-[650px] md:aspect-[16/10] bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center border border-white/20 shadow-xl relative overflow-hidden",
    dropZone: "w-full h-full border-2 border-dashed border-primary/20 rounded-lg sm:rounded-2xl md:rounded-[32px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 group cursor-pointer hover:border-primary/40 transition-all duration-300",
    navContainer: "relative flex flex-row gap-1 p-1 bg-primary/5 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-primary/10 w-full md:w-fit mx-auto mt-4 sm:mt-6",
    button: "relative flex-1 md:flex-none px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-3 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-sm font-bold z-10 outline-none select-none transition-all duration-300 cursor-pointer",
  };

  return (
    <section
      id="try-it"
      className="max-w-[1100px] mx-auto py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center scroll-mt-24"
    >
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-2 md:mb-3">
          Deteksi Sampah dengan AI
        </h2>
        <p className="text-primary/70 font-medium text-xs sm:text-sm md:text-base">
          Ambil atau unggah gambar untuk mengidentifikasi jenis sampah.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence mode="wait">
        
        {/* =========================================================
            SATU CONTAINER UNTUK LIVE KAMERA & PREVIEW
            (Video tidak pernah di-unmount, hanya disembunyikan)
            ========================================================= */}
        {cameraMode && !prediction && (
          <motion.div
            key="camera-flow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-[650px] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 border border-white/20 shadow-xl space-y-4"
          >
            {/* TAMPILAN KAMERA LIVE (Sembunyi kalau showPreview true) */}
            <div className={`relative rounded-[24px] overflow-hidden bg-black aspect-video ${showPreview ? 'hidden' : 'block'}`}>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>

            {/* TAMPILAN PREVIEW FOTO (Muncul kalau showPreview true) */}
            <div className={`relative rounded-[24px] overflow-hidden bg-black/20 aspect-video ${!showPreview ? 'hidden' : 'block'}`}>
              {previewImage && <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />}
            </div>

            {/* TOMBOL SAAT LIVE KAMERA */}
            {!showPreview && (
              <div className="flex gap-2 sm:gap-3">
                <button onClick={stopCamera} className="flex-1 py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-2 bg-red-500/30 hover:bg-red-500/40 text-red-600 font-bold rounded-lg sm:rounded-xl transition-all border border-red-500/50 text-sm sm:text-base">
                  <X size={18} /> Batal
                </button>
                <button onClick={capturePhoto} className="flex-1 py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-2 bg-lime/60 hover:bg-lime text-primary font-bold rounded-lg sm:rounded-xl transition-all border border-lime/80 shadow-lg text-sm sm:text-base">
                  <Camera size={18} /> Ambil Foto
                </button>
              </div>
            )}

            {/* TOMBOL SAAT PREVIEW FOTO */}
            {showPreview && !isLoading && (
              <div className="flex gap-2 sm:gap-3">
                <button onClick={retakePhoto} className="flex-1 py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-2 bg-white/50 hover:bg-white/70 text-primary font-bold rounded-lg sm:rounded-xl transition-all border border-white/50 text-sm sm:text-base">
                  <RotateCcw size={18} /> Ulang
                </button>
                <button onClick={submitCapturedPhoto} className="flex-1 py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-2 bg-lime/60 hover:bg-lime text-primary font-bold rounded-lg sm:rounded-xl transition-all border border-lime/80 shadow-lg text-sm sm:text-base">
                  <Check size={18} /> Kirim
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* =========================================================
            MENU UPLOAD (Default)
            ========================================================= */}
        {!prediction && !cameraMode && (
          <motion.div
            key="input-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={styles.card}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin" />
                <p className="text-primary font-bold animate-pulse text-sm sm:text-base">
                  Menganalisis dengan YOLOv8...
                </p>
              </div>
            ) : notFound ? (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="p-4 sm:p-6 bg-amber-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-amber-500/30 w-full flex items-start gap-3 sm:gap-4">
                  <Info className="text-amber-500 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold text-amber-600 mb-2 text-sm sm:text-base">
                      Objek Tidak Dikenali
                    </h4>
                    <p className="text-amber-700/80 text-xs sm:text-sm leading-relaxed">
                      Maaf, AI kami tidak dapat mendeteksi sampah plastik pada gambarmu. Pastikan pencahayaan cukup dan objek termasuk dalam 7 kategori kami: <b>Botol Plastik, Kresek, Bungkus Kemasan, Gelas Plastik, Tutup Botol, Sedotan, atau Styrofoam</b>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNotFound(false);
                    setActiveBtn("upload");
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 font-bold rounded-lg sm:rounded-xl transition-all border border-amber-500/40 text-sm sm:text-base mt-2"
                >
                  Kembali
                </button>
              </div>
            ) : error ? (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="p-4 sm:p-6 bg-red-500/20 backdrop-blur-md rounded-xl sm:rounded-2xl border border-red-500/50 w-full flex items-start gap-3 sm:gap-4">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-600 mb-1 text-sm sm:text-base">
                      Deteksi Gagal
                    </h4>
                    <p className="text-red-600/80 text-xs sm:text-sm">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setError(null);
                    setActiveBtn("upload");
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500/30 hover:bg-red-500/40 text-red-600 font-bold rounded-lg sm:rounded-xl transition-all border border-red-500/50 text-sm sm:text-base"
                >
                  Kembali
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className={styles.dropZone} onClick={() => triggerInput("upload")}>
                  <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-white/30 backdrop-blur-md rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <ImagePlus size={32} className="text-primary/50 sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px]" />
                  </div>
                  <div className="space-y-1 mb-2 text-center">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                      Siap untuk Scan?
                    </h4>
                    <p className="text-primary/60 text-xs sm:text-sm px-2 sm:px-4">
                      Ambil foto sampah Anda atau unggah dari perangkat.
                    </p>
                  </div>
                </div>

                <div className={styles.navContainer}>
                  {btnItems.map((item) => (
                    <button key={item.id} onClick={() => triggerInput(item.id)} className={styles.button}>
                      <span className={`relative z-20 flex items-center gap-2 transition-colors duration-500 ${activeBtn === item.id ? "text-primary" : "text-primary/60"}`}>
                        {item.icon}
                        {item.label}
                      </span>
                      {activeBtn === item.id && (
                        <motion.div layoutId="active-pill" className="absolute inset-0 bg-lime rounded-lg md:rounded-xl z-10 shadow-lg shadow-lime/30" transition={{ type: "spring", stiffness: 450, damping: 35 }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* =========================================================
            HASIL DETEKSI AI
            ========================================================= */}
        {prediction && (
          <div className="w-full flex flex-col items-center gap-6">
            <ResultView
              key="result-card"
              result={prediction}
              image={selectedImage}
              activeIndex={activeIndex}         
              setActiveIndex={setActiveIndex}   
              onReset={() => {
                setPrediction(null);
                setSelectedImage(null);
                setAiInsight(null);
                setCapturedImageBlob(null);
                setPreviewImage(null);
                setShowPreview(false);
                setActiveIndex(0); 
              }}
            />

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleRequestInsight}
              disabled={loadingInsight}
              className="py-2 sm:py-3 px-4 sm:px-6 md:px-8 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/80 to-lime/60 hover:from-primary hover:to-lime text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base !border-none !outline-none !ring-0"
            >
              <Sparkles size={18} />
              {loadingInsight ? "Menghasilkan Insight..." : "Dapatkan Insight dari AI"}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <GenAIInsightModal
        isOpen={showInsightModal}
        insight={aiInsight}
        isLoading={loadingInsight}
        result={prediction?.allDetections?.[activeIndex]} 
        image={selectedImage}
        onClose={() => setShowInsightModal(false)}
      />
    </section>
  );
};

export default Tryit;
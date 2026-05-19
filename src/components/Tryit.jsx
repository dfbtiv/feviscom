import { useState, useRef } from "react";
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
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showInsightModal, setShowInsightModal] = useState(false);

  // Ref untuk mengakses input file dan video stream
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const btnItems = [
    { id: "upload", label: "Upload", icon: <Upload size={18} /> },
    { id: "camera", label: "Camera", icon: <Camera size={18} /> },
  ];

  // Inisialisasi kamera
  const startCamera = async () => {
    try {
      setCameraMode(true);
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Camera tidak dapat diakses. Pastikan Anda memberikan izin akses kamera.",
      );
      setCameraMode(false);
    }
  };

  // Matikan kamera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraMode(false);
    setShowPreview(false);
    setPreviewImage(null);
  };

  // Capture foto dari kamera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvasRef.current.toBlob(
        (blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImageBlob(blob);
          setPreviewImage(imageUrl);
          setShowPreview(true);
        },
        "image/jpeg",
        0.95,
      );
    }
  };

  // Retake foto
  const retakePhoto = () => {
    setPreviewImage(null);
    setCapturedImageBlob(null);
    setShowPreview(false);
  };

  // Submit foto yang sudah dipreview
  const submitCapturedPhoto = async () => {
    if (capturedImageBlob) {
      setIsLoading(true);
      setError(null);
      setAiInsight(null);
      stopCamera();
      setSelectedImage(previewImage);

      try {
        const response = await detectWaste(capturedImageBlob);
        console.log("API Response:", response);

        setPrediction({
          label: response.label,
          className: response.className,
          confidence: response.confidence,
          category: response.category,
          action: response.action,
          impact: response.impact,
          image: response.image_url || previewImage
        });
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal mendeteksi sampah. Silakan coba lagi.");
        setSelectedImage(null);
        setCameraMode(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fungsi untuk menangani file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      setAiInsight(null);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      try {
        const response = await detectWaste(file);
        console.log("API Response:", response);

        setPrediction({
          label: response.label,
          className: response.className,
          confidence: response.confidence,
          category: response.category,
          action: response.action,
          impact: response.impact,
        });
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal mendeteksi sampah. Silakan coba lagi.");
        setSelectedImage(null);
      } finally {
        // Bersihkan input file agar bisa upload file yang sama lagi jika ingin retry
        setIsLoading(false);
      }
    }
  };

  // Fungsi untuk memicu sistem OS (File Manager atau Kamera)
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

  // Fungsi untuk request GenAI insight
  const handleRequestInsight = async () => {
    if (!prediction?.className) return;

    setShowInsightModal(true);
    setLoadingInsight(true);
    setAiInsight(null); // Reset sebelum fetch

    try {
      console.log("🔄 Fetching GenAI insight for:", prediction.className);
      const insight = await getGenAIInsight(prediction.className);
      console.log("✅ Insight received:", insight);
      setAiInsight(insight);
    } catch (err) {
      console.error("❌ Error getting insight:", err);
      // Set fallback insight jika terjadi error
      setAiInsight({
        ringkasanBahaya: "Terjadi kesalahan saat menghasilkan insight dari AI.",
        ideRecycling: ["Silakan coba lagi nanti"],
        faktaMenarik: "Informasi tidak tersedia saat ini.",
      });
    } finally {
      setLoadingInsight(false);
    }
  };

  const styles = {
    card: "w-full max-w-[650px] md:aspect-[16/10] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 flex flex-col items-center justify-center border border-white/20 shadow-xl relative overflow-hidden",
    dropZone:
      "w-full h-full border-2 border-dashed border-primary/20 rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center p-6 md:p-8 group cursor-pointer hover:border-primary/40 transition-all duration-300",
    navContainer:
      "relative flex flex-row gap-1 p-1 bg-primary/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-primary/10 w-full md:w-fit mx-auto mt-6",
    button:
      "relative flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-bold z-10 outline-none select-none transition-all duration-300 cursor-pointer",
  };

  return (
    <section
      id="try-it"
      className="max-w-[1100px] mx-auto py-10 px-5 md:px-8 flex flex-col items-center scroll-mt-24"
    >
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
          AI Waste Detection
        </h2>
        <p className="text-primary/70 font-medium text-sm md:text-base">
          Tangkap atau unggah gambar untuk mengidentifikasi jenis sampah.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Hidden Canvas untuk capture kamera */}
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence mode="wait">
        {/* Camera Mode */}
        {cameraMode && !showPreview && !prediction && (
          <motion.div
            key="camera-mode"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-[650px] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 border border-white/20 shadow-xl space-y-4"
          >
            <div className="relative rounded-[24px] overflow-hidden bg-black/20 aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={stopCamera}
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-red-500/30 hover:bg-red-500/40 text-red-600 font-bold rounded-xl transition-all border border-red-500/50"
              >
                <X size={18} /> Batal
              </button>
              <button
                onClick={capturePhoto}
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-lime/60 hover:bg-lime text-primary font-bold rounded-xl transition-all border border-lime/80 shadow-lg"
              >
                <Camera size={18} /> Ambil Foto
              </button>
            </div>
          </motion.div>
        )}

        {/* Camera Preview Mode */}
        {showPreview && !isLoading && (
          <motion.div
            key="camera-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-[650px] bg-white/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 border border-white/20 shadow-xl space-y-4"
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-video">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={retakePhoto}
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-white/50 hover:bg-white/70 text-primary font-bold rounded-xl transition-all border border-white/50"
              >
                <RotateCcw size={18} /> Ulang
              </button>
              <button
                onClick={submitCapturedPhoto}
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-lime/60 hover:bg-lime text-primary font-bold rounded-xl transition-all border border-lime/80 shadow-lg"
              >
                <Check size={18} /> Kirim
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Input Card */}
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
                <p className="text-primary font-bold animate-pulse">
                  Menganalisis dengan YOLOv8...
                </p>
              </div>
            ) : error ? (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="p-4 md:p-6 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-500/50 w-full flex items-start gap-4">
                  <AlertCircle
                    className="text-red-500 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-600 mb-1">
                      Deteksi Gagal
                    </h4>
                    <p className="text-red-600/80 text-sm">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setError(null);
                    setActiveBtn("upload");
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  className="px-6 py-3 bg-red-500/30 hover:bg-red-500/40 text-red-600 font-bold rounded-xl transition-all border border-red-500/50"
                >
                  Coba Lagi
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div
                  className={styles.dropZone}
                  onClick={() => triggerInput("upload")}
                >
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <ImagePlus
                      size={35}
                      className="text-primary/50 md:w-[45px] md:h-[45px]"
                    />
                  </div>
                  <div className="space-y-1 mb-2 text-center">
                    <h4 className="text-xl md:text-2xl font-bold text-primary">
                      Siap untuk Scan?
                    </h4>
                    <p className="text-primary/60 text-xs md:text-sm px-4">
                      Ambil foto sampah Anda atau unggah dari perangkat.
                    </p>
                  </div>
                </div>

                {/* Sliding Toggle Navigation */}
                <div className={styles.navContainer}>
                  {btnItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => triggerInput(item.id)}
                      className={styles.button}
                    >
                      <span
                        className={`relative z-20 flex items-center gap-2 transition-colors duration-500 ${
                          activeBtn === item.id
                            ? "text-primary"
                            : "text-primary/60"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </span>

                      {activeBtn === item.id && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-lime rounded-lg md:rounded-xl z-10 shadow-lg shadow-lime/30"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 35,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Result Display */}
        {prediction && (
          <div className="w-full flex flex-col items-center gap-6">
            <ResultView
              key="result-card"
              result={prediction}
              image={selectedImage}
              onReset={() => {
                setPrediction(null);
                setSelectedImage(null);
                setAiInsight(null);
                setCapturedImageBlob(null);
                setPreviewImage(null);
                setShowPreview(false);
              }}
            />

            {/* Get AI Insight Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleRequestInsight}
              disabled={loadingInsight}
              className="py-3 px-6 md:px-8 flex items-center justify-center gap-3 bg-gradient-to-r from-primary/80 to-lime/60 hover:from-primary hover:to-lime text-white font-bold rounded-2xl transition-all border border-lime/40 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={18} />
              {loadingInsight
                ? "Menghasilkan Insight..."
                : "Dapatkan AI Insight"}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* GenAI Insight Modal */}
      <GenAIInsightModal
        isOpen={showInsightModal}
        insight={aiInsight}
        isLoading={loadingInsight}
        result={prediction}
        image={selectedImage}
        onClose={() => setShowInsightModal(false)}
      />
    </section>
  );
};

export default Tryit;

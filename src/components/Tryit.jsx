import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, Upload, Camera } from 'lucide-react';
import ResultView from './ResultView'; 

const Tryit = () => {
  const [activeBtn, setActiveBtn] = useState('upload');
  const [prediction, setPrediction] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  const btnItems = [
    { id: 'upload', label: 'Upload', icon: <Upload size={18} /> },
    { id: 'camera', label: 'Camera', icon: <Camera size={18} /> },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      
      setTimeout(() => {
        setPrediction({
          label: "Plastic Bottle",
          confidence: 0.94,
          category: "Anorganic / Recyclable",
          action: "Empty and rinse the bottle, then place it in the yellow recycling bin.",
          impact: "Recycling this item prevents it from polluting our oceans for up to 450 years."
        });
        setIsLoading(false);
      }, 2000);
    }
  };

  const triggerInput = (mode) => {
    setActiveBtn(mode);
    if (fileInputRef.current) {
      if (mode === 'camera') {
        fileInputRef.current.setAttribute('capture', 'environment');
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  return (
    <section id="try-it" className="tryit-section">
      {/* Header */}
      <div className="tryit-header">
        <h2 className="tryit-title">AI Waste Detection</h2>
        <p className="tryit-subtitle">Capture or upload an image to identify waste type.</p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <AnimatePresence mode="wait">
        {!prediction ? (
          <motion.div 
            key="input-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="tryit-card"
          >
            {isLoading ? (
              <div className="tryit-loading-wrapper">
                <div className="tryit-spinner" />
                <p className="tryit-loading-text">Analyzing with YOLOv8...</p>
              </div>
            ) : (
              <div className="tryit-content">
                <div className="tryit-dropzone" onClick={() => triggerInput('upload')}>
                  <div className="tryit-icon-container">
                    <ImagePlus size={35} className="tryit-icon" />
                  </div>
                  <div className="tryit-text-group">
                    <h4 className="tryit-scan-title">Ready to Scan?</h4>
                    <p className="tryit-scan-desc">Take a photo of your waste or upload from your device.</p>
                  </div>
                </div>

                {/* Sliding Toggle Navigation */}
                <div className="tryit-nav-container">
                  {btnItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => triggerInput(item.id)} 
                      className="tryit-btn"
                    >
                      <span className={`tryit-btn-text ${
                        activeBtn === item.id ? 'text-primary' : 'text-primary/60'
                      }`}>
                        {item.icon}
                        {item.label}
                      </span>

                      {activeBtn === item.id && (
                        <motion.div
                          layoutId="active-pill" 
                          className="tryit-active-pill"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* Menampilkan Hasil Deteksi */
          <ResultView 
            key="result-card"
            result={prediction} 
            image={selectedImage} 
            onReset={() => {
              setPrediction(null);
              setSelectedImage(null);
            }} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Tryit;
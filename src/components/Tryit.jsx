import { ImagePlus, Upload, Camera } from 'lucide-react';

const Tryit = () => {
  // Layout Styles
  const sectionWrapper = "max-w-[1024px] mx-auto my-32 px-8 flex flex-col items-center";
  const titleStyle = "text-4xl font-extrabold text-primary mb-3 text-center";
  const descStyle = "text-primary/70 font-medium mb-12 text-center max-w-xl";

  // Card & Upload Area Styles
  const uploadCard = "w-full max-w-[650px] aspect-[16/10] glass-effect rounded-[40px] p-8 flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl";
  const dashedArea = "w-full h-full border-2 border-dashed border-primary/20 rounded-[32px] flex flex-col items-center justify-center text-center p-8 group cursor-pointer transition-all duration-300 hover:border-primary/40 hover:bg-white/10";
  
  // Button Styles
  const btnBase = "flex items-center justify-center gap-2 px-8 py-3 font-semibold rounded-full transition-all duration-300 active:scale-95 cursor-pointer";
  const btnPrimary = `${btnBase} bg-lime text-primary hover:bg-lime/90 shadow-lg shadow-lime/20`;
  const btnSecondary = `${btnBase} bg-white/50 backdrop-blur-sm text-primary border border-primary/10 hover:bg-white/80`;

  return (
    <section id="try-it" className={sectionWrapper}>
      {/* Header */}
      <div className="flex flex-col items-center">
        <h2 className={titleStyle}>AI Waste Detection</h2>
        <p className={descStyle}>
          Upload an image to identify the waste type and learn how to dispose of it.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className={uploadCard}>
        <div className={dashedArea}>
          
          {/* Glassy Floating Icon */}
          <div className="mb-6 p-3 glass-effect rounded-3xl shadow-lg group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
            <ImagePlus 
              size={45} 
              strokeWidth={1.5} 
              className="text-primary/50 group-hover:text-primary transition-colors" 
            />
          </div>

          {/* Text Content */}
          <div className="space-y-1 mb-10">
            <h4 className="text-2xl font-bold text-primary">Drop your image here</h4>
            <p className="text-primary/60 text-sm max-w-xs mx-auto">
              Supports JPG, PNG. High resolution images work best for AI accuracy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center cursor-pointer">
            <button className={btnPrimary}>
              <Upload size={20} />
              Upload Photo
            </button>

            <button className={btnSecondary}>
              <Camera size={20} />
              Take Photo
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Tryit;
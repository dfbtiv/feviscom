const Tryit = () => {
 const sectionWrapper = "max-w-[1024px] mx-auto my-32 px-8 flex flex-col items-center";
 const container = "max-w-[1280px] mx-auto px-8 flex flex-col items-center";
  
  // Header styles (konsisten sama how it works)
  const titleStyle = "text-4xl font-extrabold text-primary mb-3 text-center";
  const descStyle = "text-primary/70 font-medium mb-12 text-center max-w-xl";

  // Upload Area Styles
  const uploadCard = "w-full max-w-[850px] aspect-[16/10] bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 flex flex-col items-center justify-center border-2 border-primary/10 transition-all duration-300 hover:border-primary/20";
  const dashedArea = "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:border-primary/40 hover:bg-primary/5";

  return (
    <section id="try-it" className={sectionWrapper}>
      <div className={container}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <h2 className={titleStyle}>AI Waste Detection</h2>
          <p className={descStyle}>
            Upload an image to identify the waste type and learn how to dispose of it.
          </p>
        </div>

        {/* Upload Card Area */}
        <div className={uploadCard}>
          <div className={dashedArea}>
            
            {/* Icon Besar */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Teks Upload */}
            <h4 className="text-xl font-bold text-primary mb-2">Drop your image here</h4>
            <p className="text-primary/60 text-sm max-w-xs mb-8">
              Supports JPG, PNG. High resolution images work best for AI accuracy.
            </p>

            {/* Buttons Area */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              
              {/* Button 1: Upload (Warna Lime) */}
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-lime text-primary font-semibold rounded-full hover:bg-lime/90 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Photo
              </button>

              {/* Button 2: Take (Warna Putih) */}
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-full border border-primary/20 hover:bg-primary/5 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Photo
              </button>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tryit;
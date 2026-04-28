import { ScanLine } from 'lucide-react';

const Hero = () => {

  const heroWrapper = "flex flex-col items-center text-center min-h-screen pt-[200px] pb-[80px] px-8 max-w-6xl mx-auto";
  const badgeStyle = "px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold flex items-center gap-2 cursor-default";
  const titleStyle ="text-primary text-center font-['Segoe_UI'] text-[75px] font-normal leading-[1.1] tracking-[-4.8px]";
  const titleBoldStyle ="font-bold font-['Segoe_UI'] text-[75px]";
  const descStyle = "flex flex-col justify-center shrink-0 w-full max-w-[748px] min-h-[98px] text-primary/80 text-center font-['Segoe_UI'] text-[20px] font-normal leading-relaxed";
  const buttonStyle = "px-10 py-4 bg-lime text-primary font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-lime/90 hover:-translate-y-1 active:scale-95";

  return (
    <section id="home" className={heroWrapper}>
      {/* Badge */}
      <div className="flex flex-col items-center gap-1">
        <div className={badgeStyle}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI Waste Detection engine
        </div>
        
        {/* Title */}
          <h1 className={titleStyle}>
            Sort Smart.  <span className={titleBoldStyle}>Save The Planet.</span>
          </h1>

          {/* Desc */}
          <p className={descStyle}>
            Instantly identify waste types and learn the correct disposal methods 
            with our advanced computer vision tool.
          </p>

          {/* Button */}
          <button className={`${buttonStyle} flex items-center gap-4`}>
            <ScanLine size={24} />
            Try it now 
          </button>
      </div>

    </section>
  );
};

export default Hero;
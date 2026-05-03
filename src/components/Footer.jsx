import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLink = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    if (name === 'Home' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate(`/#${slug}`);
    } else {
      const element = document.getElementById(slug);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-primary pt-8 md:pt-12 pb-6 px-4 mt-8 md:mt-12">
      <div className="max-w-[1100px] mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[30px] md:rounded-[40px] px-6 py-8 md:px-16 md:py-10 shadow-2xl">
        
        {/* Konten Utama: Stack di mobile, Grid di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.75fr_0.75fr] gap-10 md:gap-12 mb-10 items-start">
          
          {/* Kolom 1: Branding */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <div 
              className="flex items-center gap-3 group cursor-pointer w-fit"
              onClick={() => navigate('/')}
            >
              <img 
                src="/logo1.png" 
                alt="EcoVision AI Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform duration-500" 
              />
              <span className="text-white font-bold tracking-tight text-xl md:text-2xl">
                EcoVision 
              </span>
            </div>
            <p className="text-[13px] md:text-sm leading-relaxed text-white/50 max-w-[280px] md:max-w-[300px]">
              AI-powered waste classification platform for a sustainable future.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-white font-bold text-[11px] md:text-[13px] uppercase tracking-[0.2em] opacity-80">Quick Links</h4>
            <ul className="space-y-3 md:space-y-2 text-center md:text-left text-[13px] md:text-sm"> 
              {['Home', 'How It Works', 'Try It', 'Learn'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleQuickLink(item)} 
                    className="text-white/60 hover:text-lime transition-all duration-300 py-1"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Explore */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-white font-bold text-[11px] md:text-[13px] uppercase tracking-[0.2em] opacity-80">Explore</h4>
            <div className="flex flex-col items-center md:items-start space-y-3">
              <a href="https://github.com/dfbtiv/feviscom" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-lime group-hover:text-primary transition-all">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <span className="text-[13px] md:text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 mb-6" />

        {/* Bottom Bar: Stack di mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center items-center gap-2 text-white/30 text-[9px] md:text-[10px] font-medium tracking-wide">
            <span>© 2026 ECOVISION AI.</span>
            <span className="opacity-50">•</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
          <div className="text-[10px] flex items-center gap-1.5">
            <span className="text-white/20 uppercase tracking-[0.15em]">Created by</span>
            <span className="text-white/60 font-bold hover:text-lime transition-colors cursor-default">
              Kelompok 13
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { label: 'Beranda', target: '/', type: 'path' },
    { label: 'Cara Kerja', target: 'how-it-works', type: 'scroll' },
    { label: 'Coba Sekarang', target: 'try-it', type: 'scroll' },
    { label: 'Info Tambahan', target: '/Impact', type: 'path' },
    { label: 'Bank Sampah', target: '/bank-sampah', type: 'path' },
  ];

  const handleQuickLink = ({ target, type }) => {
    if (type === 'path') {
      navigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${target}`);
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-primary pt-8 sm:pt-10 md:pt-12 pb-6 px-3 sm:px-4 mt-8 sm:mt-10 md:mt-12">
      <div className="max-w-[1100px] mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[40px] px-4 sm:px-6 md:px-16 py-6 sm:py-8 md:py-10 shadow-2xl">
        
        {/* Konten Utama: Stack di mobile, Grid di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.75fr_0.75fr] gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 items-start">
          
          {/* Kolom 1: Branding */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <div 
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer w-fit"
              onClick={() => navigate('/')}
            >
              <img 
                src="/logo1.png" 
                alt="EcoVision AI Logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform duration-500" 
              />
              <span className="text-white font-bold tracking-tight text-lg sm:text-xl md:text-2xl">
                EcoVision 
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] md:text-sm leading-relaxed text-white/50 max-w-xs md:max-w-[300px]">
              Solusi untuk medeteksi sampah plastik, edukasi lingkungan, dan masa depan yang lebih bersih.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.2em] opacity-80">Akses Cepat</h4>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-2 text-center md:text-left text-xs sm:text-[13px] md:text-sm"> 
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => handleQuickLink(item)} 
                    type="button"
                    className="text-white/60 hover:text-lime transition-all duration-300 py-1"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Explore */}
          <div className="flex flex-col items-center md:items-start space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.2em] opacity-80">Code Kami</h4>
            <div className="flex flex-col items-center md:items-start space-y-2 sm:space-y-3">
              <a href="https://github.com/dfbtiv/viscom1" target="_blank" rel="noreferrer" className="flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-lime group-hover:text-primary transition-all text-xs sm:text-sm">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <span className="text-[12px] sm:text-[13px] md:text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider  */} 
        <div className="w-full h-[1px] bg-white/5 mb-4 sm:mb-5 md:mb-6" />

        {/* Bottom Bar: Stack di mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6">
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-white/30 text-[8px] sm:text-[9px] md:text-[10px] font-medium tracking-wide">
            <span>© 2026 ECOVISION.</span>
            <span className="opacity-50">•</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
          <div className="text-[8px] sm:text-[9px] md:text-[10px] flex items-center gap-1">
            <span className="text-white/20 uppercase tracking-[0.15em]">Created by</span>
            <span className="text-white/60 font-bold hover:text-lime transition-colors cursor-default">
              Besok Aja Team
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
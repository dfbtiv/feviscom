import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 
import logo from '../assets/logo.png';

const Footer = () => {
  const footerWrapper = "w-full bg-primary text-white/80 py-10 mt-20 border-t border-white/5";
  const footerContent = "w-[90%] max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10";

  return (
    <footer className={footerWrapper}>
      <div className={footerContent}>
        
        {/* Kolom 1: Brand & Vision */}
        <div className="space-y-6">
          {/* Logo dengan Efek Glass */}
          <div className="glass-effect  hover:border-lime/30 hover:bg-white/10 transition-all duration-500">
            <img src={logo} alt="EcoVision Logo" className="h-8 w-auto cursor-pointer" /> 
          </div> 
          
          <div className="space-y-4">
            <p className="text-xs max-w-xs leading-relaxed opacity-70">
              AI-powered waste classification platform for a sustainable future. 
              Helping you recycle smarter, one photo at a time.
            </p>
            
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold">
                © 2026 EcoVision AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Kolom 2: Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-white font-bold mb-6 text-base">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: 'Home', id: '#home' },
              { name: 'How It Works', id: '#how-it-works' },
              { name: 'Try It', id: '#try-it' },
              { name: 'Learn', id: '#learn' }
            ].map((link) => (
              <li key={link.id}>
                <a 
                  href={link.id} 
                  className="transition-all duration-300 flex items-center gap-2 group w-fit text-white/60 hover:text-lime"
                >
                  <span className="w-1.5 h-1.5 bg-lime rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Connect */}
        <div className="flex flex-col">
          <h4 className="text-white font-bold mb-6 text-base">Connect</h4>
          
          <div className="space-y-4">
            <a 
              href="https://github.com/dfbtiv/feviscom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-lime/30 hover:bg-white/10 transition-all duration-500 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-lime group-hover:text-primary transition-all duration-500 shadow-inner text-white group-hover:text-primary">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </div>
              <div>
                <p className="font-bold text-sm text-white group-hover:text-lime transition-colors">GitHub</p>
                <p className="text-[10px] opacity-50">Source Code</p>
              </div>
            </a>

            <div className="border-t border-white/5 pt-4">
              <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                Developed by:
              </span>
              <span className="font-bold text-xs text-white/80 hover:text-lime transition-colors cursor-default">
                Kelompok 13 — Besok aja
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
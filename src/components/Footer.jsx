import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    // 1. Footer luar: pt-10 (jarak atas) & mt-10 dipangkas biar gak terlalu turun
    <footer className="w-full bg-primary pt-6 pb-6 px-4 mt-6">
      
      {/* 2. Container Glass: md:p-16 kegedean, ganti jadi py-8 biar ceper atas-bawah */}
      <div className="max-w-[1100px] mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] px-8 py-8 md:px-16 md:py-10 shadow-2xl">
        
        {/* 3. Konten Utama: mb-20 diganti mb-8 biar gak ada ruang kosong raksasa di tengah */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.75fr_0.75fr] gap-12 mb-8 items-start">
          
          {/* Kolom 1 */}
          <div className="space-y-4"> {/* space-y-6 jadi 4 biar lebih rapet */}
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <img 
                src="/logo1.png" 
                alt="EcoVision AI Logo" 
                className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-500" 
              />
              <span className="text-white font-bold tracking-tight text-2xl">
                EcoVision 
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-[300px]">
              AI-powered waste classification platform for a sustainable future.
            </p>
          </div>

          {/* Kolom 2 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] opacity-80">Quick Links</h4>
            <ul className="space-y-2 text-sm"> {/* space-y-4 jadi 2 */}
              {['Home', 'How It Works', 'Try It', 'Learn'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/60 hover:text-lime transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] opacity-80">Connect</h4>
            <div className="space-y-3">
              <a href="https://github.com/dfbtiv/feviscom" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-lime group-hover:text-primary transition-all">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a href="mailto:hi@ecovision.ai" className="flex items-center gap-3 text-white/60 hover:text-white group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-lime group-hover:text-primary transition-all">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-medium">Contact Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Divider & Bottom Bar: mb-8 jadi mb-5 biar rapet */}
        <div className="w-full h-[1px] bg-white/5 mb-5" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/30 text-[10px] font-medium tracking-wide">
            <span>© 2026 ECOVISION AI.</span>
            <span className="hidden md:block opacity-50">•</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
          
          <div className="text-[10px]">
            <span className="text-white/20 uppercase tracking-widest mr-2">Created by</span>
            <span className="text-white/60 font-bold hover:text-lime transition-colors">
              Kelompok 13
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
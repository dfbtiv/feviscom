const Footer = () => {
  return (
    <footer className="bg-primary text-white/80 py-16 px-8 mt-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Kolom 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
             <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center text-primary text-xs">EV</div>
             EcoVision AI
          </div>
          <p className="text-sm max-w-xs opacity-70">
            AI-powered waste classification platform for a sustainable future.
          </p>
          <p className="text-xs pt-8 opacity-50">© 2026 EcoVision AI. All rights reserved.</p>
        </div>

        {/* Kolom 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-lime transition-colors">Home</a></li>
            <li><a href="#how-it-works" className="hover:text-lime transition-colors">Technology</a></li>
            <li><a href="#try-it" className="hover:text-lime transition-colors">Try It Now</a></li>
            <li><a href="#learn" className="hover:text-lime transition-colors">Benefits</a></li>
          </ul>
        </div>

        {/* Kolom 3: Connect */}
        <div className="space-y-4">
          <h4 className="text-white font-bold">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
               <span>🐙</span> <a href="#" className="hover:text-lime transition-colors">GitHub</a>
            </li>
            <li className="flex items-center gap-2">
               <span>✉️</span> <a href="#" className="hover:text-lime transition-colors">Contact Us</a>
            </li>
          </ul>
          <div className="pt-8 text-xs opacity-50 text-right md:text-left">
            Created by: Kelompok 11 - Besok Aja
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
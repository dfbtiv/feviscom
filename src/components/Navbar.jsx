import { useState, useEffect } from "react"
import logo from '../assets/logo.png';
import { Leaf, Layers, Scan, BookOpen, Menu, X, LayoutDashboard, LayoutDashboardIcon} from 'lucide-react'; 
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const menuList = [
    { name: 'Beranda', icon: Leaf, path: '/', type: 'path' }, 
    { name: 'Cara Kerja', icon: Layers, path: 'how-it-works', type: 'scroll' }, 
    { name: 'Coba Sekarang', icon: Scan, path: 'try-it', type: 'scroll' },
    { name: 'Info Lanjutan', icon: BookOpen, path: 'learn', type: 'scroll' },
  ];

  // Efek otomatis untuk mengunci menu aktif berdasarkan URL saat ini (Bagus untuk Reload halaman)
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setActiveMenu('Dashboard');
    } else if (location.pathname === '/') {
      // Jika di halaman home tapi tidak ada hash scroll, default ke Home
      if (!location.hash) {
        setActiveMenu('Home');
      }
    }
  }, [location]);

  const handleNavigation = (menu) => {
    setActiveMenu(menu.name);
    setIsMenuOpen(false); 

    if (menu.type === 'path') {
      navigate(menu.path);
      window.scrollTo(0, 0); 
    } else {
      // Jika sedang di /dashboard dan mengklik menu scroll, balik dulu ke / baru scroll
      if (location.pathname !== '/') {
        navigate(`/#${menu.path}`);
        // Berikan sedikit jeda waktu agar halaman berpindah dulu baru melakukan scroll
        setTimeout(() => {
          const element = document.getElementById(menu.path);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(menu.path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-4 sm:top-6 md:top-[30px] left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[90%] glass-effect rounded-2xl sm:rounded-3xl md:rounded-full z-[9999] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4">
        {/* Logo */}
        <img 
          src={logo} 
          alt="EcoVision Logo" 
          className="h-7 sm:h-8 md:h-10 w-auto cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => handleNavigation({ name: 'Home', path: '/', type: 'path' })}
        />
        
        {/* Hamburger Button */}
        <button 
          className="md:hidden text-primary p-1.5 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8">
          {menuList.map((menu) => {
            const Icon = menu.icon;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className={`
                    flex items-center gap-2 cursor-pointer transition-all duration-300 py-1 bg-transparent border-none
                    text-sm md:text-base font-['Segoe_UI'] outline-none
                    ${activeMenu === menu.name ? 'text-primary font-bold' : 'text-primary/70 hover:text-primary'}
                  `}
                >
                  <Icon size={16} strokeWidth={activeMenu === menu.name ? 2.5 : 2} />
                  {menu.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'max-h-[350px] opacity-100 pb-4 sm:pb-6' : 'max-h-0 opacity-0'}
      `}>
        <ul className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 border-t border-white/10 pt-3 sm:pt-4">
          {menuList.map((menu) => {
            const Icon = menu.icon;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className={`
                    flex items-center gap-3 sm:gap-4 w-full py-2 bg-transparent border-none text-left
                    text-sm sm:text-base font-['Segoe_UI'] outline-none
                    ${activeMenu === menu.name ? 'text-primary font-bold' : 'text-primary/70'}
                  `}
                >
                  <Icon size={18} strokeWidth={activeMenu === menu.name ? 2.5 : 2} />
                  {menu.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
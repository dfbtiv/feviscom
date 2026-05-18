import { useState } from "react"
import logo from '../assets/logo.png';
import { Leaf, Layers, Scan, BookOpen, Menu, X } from 'lucide-react'; // Tambah ikon Menu & X
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk mobile menu
  
  const menuList = [
    { name: 'Home', icon: Leaf, path: '/', type: 'path' }, 
    { name: 'How It Works', icon: Layers, path: 'how-it-works', type: 'scroll' }, 
    { name: 'Try It', icon: Scan, path: 'try-it', type: 'scroll' }, 
    { name: 'Learn', icon: BookOpen, path: 'learn', type: 'scroll' },
  ];

  const handleNavigation = (menu) => {
    setActiveMenu(menu.name);
    setIsMenuOpen(false); // Tutup menu setelah klik di mobile

    if (menu.type === 'path') {
      navigate(menu.path);
      window.scrollTo(0, 0); 
    } else {
      if (location.pathname !== '/') {
        navigate(`/#${menu.path}`);
      } else {
        const element = document.getElementById(menu.path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-[20px] md:top-[30px] left-1/2 -translate-x-1/2 w-[92%] md:w-[90%] glass-effect rounded-[24px] md:rounded-full z-[9999] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <div className="flex justify-between items-center px-6 md:px-8 py-3 md:py-4">
        {/* Logo */}
        <img 
          src={logo} 
          alt="EcoVision Logo" 
          className="h-8 md:h-10 w-auto cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => handleNavigation({ name: 'Home', path: '/', type: 'path' })}
        />
        
        {/* Hamburger Button */}
        <button 
          className="md:hidden text-primary p-2 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {menuList.map((menu) => {
            const Icon = menu.icon;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className={`
                    flex items-center gap-2 cursor-pointer transition-all duration-300 py-1 bg-transparent border-none
                    text-[14px] font-['Segoe_UI']
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
        ${isMenuOpen ? 'max-h-[300px] opacity-100 pb-6' : 'max-h-0 opacity-0'}
      `}>
        <ul className="flex flex-col gap-4 px-8 border-t border-white/10 pt-4">
          {menuList.map((menu) => {
            const Icon = menu.icon;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className={`
                    flex items-center gap-4 w-full py-2 bg-transparent border-none
                    text-[15px] font-['Segoe_UI']
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
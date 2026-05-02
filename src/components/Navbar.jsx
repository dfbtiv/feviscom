import { useState } from "react"
import logo from '../assets/logo.png';
import { Leaf, Layers, Scan, BookOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Home');
  
  const menuList = [
    { name: 'Home', icon: Leaf, path: '/', type: 'path' }, 
    { name: 'How It Works', icon: Layers, path: 'how-it-works', type: 'scroll' }, 
    { name: 'Try It', icon: Scan, path: 'try-it', type: 'scroll' }, 
    { name: 'Learn', icon: BookOpen, path: 'learn', type: 'scroll' },
  ];

  const handleNavigation = (menu) => {
    setActiveMenu(menu.name);

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
    <nav className="fixed top-[30px] left-1/2 -translate-x-1/2 w-[90%] glass-effect rounded-full z-[9999] bg-white/10 backdrop-blur-md border border-white/20">
      <div className="flex justify-between items-center px-8 py-4">
        <img 
          src={logo} 
          alt="EcoVision Logo" 
          className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => handleNavigation({ name: 'Home', path: '/', type: 'path' })}
        />
        
        <ul className="flex gap-8">
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
    </nav>
  );
};

export default Navbar;
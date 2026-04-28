import { useState } from "react"
import logo from '../assets/logo.png';
import { Leaf, Layers, Scan, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  const menuList = [
    { name: 'Home', icon: Leaf },
    { name: 'How It Works', icon: Layers}, 
    { name: 'Try It', icon: Scan}, 
    { name: 'Learn', icon: BookOpen},
  ];
  const getSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <nav className="fixed top-[30px] left-1/2 -translate-x-1/2 w-[90%] glass-effect rounded-full z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <img src={logo} alt="EcoVision Logo" className="h-10 w-auto cursor-pointer" />
        
        <ul className="flex gap-8">
          {menuList.map((menu) => {
            const Icon = menu.icon;

            return (
              <li key={menu.name}>
                <a
                  href={menu.name === 'Home' ? '#' : `#${getSlug(menu.name)}`}
                  onClick={() => setActiveMenu(menu.name)}
                  className={`
                    flex items-center gap-2 cursor-pointer transition-all duration-300 py-1
                    text-[14px] font-['Segoe_UI_Emoji'] leading-[20px]
                    ${activeMenu === menu.name
                      ? 'text-primary font-bold opacity-100' 
                      : 'text-primary/70 font-normal hover:text-primary opacity-100'}
                  `}
                >
                  <Icon size={16} strokeWidth={activeMenu === menu.name ? 2.5 : 2} />
                  {menu.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
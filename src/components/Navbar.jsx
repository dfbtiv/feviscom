import { useState } from "react"
import logo from '../assets/logo.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  const menuList = ['Home', 'How It Works', 'Try It', 'Learn'];
  const getSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <nav className="fixed top-[46px] left-1/2 -translate-x-1/2 w-[90%] glass-effect rounded-full z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <img src={logo} alt="EcoVision Logo" className="h-10 w-auto cursor-pointer" />
        
        <ul className="flex gap-8">
          {menuList.map((menu) => (
            <li key={menu}>
              <a
                href={menu === 'Home' ? '#' : `#${getSlug(menu)}`}
                onClick={() => setActiveMenu(menu)}
                className={`
                  block cursor-pointer transition-all duration-300 py-1
                  text-[14px] font-['Segoe_UI_Emoji'] leading-[20px]
                  ${activeMenu === menu 
                    ? 'text-primary font-bold opacity-100' 
                    : 'text-primary/70 font-normal hover:text-primary opacity-100'}
                `}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
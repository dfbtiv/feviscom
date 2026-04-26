import { useState } from "react"
import logo from '../assets/logo.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState('Home');
    const menuList = ['Home', 'How It Works', 'Try It', 'Learn'];
    
    return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] glass-effect rounded-full z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <img 
          src={logo} 
          alt="logo" 
          className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
        />
        <ul className="flex gap-8">
          {menuList.map((menu) => (
            <li
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`
                cursor-pointer transition-all duration-300 relative py-1
                text-center font-['Segoe_UI_Emoji'] text-[14px] font-normal leading-[20px] text-[#4D7111]/70
                hover:text-[#4D7111]
                ${activeMenu === menu ? '!text-[#4D7111] font-medium' : ''}
              `}
            >
              {menu}
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
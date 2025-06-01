import React, { useState } from 'react';
import { Menu, Bell, Globe, LogOut, ChevronDown, User } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

const Header = ({ toggleSidebar }) => {
  const {language, setLanguage} = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [language, setLanguage] = useState('ES');

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const toggleLanguage = () => {
  setLanguage(prev => {
    if (prev === 'ES') return 'EN';
    if (prev === 'EN') return 'FR';
    return 'ES';
  });
};

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none focus:text-indigo-600 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-600 hover:text-indigo-600 focus:outline-none">
            <Bell className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition duration-150 ease-in-out"
          >
            <Globe className="h-5 w-5 mr-1" />
            <span>{language}</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition duration-150 ease-in-out"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-1">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:block">Admin</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                  Mi Perfil
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                  Configuración
                </a>
                <hr className="my-1" />
                <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

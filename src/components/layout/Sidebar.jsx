import React from 'react';
import {
  Users, GraduationCap, BookOpen, MessageSquare,
  Info, Globe, Home, ChevronLeft, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname()
  const navItems = [
    { name: 'Inicio', pathname:'/Students', icon: <Home className="h-5 w-5" />, active: pathname.includes('Home') },
    { name: 'Profesores', pathname:'/Profesores', icon: <Users className="h-5 w-5" />, active: pathname.includes('Teachers') },
    { name: 'Estudiantes', pathname:'/Students', icon: <GraduationCap className="h-5 w-5" />, active: pathname.includes('Students') },
    { name: 'Clases', pathname:'/Classes', icon: <BookOpen className="h-5 w-5" />, active: pathname.includes('Classes') },
    // { name: 'Reseñas', pathname:'/Students', icon: <MessageSquare className="h-5 w-5" />, active: pathname.includes('') },
    // { name: 'Contactos', pathname:'/Students', icon: <MessageSquare className="h-5 w-5" />, active: pathname.includes('') },
    // { name: 'Sobre Nosotros', pathname:'/Students', icon: <Info className="h-5 w-5" />, active: pathname.includes('') },
    { name: 'Sitio Web', pathname:'/WebSite', icon: <Globe className="h-5 w-5" />, active: pathname.includes('WebSite') },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${
        isOpen ? 'w-64' : 'w-20'
      } md:relative fixed z-20 h-full`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <GraduationCap className="h-8 w-8 text-[#FEAB5F]" />
            <span className={`ml-2 font-bold text-lg whitespace-nowrap text-[#FEAB5F] ${!isOpen && 'hidden'}`}>
              NativoES
            </span>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-indigo-200 hover:text-white focus:outline-none hidden md:block"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.pathname}
              className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-all duration-150 ease-in-out ${
                item.active
                  ? 'bg-orange-400 text-white'
                  : 'text-indigo-200 hover:bg-orange-400 hover:text-white'
              }`}
            >
              <div className="mr-3 flex-shrink-0">{item.icon}</div>
              <span className={`truncate transition-opacity duration-150 ${!isOpen && 'opacity-0 hidden'}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className={`absolute bottom-0 w-full p-4 border-t border-gray-700 ${!isOpen && 'text-center'}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-xs font-medium">AD</span>
            </div>
          </div>
          <div className={`ml-3 ${!isOpen && 'hidden'}`}>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs font-medium text-indigo-200">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

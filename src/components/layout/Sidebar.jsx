'use client';
import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { navItemsAdmin, navItemsProfesor, navItemsStudent } from '@/data/menu';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { userDB } = useAppContext();
  const pathname = usePathname();

  const getItemsWithActive = (items) =>
    items.map((item) => ({
      ...item,
      active: pathname.includes(item.pathname),
    }));

  const itemsToRender =
    userDB?.rol === 'ESTUDIANTE'
      ? getItemsWithActive(navItemsStudent)
      : userDB?.rol === 'PROFESOR'
        ? getItemsWithActive(navItemsProfesor)
        : getItemsWithActive(navItemsAdmin);

  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside
      className={`bg-[#1f2937] text-white transition-all duration-300 ease-in-out transform ${isOpen ? 'w-64' : 'w-20'
        } md:relative fixed z-20 h-full shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 text-[#FEAB5F]" />
          <span
            className={`ml-2 font-bold text-lg text-[#FEAB5F] transition-all duration-300 ${!isOpen && 'opacity-0 hidden'}`}
          >
            NativoES
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-indigo-200 hover:text-white focus:outline-none hidden md:block"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2">
        <div className="space-y-1">
          {itemsToRender.map((item, index) => {
            const isActive = item.active || (item.children && item.children.some((c) => pathname.includes(c.pathname)));
            const submenuOpen = openSubmenus[index] || false;

            return (
              <div key={index}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                        ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'text-indigo-200 hover:bg-orange-400 hover:text-white'}
                      `}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span className={`truncate text-white transition-opacity duration-300 ${!isOpen && 'opacity-0 hidden'}`}>
                          {item.name}
                        </span>
                      </div>
                      {isOpen && (
                        <ChevronDown
                          className={`h-4 w-4 ml-auto transform transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    {submenuOpen && isOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={child.pathname}
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out
                              ${pathname.includes(child.pathname)
                                ? 'bg-orange-300 text-white'
                                : 'text-indigo-200 hover:bg-orange-300 hover:text-white'}
                            `}
                          >
                            <div className="mr-3">{child.icon}</div>
                            <span className="truncate text-white">{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.pathname}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                      ${item.active
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-indigo-200 hover:bg-orange-400 hover:text-white'}
                    `}
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className={`truncate text-white transition-opacity duration-300 ${!isOpen && 'opacity-0 hidden'}`}>
                      {item.name}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-0 w-full p-4 border-t border-gray-700 ${!isOpen && 'text-center'}`}>
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">AD</span>
          </div>
          <div className={`ml-3 ${!isOpen && 'hidden'}`}>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-indigo-200">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

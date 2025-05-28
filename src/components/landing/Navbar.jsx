'use client'

import React, { useState, useEffect } from 'react';
 import { useAppContext} from '@/contexts/Context';
;
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const { siteData } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white bg-opacity-95 shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">{siteData.footer.logo}</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {siteData.navigation.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-gray-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-20'
                  }`}
                >
                  {item.title}
                </a>
              ))}
              
              <button className="ml-4 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Test de nivel
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Clase gratuita
              </button>
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-blue-600"
                title="Dashboard"
              >
                <ChevronRight />
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white'
              } hover:bg-blue-600 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {siteData.navigation.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              {item.title}
            </a>
          ))}
          <div className="flex flex-col space-y-2 mt-3">
            <button className="w-full px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Test de nivel
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium rounded-md text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Clase gratuita
            </button>
            <Link 
              href="/dashboard" 
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <span>Dashboard</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
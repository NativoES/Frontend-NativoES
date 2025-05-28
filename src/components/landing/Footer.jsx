'use client'

import React from 'react';
 import { useAppContext
 } from '@/contexts/Context';
;
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const { siteData } = useAppContext();
  const { footer } = siteData;

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return <Mail size={20} />;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-6">{footer.logo}</h2>
            <p className="text-gray-400 mb-6">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {footer.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {siteData.navigation.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Nuestros horarios</h3>
            <div className="space-y-3 text-gray-400">
              <p>
                <span className="font-medium">Lunes - Viernes:</span><br />
                {siteData.contact.hours.monday}
              </p>
              <p>
                <span className="font-medium">Sábado:</span><br />
                {siteData.contact.hours.saturday}
              </p>
              <p>
                <span className="font-medium">Domingo:</span><br />
                {siteData.contact.hours.sunday}
              </p>
            </div>
            
            <h3 className="text-lg font-semibold mt-8 mb-4">Contactos</h3>
            <p className="text-gray-400 mb-2">{siteData.contact.phone}</p>
            <p className="text-gray-400">{siteData.contact.email}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">{footer.copyright}</p>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4 items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
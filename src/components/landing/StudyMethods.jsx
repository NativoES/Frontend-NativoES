'use client'

import React from 'react';
import { useAppContext } from '@/contexts/Context';
;
import {
  User, Users, MessageCircle, Zap, Book, Video, Star
} from 'lucide-react';

const getIconComponent = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'user':
      return <User size={24} />;
    case 'users':
      return <Users size={24} />;
    case 'message-circle':
      return <MessageCircle size={24} />;
    case 'zap':
      return <Zap size={24} />;
    case 'book':
      return <Book size={24} />;
    case 'video':
      return <Video size={24} />;
    default:
      return <Star size={24} />;
  }
};

const StudyMethods= () => {
  const { siteData } = useAppContext();
  const { methods } = siteData;

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {methods.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {methods.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.items.map((method) => (
            <div
              key={method.id}
              className="relative bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Subtle background shape */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 transform group-hover:-translate-y-2 transition-transform duration-500"></div>

              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {getIconComponent(method.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
            Clase gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudyMethods;
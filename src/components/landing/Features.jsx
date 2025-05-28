'use client'

import React from 'react';
 import { useAppContext
 } from '@/contexts/Context';
;
import { 
  Monitor, Puzzle, Video, Star, MessageCircle, ChevronRight
} from 'lucide-react';

const getIconComponent = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'monitor':
      return <Monitor size={24} />;
    case 'puzzle':
      return <Puzzle size={24} />;
    case 'video':
      return <Video size={24} />;
    case 'star':
      return <Star size={24} />;
    case 'message-circle':
      return <MessageCircle size={24} />;
    default:
      return <Star size={24} />;
  }
};

const Features = () => {
  const { siteData } = useAppContext();
  const { features } = siteData;

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {features.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.items.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                <span>Descubrir más</span>
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
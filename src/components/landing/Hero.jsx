'use client'

import React from 'react';
 import { useAppContext} from '@/contexts/Context';
;

const Hero = () => {
  const { siteData } = useAppContext();
  const { hero } = siteData;

  return (
    <section className="relative h-screen text-white" id="hero">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero.backgroundImage})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/50"></div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in">
            {hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl animate-fade-in animation-delay-200">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-in animation-delay-400">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors">
              {hero.ctaPrimary}
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white rounded-md font-medium transition-colors">
              {hero.ctaSecondary}
            </button>
          </div>
          <div className="flex items-center animate-fade-in animation-delay-600">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-bold text-2xl">{hero.studentsCount}</span>
              <span className="ml-2 text-gray-200">{hero.studentsText}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,154.7C672,128,768,96,864,90.7C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
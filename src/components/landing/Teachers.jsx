'use client'

import React from 'react';
 import { useAppContext} from '@/contexts/Context';
;

const Teachers = () => {
  const { siteData } = useAppContext();
  const { teachers } = siteData;

  return (
    <section className="py-20 bg-gray-50" id="teachers">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {teachers.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {teachers.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.profiles.map((teacher) => (
            <div 
              key={teacher.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{teacher.name}</h3>
                    <p className="text-blue-300">{teacher.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-blue-600 mb-3">{teacher.role}</p>
                <p className="text-gray-600">{teacher.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
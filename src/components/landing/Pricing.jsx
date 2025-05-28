'use client'

import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';
;
import { Check } from 'lucide-react';

const Pricing = () => {
  const { siteData } = useAppContext();
  const { pricing } = siteData;
  const [duration, setDuration] = useState('1');

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {pricing.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>
        
        <div className="mb-10 flex flex-col items-center">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setDuration('1')}
              className={`px-6 py-2 rounded-md font-medium text-sm ${
                duration === '1'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              1 clase a la semana
            </button>
            <button
              onClick={() => setDuration('4')}
              className={`px-6 py-2 rounded-md font-medium text-sm ${
                duration === '4'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              4 clases a la semana
            </button>
            <button
              onClick={() => setDuration('8')}
              className={`px-6 py-2 rounded-md font-medium text-sm ${
                duration === '8'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              8 clases a la semana
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.tiers.map((tier) => {
            const priceMultiplier = duration === '1' ? 1 : duration === '4' ? 4 : 8;
            const priceTotal = parseInt(tier.price) * priceMultiplier;
            const discountPriceTotal = tier.discountPrice ? parseInt(tier.discountPrice) * priceMultiplier : null;
            
            return (
              <div 
                key={tier.id} 
                className={`relative rounded-2xl overflow-hidden ${
                  tier.isPopular 
                  ? 'bg-white border-2 border-blue-500 shadow-xl transform -translate-y-4 lg:scale-105' 
                  : 'bg-white border border-gray-200 shadow-md'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 uppercase font-bold tracking-wider">
                    Popular
                  </div>
                )}
                <div className={`p-8 ${tier.isPopular ? 'bg-blue-50' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {tier.title}
                  </h3>
                  <div className="flex items-end gap-2 mb-6">
                    {discountPriceTotal ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">${discountPriceTotal}</span>
                        <span className="text-xl text-gray-500 line-through mb-1">${priceTotal}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">${priceTotal}</span>
                    )}
                    <span className="text-gray-500 mb-1">/ mes</span>
                  </div>
                </div>
                
                <div className="p-8 border-t border-gray-100">
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={20} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-medium ${
                    tier.isPopular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}>
                    {tier.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
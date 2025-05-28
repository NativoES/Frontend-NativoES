'use client'

import React, { useState, useEffect } from 'react';
 import { useAppContext} from '@/contexts/Context';
;
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const { siteData } = useAppContext();
  const { reviews } = siteData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.items.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === reviews.items.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);
  
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
          />
        ))}
      </div>
    );
  };

  const renderSlide = (index) => {
    const review = reviews.items[index];
    return (
      <div 
        key={review.id} 
        className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
          index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <img 
              src={review.avatar} 
              alt={review.author} 
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h4 className="text-xl font-semibold text-gray-900">{review.author}</h4>
            <div className="mt-2">
              {renderStars(review.rating)}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-lg italic">"{review.content}"</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-blue-50" id="reviews">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {reviews.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {reviews.subtitle}
          </p>
        </div>
        
        <div className="relative min-h-[280px] mb-10">
          {reviews.items.map((_, index) => renderSlide(index))}
        </div>
        
        <div className="flex justify-center space-x-2">
          {reviews.items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-4">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
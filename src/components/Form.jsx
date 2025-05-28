'use client'
import { useState } from 'react';

const HorizontalCard = ({ icon, title, description }) => {
    return (
        <div className={`flex border  rounded-lg overflow-hidden  shadow-md ${title === 'Success' && "border-green-500 bg-green-100"} ${title === 'Warning' && "border-orange-400 bg-orange-50"} ${title === 'Error' && "border-red-500 bg-red-50"}`}>
            {/* Icon Section */}
            <div className="flex items-center justify-center  w-1/5 p-1">

                <div className="flex items-center justify-center  p-4">
                    {title === "Success" && <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>}
                    {title === 'Error' && <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>}
                    {title === 'Warning' && <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-yellow-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z' /></svg>}
                </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center w-2/3 p-1">
            
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default HorizontalCard;

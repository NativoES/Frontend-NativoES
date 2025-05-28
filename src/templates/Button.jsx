// components/templates/Button.js
import React from 'react';

const Button = ({ onClick, children, variant = "primary", className }) => {
  const baseStyles = "px-4 py-2 rounded text-black";
  const variants = {
    primary: "bg-[#FEAB5F] text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300",
    secondary: "bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded transition duration-300",
    danger: "bg-red-500 hover:bg-red-500 py-2 px-4 rounded transition duration-300",
    success: "text-black bg-green-400 hover:bg-green-400 py-2 px-4 rounded transition duration-300",

  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

// #FEAB5F
// bg-gray-900 
// bg-gray-100
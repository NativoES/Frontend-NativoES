import React from 'react';

const Label = ({ children, className }) => {
  return (
    <label className={`block mb-2 text-gray-700 font-semibold ${className}`}>
      {children}
    </label>
  );
};

export default Label;
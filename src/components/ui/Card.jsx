import React from 'react';


const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`bg-white dark:bg-white rounded-lg shadow-md ${hover ? 'transition-transform hover:-translate-y-1 hover:shadow-lg' : ''} ${className}`}
    >
      {children}
    </div>
  );
};



export const CardContent= ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};



export const CardHeader = ({ children, className = '' }) => {
  return <div className={`p-5 border-b border-gray-200 dark:border-gray-200 ${className}`}>{children}</div>;
};



export const CardFooter = ({ children, className = '' }) => {
  return <div className={`p-5 border-t border-gray-200 dark:border-gray-200 ${className}`}>{children}</div>;
};

export default Card;
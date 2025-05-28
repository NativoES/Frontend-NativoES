import React, { forwardRef } from 'react';


const Textarea = (
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseClasses = 'rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700';
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '';
    
    const textareaClasses = `${baseClasses} ${widthClass} ${errorClass} ${className}`;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
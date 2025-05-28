import React, { useState } from 'react';



const Tabs = ({
  tabs,
  defaultValue,
  onChange,
  className = '',
  variant = 'default'
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || '');

  const handleTabClick = (value) => {
    setActiveTab(value);
    onChange?.(value);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return {
          container: 'space-x-2',
          tab: 'px-4 py-2 rounded-full',
          active: 'bg-blue-600 text-white',
          inactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        };
      case 'underline':
        return {
          container: 'border-b border-gray-200 dark:border-gray-700 space-x-4',
          tab: 'px-1 py-2 border-b-2 -mb-px',
          active: 'border-blue-600 text-blue-600 dark:text-blue-400',
          inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
        };
      default:
        return {
          container: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex',
          tab: 'px-4 py-2',
          active: 'bg-blue-600 text-white',
          inactive: 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`flex ${variantClasses.container} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`flex items-center transition-colors font-medium text-sm ${variantClasses.tab} ${
            activeTab === tab.value ? variantClasses.active : variantClasses.inactive
          }`}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
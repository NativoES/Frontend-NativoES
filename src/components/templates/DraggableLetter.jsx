import React from 'react';

const DraggableLetter = ({ letter, onDragStart }) => {
  return (
    <div
      className="cursor-pointer bg-blue-100 text-blue-600 w-12 h-12 rounded-lg shadow 
                hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center 
                text-xl font-bold"
      draggable
      onDragStart={(e) => onDragStart(e, letter)}
    >
      {letter}
    </div>
  );
};

export default DraggableLetter;
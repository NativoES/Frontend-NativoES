// components/templates/DroppableContainer.js
import React from 'react';

const DroppableContainer = ({ droppedText, feedback, onDrop, onDragOver }) => {
  console.log("resultado: ", feedback);
  
  return (
    <div
      className={`border-dashed border-2 border-gray-300 p-0 w-32  flex items-center justify-center mx-1  ${feedback === 'Correct!'? 'bg-green-300': feedback === 'Incorrect!' &&'bg-red-200'}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {droppedText ? (
        <span className="text-gray-800 text-sm">
          {droppedText} 
        </span>
      ) : (
        <span className="text-gray-400 text-sm">Drop here</span>
      )}
    </div>
  );
};

export default DroppableContainer;

import React from 'react';
import ModalTemplate from '@/templates/ModalTemplate'
const DroppableContainer = ({ index, onDrop, droppedLetters, feedback }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
      <div
        className="border-dashed border-2 border-gray-300 px-4 py-2 h-full flex items-center justify-center"
        onDrop={(e) => onDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedLetters[index] ? (
          <div className={`text-xl font-bold ${feedback[index] === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>
            {droppedLetters[index]}
            {/* {feedback[index] && (
              <div className={`text-xs mt-1 ${feedback[index] === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
                {feedback[index]}
              </div>
            )} */}
          </div>
        ) : (
          <span className="text-gray-400 text-xl ">?</span>
        )}
      </div>
  );
};

export default DroppableContainer;
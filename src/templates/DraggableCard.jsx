// components/templates/DraggableCard.js
import React from 'react';

const DraggableCard = ({ word, onDragStart }) => {
  return (
    <div
      className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
      draggable
      onDragStart={(e) => onDragStart(e, word)}
    >
      {word}
    </div>
  );
};

export default DraggableCard;

'use client';

import React from 'react';

const ImageModal = ({ isOpen, onClose, tituloPlantilla, description, imgURL, url }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizamos nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">&times;</button>
        <h2 className="text-2xl font-bold mb-4">{tituloPlantilla}</h2>
        <img src={imgURL} alt={tituloPlantilla} className="w-full h-auto mb-4 rounded" />
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4 block">
          Ver imagen Completa
        </a>
      </div>
    </div>
  );
};

export default ImageModal;

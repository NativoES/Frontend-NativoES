'use client';

import React from 'react';
import Button from '@/templates/Button';

export default function ImageUpload({ imagenSeleccionada, onImageSelect }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-lg mb-2">Imagen:</label>
      <div className="flex items-center">
        <input
          type="file"
          accept="image/*"
          onChange={onImageSelect}
          className="hidden"
          id="file-input"
        />
        <Button
          onClick={() => document.getElementById('file-input').click()}
          variant="primary"
        >
          Cargar imagen
        </Button>
        {imagenSeleccionada && (
          <div className="ml-4 w-16 h-16">
            <img
              src={imagenSeleccionada}
              alt="Vista previa"
              className="max-w-full h-auto rounded-lg transition-transform duration-300 hover:scale-125"
            />
          </div>
        )}
      </div>
    </div>
  );
}
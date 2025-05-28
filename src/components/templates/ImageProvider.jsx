'use client';

import React, { useState, useContext } from 'react';
import { ImageContext } from '@/contexts/ImageContext';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';
import Label from '@/templates/Labels';

export default function ImageProvider({ closeModal, onImageUpload }) {
  const { addImage } = useContext(ImageContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = () => {
    if (image && title) {
      const newImage = {
        imgURL: image,
        tituloPlantilla: title,
        description: description || 'Sin descripción',
      };
      addImage(newImage); // Si estás usando el contexto
      onImageUpload(newImage); // Pasamos la imagen al componente padre
      closeModal();
    } else {
      alert('Por favor, ingrese un título y seleccione una imagen.');
    }
  };

  const handleCancel = () => {
    setImage(null);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
        <ModalTemplate className="w-full ">
      <h2 className="text-2xl font-bold mb-4">Imagen Ejercicio</h2>

      {/* Título */}
      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese el título de la imagen"
        />
      </div>

      {/* Selector de imagen */}
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300"
        >
          <span>Subir Imagen</span>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Imagen seleccionada */}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Imagen seleccionada"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Descripción */}
      <div className="mb-4 mt-4">
        <Label htmlFor="description">Descripción:</Label>
        <TextAreaTemplate
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese una descripción"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <Button onClick={handleSaveImage} variant="primary">
          Guardar
        </Button>
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

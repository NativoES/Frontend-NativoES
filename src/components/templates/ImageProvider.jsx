'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { uploadImage } from '@/services/exercises/exercises.service';
import { useAppContext } from '@/contexts/Context';

export default function ImageUploadModal({ closeModal, onImageUpload }) {
  const { loader, setLoader } = useAppContext();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams();
  const id = params.id;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile || !title) {
      alert('Por favor, ingrese un título y seleccione una imagen.');
      return;
    }

    try {
      setLoader(true);

      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('titulo', title);
      formData.append('descripcion', description);
      formData.append('claseId', id);
      formData.append('template', 'imagen');

      const result = await uploadImage(formData);

      if (onImageUpload) onImageUpload(result);
      closeModal();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoader(false);
    }
  };


  const handleCancel = () => {
    setImageFile(null);
    setImagePreview(null);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <ModalTemplate className="w-full">
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
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Imagen seleccionada */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
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
        <Button onClick={handleSaveImage} variant="primary" disabled={loader}>
          {loader ? 'Guardando...' : 'Guardar'}
        </Button>
        <Button onClick={handleCancel} variant="secondary" disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

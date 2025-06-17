'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/Context';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { updateImage } from '@/services/exercises/exercises.service';

export default function FormEditImage() {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();

  const [imageFile, setImageFile] = useState(null);      
  const [imagePreview, setImagePreview] = useState(null);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!select) return;
    setTitle(select.titulo || '');
    setDescription(select.descripcion || '');
    setImagePreview(select.imageUrl || null);
  }, [select]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (!title.trim()) {
      alert('Por favor, ingrese un título para la imagen.');
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('titulo', title.trim());
      formData.append('descripcion', description.trim());
      if (imageFile) formData.append('file', imageFile);

      await updateImage(select._id, formData);

      setIsOpenModal(null);
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setIsOpenModal(null);
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4">Editar Imagen</h2>

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

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Imagen seleccionada"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mb-4 mt-4">
        <Label htmlFor="description">Descripción:</Label>
        <TextAreaTemplate
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese una descripción"
        />
      </div>

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

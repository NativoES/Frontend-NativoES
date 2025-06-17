'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { uploadGif } from '@/services/exercises/exercises.service';

export default function GifUploadModal({ closeModal, onGifUpload }) {
  const { loader, setLoader } = useAppContext();
  const [gifFile, setGifFile] = useState(null);
  const [gifPreview, setGifPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams();
  const id = params.id;

  const handleGifUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/gif') {
      setGifFile(file);
      setGifPreview(URL.createObjectURL(file));
    } else {
      alert('Por favor selecciona un archivo GIF válido.');
    }
  };

  const handleSaveGif = async () => {
    if (!gifFile || !title) {
      alert('Por favor, ingrese un título y seleccione un GIF.');
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('file', gifFile);
      formData.append('titulo', title);
      formData.append('descripcion', description || 'Sin descripción');
      formData.append('claseId', id);
      formData.append('template', 'gif');

      const result = await uploadGif(formData);

      if (onGifUpload) onGifUpload(result);
      closeModal();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setGifFile(null);
    setGifPreview(null);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4">GIF Ejercicio</h2>

      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese el título del GIF"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gif-upload"
          className="flex items-center justify-center px-4 py-2 bg-purple-400 text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300"
        >
          <span>Subir GIF</span>
        </label>
        <input
          id="gif-upload"
          type="file"
          accept="image/gif"
          onChange={handleGifUpload}
          className="hidden"
        />
      </div>

      {gifPreview && (
        <div className="mt-4">
          <img
            src={gifPreview}
            alt="GIF seleccionado"
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
        <Button onClick={handleSaveGif} variant="primary" disabled={loader}>
          {loader ? 'Guardando...' : 'Guardar'}
        </Button>
        <Button onClick={handleCancel} variant="secondary" disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

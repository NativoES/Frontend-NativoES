'use client';

import React, { useEffect, useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateGif } from '@/services/exercises/exercises.service';

export default function FormEditGif() {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();
  const [gifFile, setGifFile] = useState(null);
  const [gifPreview, setGifPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (select) {
      setTitle(select.titulo || '');
      setDescription(select.descripcion || '');
      setGifPreview(select.url || null);
    }
  }, [select]);

  const handleGifUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/gif') {
      setGifFile(file);
      setGifPreview(URL.createObjectURL(file));
    } else {
      alert('Por favor selecciona un archivo GIF válido.');
    }
  };

  const handleSaveEdit = async () => {
   

    try {
      setLoader(true);
      const formData = new FormData();

      if (gifFile) {
        formData.append('file', gifFile);
      }

      formData.append('titulo', title);
      formData.append('descripcion', description || 'Sin descripción');

      await updateGif(select._id, formData);

      setIsOpenModal(false);
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
    setIsOpenModal(false);
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4">Editar GIF</h2>

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
          <span>Cambiar GIF</span>
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
        <Button onClick={handleSaveEdit} variant="primary" disabled={loader}>
          {loader ? 'Guardando...' : 'Guardar cambios'}
        </Button>
        <Button onClick={handleCancel} variant="secondary" disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

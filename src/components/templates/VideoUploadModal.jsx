'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { uploadVideo } from '@/services/exercises/exercises.service';

export default function VideoUploadModal({ closeModal, onVideoUpload }) {
  const { setLoader, loader } = useAppContext();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams();
  const id = params.id;

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('video')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert('Por favor selecciona un archivo de video válido.');
    }
  };

  const handleSaveVideo = async () => {
    if (!videoFile || !title) {
      alert('Por favor, ingrese un título y seleccione un video.');
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('titulo', title);
      formData.append('descripcion', description);
      formData.append('claseId', id);
      formData.append('template', 'video');

      const result = await uploadVideo(formData);

      if (onVideoUpload) onVideoUpload(result);
      closeModal();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4">Video Ejercicio</h2>

      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese el título del video"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="video-upload"
          className="flex items-center justify-center px-4 py-2 bg-blue-400 text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300"
        >
          <span>Subir Video</span>
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>

      {videoPreview && (
        <div className="mt-4">
          <video controls className="w-full h-40 object-cover rounded-lg">
            <source src={videoPreview} />
            Tu navegador no soporta el video.
          </video>
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
        <Button onClick={handleSaveVideo} variant="primary" disabled={loader}>
          {loader ? 'Guardando...' : 'Guardar'}
        </Button>
        <Button onClick={handleCancel} variant="secondary" disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

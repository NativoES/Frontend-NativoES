'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/Context';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { updateVideo } from '@/services/exercises/exercises.service';

export default function FormEditVideo() {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();   
  const [videoFile, setVideoFile] = useState(null);     
  const [videoPreview, setVideoPreview] = useState(null); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!select) return;
    setTitle(select.titulo || '');
    setDescription(select.descripcion || '');
    setVideoPreview(select.videoUrl || null);           
    setVideoFile(null);                                 
  }, [select]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert('Por favor selecciona un archivo de video válido.');
    }
  };

  const handleSave = async () => {
    if (!select?._id) return;         
    if (!title.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('titulo', title.trim());
      formData.append('descripcion', description.trim());
      if (videoFile) formData.append('file', videoFile);

      await updateVideo(select._id, formData);

      setIsOpenModal(null);         
    } catch (err) {
      alert(err.message);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => setIsOpenModal(null);

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4">Editar video</h2>

      <div className="mb-4">
        <Label htmlFor="video-title">Título:</Label>
        <InputTemplate
          id="video-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del video"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="video-desc">Descripción:</Label>
        <TextAreaTemplate
          id="video-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción opcional"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="video-upload"
          className="flex items-center justify-center px-4 py-2 bg-blue-400 text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition"
        >
          <span>Cambiar video</span>
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
          <video controls className="w-full h-48 rounded-lg">
            <source src={videoPreview} />
            Tu navegador no soporta video.
          </video>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="primary" onClick={handleSave} disabled={loader}>
          {loader ? 'Guardando…' : 'Guardar cambios'}
        </Button>
        <Button variant="secondary" onClick={handleCancel} disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

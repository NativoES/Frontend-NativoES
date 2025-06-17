'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/Context';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import AudioRecorder from '../AudioRecorder';
import { updateAudio } from '@/services/exercises/exercises.service';

export default function FormEditAudio() {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();

  const [audioFile, setAudioFile] = useState(null);         
  const [audioName, setAudioName] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);     

  useEffect(() => {
    if (!select) return;
    setAudioName(select.titulo || '');
    setDescription(select.descripcion || '');
    setPreviewUrl(select.audioUrl || null);
  }, [select]);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Selecciona un archivo de audio válido.');
    }
  };

  const handleSave = async () => {
    if (!select?._id) return;
    if (!audioName.trim()) {
      alert('El título del audio es obligatorio.');
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('titulo', audioName.trim());
      formData.append('descripcion', description.trim());
      if (audioFile) formData.append('file', audioFile);

      await updateAudio(select._id, formData);

      setIsOpenModal(null);
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => setIsOpenModal(null);

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Audio</h2>

      <div className="mb-4">
        <InputTemplate
          label="Nombre del Audio"
          value={audioName}
          onChange={(e) => setAudioName(e.target.value)}
          placeholder="Ingrese el nombre del audio"
        />
      </div>

      <div className="mb-4">
        <TextAreaTemplate
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese una descripción para el audio"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Archivo de Audio
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="hidden"
          id="audio-upload"
        />
        <Button
          onClick={() => document.getElementById('audio-upload').click()}
          variant="success"
        >
          Elegir archivo
        </Button>
        {audioFile && (
          <p className="mt-2 text-sm text-gray-600">{audioFile.name}</p>
        )}
      </div>

      {previewUrl && (
        <div className="mb-4 mt-2">
          <audio controls src={previewUrl} className="w-full">
            Tu navegador no soporta el audio.
          </audio>
        </div>
      )}

      <AudioRecorder onAudioRecorded={(file) => {
        setAudioFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }} />

      <div className="flex justify-between mt-6">
        <Button onClick={handleSave} variant="primary" disabled={loader}>
          {loader ? 'Guardando...' : 'Guardar cambios'}
        </Button>
        <Button onClick={handleCancel} variant="secondary" disabled={loader}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

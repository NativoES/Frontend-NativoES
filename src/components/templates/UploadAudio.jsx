'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import AudioRecorder from '../AudioRecorder';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { uploadAudio } from '@/services/exercises/exercises.service';

export default function UploadAudio({ isOpen, onClose, onAudioUpload }) {
  const { setLoader, loader } = useAppContext();
  const [audioFile, setAudioFile] = useState(null);
  const [audioInputName, setAudioInputName] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams();
  const claseId = params.id;

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleSave = async () => {
    // if (!audioFile || !audioInputName.trim()) {
    //   alert('Por favor, completa el nombre del audio y selecciona un archivo.');
    //   return;
    // }
    setLoader(true);
    const formData = new FormData();
    formData.append('file', audioFile); // nombre del campo esperado en backend
    formData.append('titulo', audioInputName.trim());
    formData.append('descripcion', description.trim());
    formData.append('claseId', claseId);
    formData.append('template', 'audio');

    try {
      const result = await uploadAudio(formData);

      onAudioUpload?.(result);
      onClose();
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setLoader(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Audio</h2>

      <div className="mb-4">
        <InputTemplate
          label="Nombre del Audio"
          value={audioInputName}
          onChange={(e) => setAudioInputName(e.target.value)}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Archivo de Audio
        </h3>
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

      <AudioRecorder onAudioRecorded={setAudioFile} />

      <Button onClick={handleSave} className="w-full" variant="primary">
        Guardar
      </Button>
    </ModalTemplate>
  );
}

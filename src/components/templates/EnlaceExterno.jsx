'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { enlaceExterno } from '@/services/exercises/exercises.service';

export default function EnlaceExterno({ onSave, closeModal }) {
  const { loader, setLoader } = useAppContext();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enlace, setEnlace] = useState('');
  const params = useParams();
  const claseId = params.id;


  const handleSave = async () => {
    if (!titulo.trim() || !enlace.trim()) {
      alert('El título y el enlace son obligatorios');
      return;
    }

    const payload = {
      titulo,
      descripcion,
      enlace,
      claseId,
      template: 'enlaceExterno'
    };

    try {
      setLoader(true);
      const result = await enlaceExterno(payload);
      if (onSave) onSave(result);
      setLoader(false);
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Enlace Externo</h2>

      <div className="mb-4">
        <Label htmlFor="titulo">Título:</Label>
        <InputTemplate
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título del recurso"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="descripcion">Descripción:</Label>
        <InputTemplate
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción opcional"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="enlace">URL del recurso:</Label>
        <InputTemplate
          id="enlace"
          value={enlace}
          onChange={(e) => setEnlace(e.target.value)}
          placeholder="https://ejemplo.com"
        />
      </div>

      <Button
        onClick={handleSave}
        className="w-full"
        variant="primary"
        icon={<Save size={20} />}
        disabled={loader}
      >
        {loader ? 'Guardando...' : 'Guardar'}
      </Button>
    </ModalTemplate>
  );
}

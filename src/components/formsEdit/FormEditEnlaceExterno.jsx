'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateEnlaceExterno } from '@/services/exercises/exercises.service';

export const FormEditEnlaceExterno = () => {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enlace, setEnlace] = useState('');

  useEffect(() => {
    if (select) {
      setTitulo(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setEnlace(select.enlace || '');
    }
  }, [select]);

  const handleUpdate = async () => {
    if (!titulo.trim() || !enlace.trim()) {
      alert('El título y el enlace son obligatorios');
      return;
    }

    const payload = {
      titulo,
      descripcion,
      enlace,
    };

    try {
      setLoader(true);
      await updateEnlaceExterno(select._id, payload);

      setLoader(false);
      setIsOpenModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Enlace Externo</h2>

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
        onClick={handleUpdate}
        className="w-full"
        variant="primary"
        icon={<Save size={20} />}
        disabled={loader}
      >
        {loader ? 'Actualizando...' : 'Actualizar'}
      </Button>
    </ModalTemplate>
  );
}

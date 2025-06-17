'use client';

import React, { useEffect, useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import ModalTemplate from '@/templates/ModalTemplate';
import Button from '@/templates/Button';
import { useAppContext } from '@/contexts/Context';
import { updateNotaTexto } from '@/services/exercises/exercises.service';

export const FormEditNoteText = () => {
  const { select, setSelect, setIsOpenModal, loader, setLoader } = useAppContext();
  const [feature, setFeature] = useState({
    titulo: '',
    texto: '',
  });

  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (select) {
      setFeature({
        titulo: select.titulo || '',
        texto: select.texto || '',
      });
    }
  }, [select]);

  const handleFeatureChange = (field, value) => {
    setFeature((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!select?._id) return;
    setLoader(true);
    setMensaje(null);

    try {
      await updateNotaTexto(select._id, {titulo: feature.titulo, texto: feature.texto})
      alert('Nota actualizada correctamente');
      setIsOpenModal('');
      setSelect(null);
    } catch (error) {
      console.error(error);
      alert('Error al editar la nota');
    } finally {
      setLoader(false);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <p className='font-semibold text-2xl text-center pb-5'>Editar Nota o texto</p>
      <div className="p-6 border rounded-lg shadow-md bg-white space-y-4 max-w-xl mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={feature.titulo}
            onChange={(e) => handleFeatureChange('titulo', e.target.value)}
            placeholder="Escribe el título aquí"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
          <TextEditor
            value={feature.texto}
            setValue={(value) => handleFeatureChange('texto', value)}
            edit
          />
        </div>

        {mensaje && (
          <div className="text-sm text-center text-green-600 font-medium">{mensaje}</div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import TextEditor from '../textEditor/TextEditor';
import ModalTemplate from '@/templates/ModalTemplate';
import Button from '@/templates/Button';
import { useParams } from 'next/navigation';

export const NotesText = ({ nota = null, onClose, onSave }) => {
  const params = useParams();
  const id = params.id;

  const [feature, setFeature] = useState({
    titulo: '',
    texto: '',
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Prellenar campos si es edición
  useEffect(() => {
    if (nota) {
      setFeature({
        titulo: nota.titulo || '',
        texto: nota.texto || '',
      });
    }
  }, [nota]);

  const handleFeatureChange = (field, value) => {
    setFeature((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createNote = async (data) => {
    const newData = {
      ...data,
      claseId: id,
      template: 'notaTexto',
    };

    const response = await fetch('http://localhost:5001/api/nota-texto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (!response.ok) throw new Error('Error al crear la nota');

    return response.json();
  };

  const updateNote = async (data) => {
    const updatedData = {
      ...data,
      template: 'notaTexto',
    };

    const response = await fetch(`http://localhost:5001/api/nota-texto/${nota.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error('Error al actualizar la nota');

    return response.json();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMensaje(null);
    try {
      const response = nota
        ? await updateNote(feature)
        : await createNote(feature);

      setMensaje(nota ? 'Nota actualizada con éxito' : 'Nota guardada con éxito');
      if (onSave) onSave(response); // pasa la nota guardada/actualizada al padre
      if (onClose) onClose(); // cierra el modal
    } catch (error) {
      console.error(error);
      setMensaje('Ocurrió un error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <p className="font-semibold text-2xl text-center pb-5">
        {nota ? 'Editar Nota o Texto' : 'Agregar Nota o Texto'}
      </p>

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
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : nota ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
};

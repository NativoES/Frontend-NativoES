'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Label from '@/templates/Labels';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { seleccionPalabra } from '@/services/exercises/exercises.service';

const FormCreateSeleccionPalabras = ({ closeModal, onSave }) => {
  const {loader, setLoader} = useAppContext();
  const [title, setTitle] = useState('');
  const [exerciseText, setExerciseText] = useState('');
  const [preview, setPreview] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const { id: claseId } = useParams();

  useEffect(() => {
    const parts = exerciseText.split(/\[|\]/);
    const rendered = parts.map((part, index) =>
      index % 2 === 1 ? (
        <select key={index} className="mx-1 border rounded px-1 py-0.5 text-sm">
          {part.split('/').map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      ) : (
        <span key={index}>{part}</span>
      )
    );
    setPreview(rendered);
  }, [exerciseText]);

  const extractOpcionesPorGrupo = (text) => {
    const matches = text.match(/\[(.*?)\]/g) || [];
    return matches.map((m) => ({
      opciones: m.slice(1, -1).split('/'),
    }));
  };

  const handleSave = async () => {
    if (!title || !exerciseText || !claseId) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const payload = {
      titulo: title,
      textoOriginal: exerciseText,
      opcionesPorGrupo: extractOpcionesPorGrupo(exerciseText),
      claseId,
      template: 'seleccionPalabra',
      descripcion,
    };

    try {
      setLoader(true);
      const result = await seleccionPalabra(payload);
      if (onSave) onSave(result);
      closeModal();

    } catch (err) {
      console.error(err);
      setMensaje('Ocurrió un error al guardar');
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <ModalTemplate className="w-full">
      <h1 className="text-2xl font-bold mb-4">Crear ejercicio de Selección de Palabras</h1>

      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del ejercicio"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="descripcion">Descripción (opcional):</Label>
        <TextAreaTemplate
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del ejercicio"
          rows={2}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="exerciseText">Texto del ejercicio:</Label>
        <TextAreaTemplate
          value={exerciseText}
          onChange={(e) => setExerciseText(e.target.value)}
          placeholder="Ejemplo: El color del cielo es [azul/rojo/verde]"
          rows={4}
        />
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Vista previa:</h2>
        <div className="flex flex-wrap">{preview}</div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default FormCreateSeleccionPalabras;

'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';

const ExerciseCreator = ({ exercise = null, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [exerciseText, setExerciseText] = useState('');
  const [processedText, setProcessedText] = useState([]);

  // Al abrir modal, si hay un ejercicio, precarga los datos

  console.log();
  
  useEffect(() => {
    if (exercise) {
      setTitle(exercise.titulo || '');
      setExerciseText(exercise.texto || '');
    }
  }, [exercise]);

  useEffect(() => {
    processExerciseText();
  }, [exerciseText]);

  const processExerciseText = () => {
    const parts = exerciseText.split(/\[|\]/);
    const processed = parts.map((part, index) => {
      if (index % 2 === 1) {
        const options = part.split('/');
        return (
          <select
            key={index}
            className="inline-block px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      } else {
        return part;
      }
    });
    setProcessedText(processed);
  };

  const handleSave = () => {
    const data = {
      ...exercise,
      titulo: title,
      texto: exerciseText,
      template: 'notaTexto',
    };

    if (onSave) onSave(data); // lo manejas desde el componente padre
  };

  const handleCancel = () => {
    setTitle('');
    setExerciseText('');
    if (onClose) onClose(); // para cerrar el modal desde el padre
  };

  return (
    <ModalTemplate className="w-full">
      <h1 className="text-2xl font-bold mb-4">
        {exercise ? 'Editar Ejercicio' : 'Crear Nuevo Ejercicio'}
      </h1>

      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          placeholder="Ingrese el título del ejercicio"
        />
      </div>

      <div className="mb-4 p-3 bg-yellow-100 rounded-md">
        <p className="text-sm font-bold">
          Las palabras entre [ ] se pasarán a selección. Use "/" para múltiples opciones.
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="exerciseText">Texto del ejercicio:</Label>
        <TextAreaTemplate
          id="exerciseText"
          value={exerciseText}
          onChange={(e) => setExerciseText(e.target.value)}
          placeholder="Ingrese el texto del ejercicio. Use [palabra1/palabra2] para crear selecciones."
          rows={5}
        />
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Vista previa:</h2>
        <div>{processedText}</div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave}>
          {exercise ? 'Guardar Cambios' : 'Guardar'}
        </Button>
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default ExerciseCreator;

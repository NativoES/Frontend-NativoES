'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import LabelTemplate from '@/templates/Labels';
import Button from '@/templates/Button';
import InputTemplate from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';

export const parseExerciseText = (exerciseText, fillInWords, handleInputChange, errors) => {
  const parts = exerciseText.split(/(\[.*?\])/);
  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const word = part.slice(1, -1);
      const isError = errors[index];
      return (
        <div key={index} className="flex items-center space-x-2">
          <InputTemplate
            type="text"
            className={`px-1 py-1 p-0 mx-2 inline-block ${isError ? 'border-red-500' : ''}`}
            placeholder={word}
            value={fillInWords[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {isError ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : fillInWords[index] ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : null}
        </div>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function FillInTheBlanksModal({ onSave }) {
  const { isOpenModal, setIsOpenModal, select } = useAppContext();
  const [task, setTask] = useState('');
  const [exerciseText, setExerciseText] = useState('');
  const [fillInWords, setFillInWords] = useState({});
  const [errors, setErrors] = useState({});

  // Prellenar campos en caso de edición
  useEffect(() => {
    if (select && select.template === 'rellenar') {
      setTask(select.nombre || '');
      setExerciseText(select.textoEjercicio || '');
      // Opcional: setFillInWords con los datos si se guardaron previamente
    } else {
      setTask('');
      setExerciseText('');
      setFillInWords({});
      setErrors({});
    }
  }, [select]);

  const handleInputChange = (index, value) => {
    setFillInWords((prev) => ({ ...prev, [index]: value }));
  };

  const validateAnswers = () => {
    const parts = exerciseText.split(/(\[.*?\])/);
    let newErrors = {};

    parts.forEach((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const word = part.slice(1, -1);
        if (fillInWords[index] && fillInWords[index].toLowerCase() !== word.toLowerCase()) {
          newErrors[index] = 'incorrect';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isValid = validateAnswers();

    if (isValid && task && exerciseText) {
      const result = {
        nombre: task,
        textoEjercicio: exerciseText,
        template: 'rellenar',
        ...(select?.id && { id: select.id }), // Para identificar si es edición
      };

      onSave(result); // ya sea creando o actualizando
      setIsOpenModal(false);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  if (!isOpenModal) return null;

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {select ? 'Editar ejercicio' : 'Crear ejercicio'} de Rellenar Espacios
      </h2>

      <div className="mb-4">
        <LabelTemplate htmlFor="task">Título</LabelTemplate>
        <InputTemplate
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe un título"
        />
      </div>

      <div className="mb-4">
        <LabelTemplate htmlFor="exercise-text">Texto del ejercicio</LabelTemplate>
        <p>Usa [ ] para indicar los espacios a completar.</p>
        <TextAreaTemplate
          id="exercise-text"
          value={exerciseText}
          onChange={(e) => setExerciseText(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="mb-4 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Vista previa:</h3>
        {task && <h4 className="font-medium mb-2">{task}</h4>}
        <div className="flex flex-wrap">
          {parseExerciseText(exerciseText, fillInWords, handleInputChange, errors)}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={handleClose} variant="secondary">Cancelar</Button>
      </div>
    </ModalTemplate>
  );
}

'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import LabelTemplate from '@/templates/Labels';
import Button from '@/templates/Button';
import InputTemplate from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import ModalTemplate from '@/templates/ModalTemplate';

const parseExerciseText = (exerciseText, fillInWords, handleInputChange, errors) => {
  const parts = exerciseText.split(/(\[.*?\])/);
  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const word = part.slice(1, -1);
      const isError = errors[index];
      return (
        <div key={index} className="flex items-center space-x-2">
          <InputTemplate
            type="text"
            className={`px-1 py-1 p-0  mx-2  inline-block ${isError ? 'border-red-500' : ''}`}
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

export default function FillInTheBlanksModal({ isOpen, onClose, onSave }) {
  const [task, setTask] = useState('');
  const [exerciseText, setExerciseText] = useState('');
  const [fillInWords, setFillInWords] = useState({});
  const [errors, setErrors] = useState({});

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
      const filledText = exerciseText.replace(/\[.*?\]/g, (_, idx) => {
        return `[${fillInWords[idx] || ''}]`;
      });

      onSave({ nombre: task, textoEjercicio: filledText });
      onClose();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalTemplate className="w-full ">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Rellenar Espacios</h2>

      <div className="mb-4">
        <LabelTemplate htmlFor="task" className="text-lg font-medium text-gray-900 mb-1">
          Titulo
        </LabelTemplate>
        <InputTemplate
          id="task"
          className="w-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task description"
        />
      </div>

      <div className="mb-4">
        <LabelTemplate htmlFor="exercise-text" className="text-lg font-medium text-gray-900 mb-1">
          Texto para el ejercicio
        </LabelTemplate>

        <p>Ingresa el texto. Usa [ ] para las palabras a rellenar.</p>
        <TextAreaTemplate
          id="exercise-text"
          className="h-32"
          value={exerciseText}
          onChange={(e) => setExerciseText(e.target.value)}
        />
      </div>

      <div className="mb-4 p-4 border border-gray-300 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Vista Previa:</h3>
        {task && <h4 className="text-xl font-semibold text-gray-800 mb-2">{task}</h4>}
        <div className="text-gray-900 flex flex-wrap">
          {parseExerciseText(exerciseText, fillInWords, handleInputChange, errors)}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Guardar
        </Button>
        <Button
          onClick={onClose}
          className="bg-[#FEAB5F] text-white hover:bg-[#FE9B3F]"
        >
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
}

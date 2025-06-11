'use client';

import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { DeleteExercise } from './DeleteExercise';
import { FormEditOrdenarPalabrass } from '../formsEdit/FormEditOrdenarPalabrass';

export const OrdenarPalabraExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const palabras = exercise.palabrasEnOrden || [];

  useEffect(() => {
    setDroppedTexts(Array(palabras.length).fill(''));
    setFeedback(Array(palabras.length).fill(null));
  }, [exercise]);

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editOrdenarPalabra');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    if (!word) return;

    const newDropped = [...droppedTexts];
    newDropped[index] = word;
    setDroppedTexts(newDropped);

    // Check answer
    const isCorrect = word === palabras[index];
    const newFeedback = [...feedback];
    newFeedback[index] = isCorrect ? 'correct' : 'incorrect';
    setFeedback(newFeedback);
  };

  const handleDragOver = (e) => e.preventDefault();

  const DroppableContainer = ({ index }) => (
    <div
      className={`border-dashed border-2 px-4 py-2 rounded-md min-w-[100px] text-center transition
        ${feedback[index] === 'correct' ? 'bg-green-200 border-green-400' :
        feedback[index] === 'incorrect' ? 'bg-red-200 border-red-400' :
        'bg-gray-100 border-gray-300'}
      `}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={handleDragOver}
    >
      {droppedTexts[index] || <span className="text-gray-400 text-sm">Poner palabra</span>}
    </div>
  );

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ''}</p>

      <div className="mb-4">
        {/* Palabras arrastrables */}
        <div className="flex flex-wrap gap-2 mb-4">
          {palabras.map((word, index) => (
            <span
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              className="cursor-pointer inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded shadow hover:bg-blue-200"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Contenedores para soltar */}
        <div className="flex flex-wrap gap-2">
          {palabras.map((_, index) => (
            <DroppableContainer key={index} index={index} />
          ))}
        </div>
      </div>

      {isOpenModal === 'editOrdenarPalabra' && <FormEditOrdenarPalabrass />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
    </>
  );
};

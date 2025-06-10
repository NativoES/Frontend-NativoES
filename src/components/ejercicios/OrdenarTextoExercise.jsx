'use client';
import React, { useState, useEffect } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { DeleteExercise } from './DeleteExercise';
import { FormEditOrdenarTexto } from '../formsEdit/FormEditOrdenarTexto';

export const OrdenarTextoExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const [shuffledParts, setShuffledParts] = useState([]);
  const [orderedParts, setOrderedParts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const originalParts = exercise.palabrasOriginales || [];

  useEffect(() => {
    const shuffled = shuffleArray(originalParts);
    setShuffledParts(shuffled);
    setOrderedParts(Array(originalParts.length).fill(null));
    setFeedback(Array(originalParts.length).fill(null));
  }, [originalParts]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editOrdenarTexto');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleDragStart = (e, part) => {
    e.dataTransfer.setData('text/plain', part);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const part = e.dataTransfer.getData('text/plain');
    const newOrdered = [...orderedParts];
    newOrdered[index] = part;
    setOrderedParts(newOrdered);

    const newFeedback = [...feedback];
    newFeedback[index] = part === originalParts[index] ? 'OK!' : 'X';
    setFeedback(newFeedback);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="my-4 text-sm text-gray-600">
        {exercise.descripcion ?? ''}
      </p>

      {shuffledParts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Arrastra las partes en el orden correcto:
          </h3>

          <div className="flex flex-col gap-2 mb-4">
            {shuffledParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 bg-gray-100 cursor-move rounded-md"
                draggable
                onDragStart={(e) => handleDragStart(e, part)}
              >
                {part}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {orderedParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 h-12 flex items-center justify-between rounded-md"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                {part || 'Arrastra aquí'}
                {feedback[index] && (
                  <span
                    className={
                      feedback[index] === 'OK!' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {feedback[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpenModal === 'editOrdenarTexto' && <FormEditOrdenarTexto />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
    </>
  );
};

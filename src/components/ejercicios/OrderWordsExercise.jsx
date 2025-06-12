'use client';

import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { DeleteExercise } from './DeleteExercise';
import Label from '@/templates/Labels';
import DraggableLetter from '@/components/templates/DraggableLetter';
import DroppableContainer from '@/components/templates/DroppableContainer';
import { FormEditFormarPalabra } from '../formsEdit/FormEditFormarPalabra';

export const OrderWordsExercise = ({ exercise, onDelete }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const palabraCorrecta = exercise.palabraCorrecta || '';
  const letras = exercise.letras || [];
  const shuffledLetters = [...letras].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (palabraCorrecta) {
      setDroppedLetters(Array(palabraCorrecta.length).fill(''));
      setFeedback(Array(palabraCorrecta.length).fill(null));
    }
  }, [palabraCorrecta]);

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editFormarPalabra');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    if (letter) {
      const updated = [...droppedLetters];
      updated[index] = letter;
      setDroppedLetters(updated);

      const correct = letter === palabraCorrecta[index];
      const newFeedback = [...feedback];
      newFeedback[index] = correct ? 'Correcto' : 'Incorrecto';
      setFeedback(newFeedback);
    }
  };

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

      <div className="space-y-6">
        <div>
          <Label>Palabra a formar:</Label>
          <div className="text-gray-700 font-medium">{palabraCorrecta}</div>
        </div>

        <div className="flex flex-col space-y-8">
          {/* Letras arrastrables */}
          <div className="flex flex-wrap gap-4">
            {shuffledLetters.map((letter, index) => (
              <DraggableLetter
                key={index}
                letter={letter}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          {/* Contenedores para soltar */}
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: palabraCorrecta.length }).map((_, index) => (
              <DroppableContainer
                key={index}
                index={index}
                onDrop={handleDrop}
                droppedLetters={droppedLetters}
                feedback={feedback}
              />
            ))}
          </div>
        </div>
      </div>

      {isOpenModal === 'editFormarPalabra' && <FormEditFormarPalabra />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
    </>
  );
};

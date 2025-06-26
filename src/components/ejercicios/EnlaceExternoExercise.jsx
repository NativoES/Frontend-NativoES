'use client';

import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { DeleteExercise } from './DeleteExercise';
import { useAppContext } from '@/contexts/Context';
import { FormEditEnlaceExterno } from '../formsEdit/FormEditEnlaceExterno';
import { CloneExcercise } from './CloneExcercise';

export const EnlaceExternoExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editEnlaceExterno');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleClone = () => {
    setSelect(exercise);
    setIsOpenModal('cloneExercise');
  };

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={handleDelete}
        modal={isOpenModal}
        onClone={handleClone}
      />

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ''}</p>

      <div className="mt-4 bg-blue-50 p-4 rounded shadow">
        <a
          href={exercise.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-lg font-semibold"
        >
          {exercise.enlace}
        </a>
      </div>

      {isOpenModal === 'editEnlaceExterno' && <FormEditEnlaceExterno />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

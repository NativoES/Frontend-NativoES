import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { FormEditNote } from '../formsEdit/FormEditNote';
import { DeleteExercise } from './DeleteExercise';
import { CloneExcercise } from './CloneExcercise';

export const NotaExercise = ({ exercise, onDelete }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editNotes');
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

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ""}</p>

      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: exercise.colorTexto,
          color: exercise.color,
        }}
      >
        <h3 className="text-lg font-semibold mb-2">
          {exercise.titulo || 'Sin título'}
        </h3>
        <p className="whitespace-pre-wrap">
          {exercise.mensaje || 'Sin mensaje'}
        </p>
      </div>

      {isOpenModal === 'editNotes' && <FormEditNote />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}

    </>
  );
};

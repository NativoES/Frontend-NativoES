import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import Notes from '../templates/Notes';
import { useAppContext } from '@/contexts/Context';

export const NotaExercise = ({ exercise, onDelete }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const handleEdit = () => {
    setSelect(exercise);       
    setIsOpenModal('nota'); 
  };

  const handleClose = () => {
    setIsOpenModal(false);          
    setSelect(null);             
  };

  const handleSave = (savedNote) => {
    console.log('Guardado:', savedNote);
    handleClose();
    // Podrías actualizar una lista global aquí
  };

  console.log("modal  abrir: ", isOpenModal);
  

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={() => onDelete(exercise)}
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

      {isOpenModal && (
        <Notes
          nota={exercise}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

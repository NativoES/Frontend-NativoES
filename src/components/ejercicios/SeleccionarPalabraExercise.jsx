'use client';

import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { DeleteExercise } from './DeleteExercise';
import FormEditSeleccionPalabras from '../formsEdit/FormEditSeleccionPalabras';
import { CloneExcercise } from './CloneExcercise';

export const SeleccionarPalabraExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const [exerciseText, setExerciseText] = useState('');
  const [preview, setPreview] = useState([]);
  const [task, setTask] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (exercise) {
      setTask(exercise.titulo || '');
      setExerciseText(exercise.textoOriginal || '');
      setDescripcion(exercise.descripcion || '');
    }
  }, [exercise]);

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

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editSeleccionPalabra');
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

      <p className="my-4 text-sm text-gray-600">
        {descripcion || ''}
      </p>

      <div className="mb-4 p-4 border rounded-md bg-gray-50">

        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <div className="flex flex-wrap">{preview}</div>
        </div>
      </div>

      {isOpenModal === 'editSeleccionPalabra' && <FormEditSeleccionPalabras />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

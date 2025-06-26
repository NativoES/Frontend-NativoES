'use client';
import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { DeleteExercise } from './DeleteExercise';
import { parseExerciseText } from '../templates/FillInTheBlanks';
import { FormEditLlenarTexto } from '../formsEdit/FormEditLlenarTexto';
import { CloneExcercise } from './CloneExcercise';

export const LlenarTextoExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const [fillInWords, setFillInWords] = useState({});
  const [errors, setErrors] = useState({});
  const [task, setTask] = useState('');
  const [exerciseText, setExerciseText] = useState('');

  useEffect(() => {
    if (exercise) {
      setTask(exercise.titulo || '');
      setExerciseText(exercise.textoOriginal || '');
    }
  }, [exercise]);

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editLlenarTexto'); // cambia si usás un modal diferente
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleInputChange = (index, value) => {
    setFillInWords((prev) => ({ ...prev, [index]: value }));

    const correctWord = extractWords(exerciseText)[index];
    const isCorrect = value.trim().toLowerCase() === correctWord.toLowerCase();
    setErrors((prev) => ({ ...prev, [index]: isCorrect ? null : 'incorrect' }));
  };

  const extractWords = (text) => {
    const matches = text.match(/\[(.*?)\]/g) || [];
    return matches.map((m) => m.slice(1, -1));
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
        {exercise.descripcion ?? ''}
      </p>

      <div className="mb-4 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Vista previa:</h3>
        {task && <h4 className="font-medium mb-2">{task}</h4>}
        <div className="flex flex-wrap gap-2">
          {parseExerciseText(exerciseText, fillInWords, handleInputChange, errors)}
        </div>
      </div>

      {isOpenModal === 'editLlenarTexto' && <FormEditLlenarTexto />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

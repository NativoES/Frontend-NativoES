'use client';

import React, { useState, useEffect } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { DeleteExercise } from './DeleteExercise';
import { useAppContext } from '@/contexts/Context';
import { FormEditTrueFalse } from '../formsEdit/FormEditTrueFalse';

export const FalsoVerdaderoExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    if (!exercise?.preguntas) return;

    setRespuestas(
      exercise.preguntas.map(() => ({
        seleccion: null,
        correcto: null,
      }))
    );
  }, [exercise]);

  const handleSeleccion = (index, seleccion) => {
    const seleccionBool = seleccion === 'Verdadero' ? true : seleccion === 'Falso' ? false : null;
    const esCorrecto = seleccionBool === exercise.preguntas[index].respuestaCorrecta;
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = { seleccion, correcto: esCorrecto };
    setRespuestas(nuevasRespuestas);
  };

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editFalsoVerdadero');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const getColor = (estado) => {
    if (estado === null) return 'bg-gray-100';
    return estado ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400';
  };

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ''}</p>

      <div className="flex flex-col gap-6 mt-6">
        {exercise.preguntas?.map((pregunta, i) => (
          <div
            key={pregunta._id}
            className={`p-4 border rounded transition ${getColor(respuestas[i]?.correcto)}`}
          >
            <p className="mb-2 font-medium">{pregunta.texto}</p>
            <div className="flex gap-4">
              {['Verdadero', 'Falso', 'No sé'].map((opcion) => (
                <button
                  key={opcion}
                  className={`px-4 py-1 rounded border shadow-sm ${
                    respuestas[i]?.seleccion === opcion
                      ? 'bg-blue-100 border-blue-300'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSeleccion(i, opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>
            {respuestas[i]?.seleccion && (
              <p className="mt-2 text-sm">
                Tu respuesta: <strong>{respuestas[i].seleccion}</strong> —{' '}
                {respuestas[i].correcto ? (
                  <span className="text-green-600">Correcto</span>
                ) : (
                  <span className="text-red-600">Incorrecto</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {isOpenModal === 'editFalsoVerdadero' && <FormEditTrueFalse />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
    </>
  );
};

'use client';

import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { DeleteExercise } from './DeleteExercise';
import { useAppContext } from '@/contexts/Context';
import { FormEditRelacionarPalabra } from '../formsEdit/FormEditRelacionarPalabra';
import { CloneExcercise } from './CloneExcercise';

export const RelacionarPalabrasExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]); // [{left, right, correct}]

  useEffect(() => {
    if (!exercise?.parejas) return;

    const left = exercise.parejas.map(p => p.palabra);
    const right = shuffleArray(exercise.parejas.map(p => p.significado));

    setLeftWords(left);
    setRightWords(right);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
  }, [exercise]);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleLeftSelect = (word) => {
    setSelectedLeft(word);
    if (selectedRight) {
      checkPair(word, selectedRight);
    }
  };

  const handleRightSelect = (word) => {
    setSelectedRight(word);
    if (selectedLeft) {
      checkPair(selectedLeft, word);
    }
  };

  const checkPair = (left, right) => {
    const correct = exercise.parejas.some(
      pair => pair.palabra === left && pair.significado === right
    );

    setMatchedPairs(prev => [...prev, { left, right, correct }]);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const isMatched = (side, word) =>
    matchedPairs.find(p => p[side] === word);

  const getColor = (side, word) => {
    const match = matchedPairs.find(p => p[side] === word);
    if (!match) return '';
    return match.correct ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400';
  };

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editRelacionarPalabra');
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

      <div className="flex gap-10 mt-6 justify-center">
        {/* Izquierda */}
        <div className="flex flex-col gap-4">
          {leftWords.map((word, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded shadow hover:bg-gray-100 transition ${getColor('left', word)} ${selectedLeft === word ? 'ring-2 ring-blue-400' : ''
                }`}
              onClick={() => handleLeftSelect(word)}
              disabled={isMatched('left', word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Derecha */}
        <div className="flex flex-col gap-4">
          {rightWords.map((word, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded shadow hover:bg-gray-100 transition ${getColor('right', word)} ${selectedRight === word ? 'ring-2 ring-blue-400' : ''
                }`}
              onClick={() => handleRightSelect(word)}
              disabled={isMatched('right', word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {isOpenModal === 'editRelacionarPalabra' && <FormEditRelacionarPalabra />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

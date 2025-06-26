'use client';

import React, { useEffect, useState } from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { DeleteExercise } from './DeleteExercise';
import { useAppContext } from '@/contexts/Context';
import FormEditImagenPalabra from '../formsEdit/FormEditImagenPalabra';
import { CloneExcercise } from './CloneExcercise';

export const ImagenPalabraExercise = ({ exercise }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [images, setImages] = useState([]);
  const [randomWords, setRandomWords] = useState([]);

  useEffect(() => {
    if (!exercise) return;

    const asociaciones = exercise.asociaciones || [];
    const palabras = asociaciones.map((a) => a.palabra);
    const imagenes = asociaciones.map((a) => ({ src: a.imagenUrl, text: a.palabra }));

    setImages(imagenes);
    setDroppedTexts(Array(imagenes.length).fill(''));
    setFeedback(Array(imagenes.length).fill(null));
    setRandomWords(shuffleArray(palabras));
  }, [exercise]);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal('editImagenPalabra');
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const handleClone = () => {
    setSelect(exercise);
    setIsOpenModal('cloneExercise');
  };

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    if (!word) return;

    const updated = [...droppedTexts];
    updated[index] = word;
    setDroppedTexts(updated);

    const isCorrect = word === images[index].text;
    const newFeedback = [...feedback];
    newFeedback[index] = isCorrect ? 'correct' : 'incorrect';
    setFeedback(newFeedback);
  };

  const handleDragOver = (e) => e.preventDefault();

  const DroppableArea = ({ imageSrc, text, index }) => (
    <div className="border border-gray-400 rounded-lg flex flex-col items-center justify-center w-[150px]">
      <div
        className={`border-dashed border-2 p-2 w-full flex items-center justify-center transition text-center min-h-[40px]
          ${feedback[index] === 'correct' ? 'bg-green-200 border-green-400' :
            feedback[index] === 'incorrect' ? 'bg-red-200 border-red-400' :
              'bg-gray-100 border-gray-300'}`}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {text ? <span>{text}</span> : <span className="text-gray-400">Suelta aquí</span>}
      </div>
      <img src={imageSrc} alt="Imagen" className="w-[150px] h-[150px] object-cover rounded-[5px]" />
    </div>
  );

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

      <div className="flex flex-col gap-4 mt-6">
        {/* Palabras arrastrables */}
        <div className="flex flex-wrap gap-4">
          {randomWords.map((word, index) => (
            <div
              key={index}
              className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Contenedores con imágenes */}
        <div className="flex flex-wrap gap-6">
          {images.map((image, index) => (
            <DroppableArea
              key={index}
              imageSrc={image.src}
              text={droppedTexts[index]}
              index={index}
            />
          ))}
        </div>
      </div>

      {isOpenModal === 'editImagenPalabra' && <FormEditImagenPalabra />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

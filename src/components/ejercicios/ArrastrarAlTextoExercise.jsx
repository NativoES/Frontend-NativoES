import React from 'react';
import DraggableCard from '@/templates/DraggableCard';
import DroppableContainer from '@/templates/DroppableContainer';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { FormEditArrastrarTexto } from '../formsEdit/FormEditArrastrarTexto';
import { DeleteExercise } from './DeleteExercise';
import { CloneExcercise } from './CloneExcercise';

export const ArrastrarAlTextoExercise = ({
  exercise,
  index,
  droppedTextsMap,
  feedbackMap,
  handleDragStart,
  handleDrop,
  handleDragOver,
}) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal("EditarArrastrarTexto");
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

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ""}jajajja</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {exercise?.palabrasCorrectas?.map((word, wordIndex) => (
            <DraggableCard key={wordIndex} word={word} onDragStart={handleDragStart} />
          ))}
        </div>

        <div className="border rounded p-4 flex flex-wrap items-center">
          {exercise.textoOriginal &&
            exercise.textoOriginal.split(/(\[.*?\])/).map((part, idx) => {
              if (part.startsWith('[') && part.endsWith(']')) {
                return (
                  <DroppableContainer
                    key={idx}
                    droppedText={droppedTextsMap[index]?.[idx]}
                    feedback={feedbackMap[index]?.[idx]}
                    onDrop={(e) => handleDrop(e, idx, index)}
                    onDragOver={handleDragOver}
                  />
                );
              }
              return (
                <span key={idx} className="mr-1">
                  {part}
                </span>
              );
            })}
        </div>
      </div>

      {isOpenModal === "EditarArrastrarTexto" && <FormEditArrastrarTexto />}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}

    </>
  );
};

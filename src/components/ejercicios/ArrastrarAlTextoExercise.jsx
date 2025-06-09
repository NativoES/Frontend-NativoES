import React from 'react';
import DraggableCard from '@/templates/DraggableCard';
import DroppableContainer from '@/templates/DroppableContainer';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import FillInTheBlanks from '@/components/templates/FillInTheBlanks'

export const ArrastrarAlTextoExercise = ({
  exercise,
  index,
  droppedTextsMap,
  feedbackMap,
  handleDragStart,
  handleDrop,
  handleDragOver,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={() => onEdit(exercise)}
        onDelete={() => onDelete(exercise)}
      />

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ""}</p>

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
      <FillInTheBlanks isOpen={true} onClose={closeModal} onSave={handleExerciseAdd} />
        
    </>
  );
};

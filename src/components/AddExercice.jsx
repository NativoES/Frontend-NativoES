// AddExercise.js
'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import TemplateStore from '@/components/TemplateStore';
import { ButtonTemplate } from '@/templates/ButtonTemplate';
import { CardTemplate } from '@/templates/CardTemplate';
import { InputTemplate } from '@/templates/InputTemplate';

export default function AddExercise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [exercises, setExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleExerciseAdd = (newExercise) => {
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    closeModal();
  };

  const handleInputChange = (index, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold mb-6">Exercise List</h1>

          {exercises.length === 0 && (
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-center text-gray-600">
                There are no exercises in this section yet. Add an exercise.
              </p>
            </div>
          )}

          {exercises.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {exercises.map((exercise, index) => (
                <CardTemplate key={index}>
                  {exercise.imgURL && (
                    <>
                      <img
                        src={exercise.imgURL}
                        alt={exercise.tituloPlantilla}
                        className="w-full h-80 object-cover rounded-md"
                      />
                      {exercise.tituloPlantilla && (
                        <h3 className="mt-2 text-xl font-semibold text-gray-800">
                          {exercise.tituloPlantilla}
                        </h3>
                      )}
                      {exercise.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {exercise.description}
                        </p>
                      )}
                    </>
                  )}

                  {exercise.audio && (
                    <CardTemplate>
                      {exercise.nombre && (
                        <h3 className="text-xl font-semibold text-gray-800">
                          {exercise.nombre}
                        </h3>
                      )}
                      {exercise.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {exercise.description}
                        </p>
                      )}
                      <audio controls className="w-full mt-2">
                        <source src={URL.createObjectURL(exercise.audio)} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </ModalTemplate>
                  )}

                  {exercise.textoEjercicio &&
                    exercise.textoEjercicio.split(/(\[.*?\])/).map((part, idx) => {
                      if (part.startsWith('[') && part.endsWith(']')) {
                        return (
                          <InputTemplate
                            key={idx}
                            value={userAnswers[idx] || ''}
                            onChange={(e) => handleInputChange(idx, e.target.value)}
                          />
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                </ModalTemplate>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <ButtonTemplate href="?modal=template" text="Add Exercise" />
        </div>
      </div>

      <TemplateStore />
    </div>
  );
}

'use client';

import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { NotesText } from '../templates/NotesText';

export const NotaTextoExercise = ({ exercise, onDelete }) => {
    const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

    const closeModal = () => {
        setIsOpenModal(false);
        setSelect(null);
    };

    const onSave = () => {
        if (confirm("¿Guardar cambios?")) {
            closeModal();
        }
    };

    return (
        <>
            <ExerciseCardHeader
                title={exercise.titulo || 'Ejercicio sin título'}
                onEdit={() => {
                    setSelect(exercise);
                    setIsOpenModal(true);
                }}
                onDelete={() => onDelete(exercise)}
            />

            <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ""}</p>

            <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: exercise.texto }}
            />

            {isOpenModal && (
                <NotesText
                    nota={exercise} // null si es nueva
                    onClose={() => setIsOpenModal(false)}
                    onSave={(updatedOrCreatedNote) => {
                        // actualizas el estado general
                        console.log('Guardado:', updatedOrCreatedNote);
                    }}
                />

            )}
        </>
    );
};

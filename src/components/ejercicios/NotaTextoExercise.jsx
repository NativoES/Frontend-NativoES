'use client';

import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { useAppContext } from '@/contexts/Context';
import { FormEditNoteText } from '../formsEdit/FormEditNoteText';
import { DeleteExercise } from './DeleteExercise';
import { CloneExcercise } from './CloneExcercise';

export const NotaTextoExercise = ({ exercise, onDelete }) => {
    const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

    const handleEdit = () => {
        setSelect(exercise);
        setIsOpenModal('editNoteText');

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

            <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ""}</p>

            <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: exercise.texto }}
            />

            {isOpenModal === 'editNoteText' && <FormEditNoteText />}
            {isOpenModal === 'deleteExercise' && <DeleteExercise />}
            {isOpenModal === 'cloneExercise' && <CloneExcercise />}

        </>
    );
};

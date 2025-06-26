'use client';

import React from 'react';
import { ExerciseCardHeader } from '../headers/ExerciseCardHeader';
import { DeleteExercise } from './DeleteExercise';
import { useAppContext } from '@/contexts/Context';
import FormEditGif from '../formsEdit/FormEditGif';
import FormEditAudio from '../formsEdit/FormEditAudio';
import FormEditVideo from '../formsEdit/FormEditVideo';
import FormEditImage from '../formsEdit/FormEditImage';
import { CloneExcercise } from './CloneExcercise';

const renderMedia = (template, exercise) => {
  let url = '';

  switch (template) {
    case 'gif':
      url = exercise.gifUrl;
      return url ? (
        <img src={url} alt="Vista previa" className="w-full h-60 object-cover rounded-lg" />
      ) : (
        <p className="text-red-500">Archivo no disponible.</p>
      );

    case 'imagen':
      url = exercise.imagenUrl;
      return url ? (
        <img src={url} alt="Vista previa" className="w-full h-60 object-cover rounded-lg" />
      ) : (
        <p className="text-red-500">Archivo no disponible.</p>
      );

    case 'video':
      url = exercise.videoUrl;
      return url ? (
        <video controls className="w-full rounded-lg" src={url}>
          Tu navegador no soporta videos.
        </video>
      ) : (
        <p className="text-red-500">Archivo no disponible.</p>
      );

    case 'audio':
      url = exercise.audioUrl;
      return url ? (
        <audio controls className="w-full" src={url}>
          Tu navegador no soporta audio.
        </audio>
      ) : (
        <p className="text-red-500">Archivo no disponible.</p>
      );

    default:
      return <p>Tipo de archivo no soportado.</p>;
  }
};


const renderEditForm = (template) => {
  switch (template) {
    case 'gif':
      return <FormEditGif />;
    case 'audio':
      return <FormEditAudio />;
    case 'video':
      return <FormEditVideo />;
    case 'imagen':
      return <FormEditImage />;
    default:
      return null;
  }
};

export const MediaExercise = ({ exercise, onDelete }) => {
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext();

  const handleEdit = () => {
    setSelect(exercise);
    setIsOpenModal(`edit${capitalize(exercise.template)}`);
  };

  const handleDelete = () => {
    setSelect(exercise);
    setIsOpenModal('deleteExercise');
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const handleClone = () => {
    setSelect(exercise);
    setIsOpenModal('cloneExercise');
  };

  return (
    <>
      <ExerciseCardHeader
        title={exercise.titulo || 'Ejercicio sin título'}
        onEdit={handleEdit}
        onDelete={handleDelete || onDelete}
        modal={isOpenModal}
        onClone={handleClone}
      />

      <p className="my-4 text-sm text-gray-600">{exercise.descripcion ?? ''}</p>

      <div className="my-4">{renderMedia(exercise.template, exercise)}</div>

      {isOpenModal === `edit${capitalize(exercise.template)}` && renderEditForm(exercise.template)}
      {isOpenModal === 'deleteExercise' && <DeleteExercise />}
      {isOpenModal === 'cloneExercise' && <CloneExcercise />}
    </>
  );
};

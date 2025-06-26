'use client';

import React from 'react';
import { useAppContext } from '@/contexts/Context';
import { deleteExercises } from '@/services/exercises/exercises.service';

export const DeleteExercise = () => {
  const { select, setIsOpenModal, setSelect, loader, setLoader } = useAppContext();

  const handleDelete = async () => {
    if (!select?._id) return;

    try {
      setLoader(true);
      await deleteExercises(select._id)
      setIsOpenModal('');
      setSelect(null);
      setLoader(false);
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-red-600">¿Estás seguro?</h2>
        <p className="text-center text-gray-700 mt-3">
          Estás a punto de eliminar el ejercicio{' '}
          <span className="font-semibold text-black">"{select?.titulo ?? 'sin título'}"</span>.
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setIsOpenModal('')}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={loader}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {loader ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};

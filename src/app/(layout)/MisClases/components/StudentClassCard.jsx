'use client';

import React from 'react';
import { Calendar, BookOpenText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const StudentClassCard = ({ clase }) => {
   const router = useRouter();
  const handleClick = () => {
    router.push(`/MisClases/${clase._id}`);
  };

  return (
    <div onClick={handleClick} className="flex bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200 cursor-pointer">
      {clase.imagen && (
        <img
          src={clase.imagen}
          alt={clase.nombreClase}
          className="w-32 h-32 object-cover"
        />
      )}

      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{clase.nombreClase}</h2>
          <p className="text-sm text-gray-500 mb-1">{clase.descripcion || 'Sin descripción'}</p>

          <div className="flex flex-wrap text-sm text-gray-600 gap-x-4 mt-2">
            <span className="inline-flex items-center gap-1">
              <BookOpenText className="w-4 h-4" />
              {clase.nivel ? `Nivel ${clase.nivel}` : 'Sin nivel'}
            </span>
            <span className="inline-flex items-center gap-1">
              🌐 {clase.idioma}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {clase.horario?.join(', ') || 'Sin horario'}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Creado el: {new Date(clase.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function Layout({ children }) {
  const { id } = useParams();
  const pathname = usePathname();

  const tabs = [
    { label: 'Ejercicios', path: `/AddExercice/${id}/Exercise` },
    { label: 'Estudiantes', path: `/AddExercice/${id}/Students` },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md h-[90vh] flex flex-col">

        {/* Navegador */}
        <div className="w-full border-b pb-2 mb-4 flex justify-start space-x-8">
          {tabs.map((tab) => {
            const active = pathname === tab.path;
            return (
              <Link
                key={tab.label}
                href={tab.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'border-b-2 border-orange-500 text-orange-500 pb-1'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Contenido con scroll (ocupa todo el espacio restante) */}
        <div className="flex-1 overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}

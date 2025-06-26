import { Copy, Pencil, Trash } from 'lucide-react';
import React from 'react'

export const ExerciseCardHeader = ({ title, onEdit, onDelete, modal, onClone }) => (
    <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
            {
                modal === "descubrir" ? (
                    <button
                        onClick={onClone}
                        className="p-1 rounded hover:bg-gray-200 transition"
                        title="Clonar ejercicio"
                    >
                        <Copy className="w-5 h-5 text-blue-500" />
                    </button>
                ) : (
                    <>

                        <button
                            onClick={onEdit}
                            className="p-1 rounded hover:bg-gray-200 transition"
                            title="Editar"
                        >
                            <Pencil className="w-5 h-5 text-blue-500" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-1 rounded hover:bg-gray-200 transition"
                            title="Eliminar"
                        >
                            <Trash className="w-5 h-5 text-red-500" />
                        </button>
                    </>
                )
            }
        </div>
    </div>
);
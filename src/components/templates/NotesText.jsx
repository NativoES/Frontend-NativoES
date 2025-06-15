'use client';

import React, { useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import ModalTemplate from '@/templates/ModalTemplate';
import Button from '@/templates/Button';
import { useParams } from 'next/navigation';

export const NotesText = () => {
    const params = useParams();
    const id = params.id;
    const [feature, setFeature] = useState({
        titulo: '',
        texto: '',
    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    const handleFeatureChange = (field, value) => {
        setFeature((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const createNotes = async (data) => {

        const newData = {
            ...data,
            claseId: id,
            template: "notaTexto"
        }
        const response = await fetch('http://localhost:5001/api/nota-texto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error('Error al crear la nota');
        }

        return response.json();
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMensaje(null);
        try {
            await createNotes(feature);
            setMensaje('Nota guardada con éxito');
            setFeature({ titulo: '', texto: '' });
        } catch (error) {
            console.error(error);
            setMensaje('Ocurrió un error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalTemplate className="w-full">
            <p className='font-semibold text-2xl text-center pb-5'>Agregar Nota o texto</p>
            <div className="p-6 border rounded-lg shadow-md bg-white space-y-4 max-w-xl mx-auto">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={feature.titulo}
                        onChange={(e) => handleFeatureChange('titulo', e.target.value)}
                        placeholder="Escribe el título aquí"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
                    <TextEditor
                        value={feature.texto}
                        setValue={(value) => handleFeatureChange('texto', value)}
                        edit
                    />
                </div>

                {mensaje && (
                    <div className="text-sm text-center text-green-600 font-medium">{mensaje}</div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    );
};

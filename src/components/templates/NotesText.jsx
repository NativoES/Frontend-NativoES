'use client';

import React, { useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import ModalTemplate from '@/templates/ModalTemplate';
import Button from '@/templates/Button';
import { useParams } from 'next/navigation';
import { notaTexto } from '@/services/exercises/exercises.service';
import { useAppContext } from '@/contexts/Context';

export const NotesText = ({ closeModal, onSave }) => {
    const { loader, setLoader } = useAppContext();
    const params = useParams();
    const id = params.id;
    const [mensaje, setMensaje] = useState(null);
    const [feature, setFeature] = useState({
        titulo: '',
        texto: '',
    });


    const handleFeatureChange = (field, value) => {
        setFeature((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleSubmit = async () => {
        setLoader(true);
        setMensaje(null);
        try {

            const newData = {
                ...feature,
                claseId: id,
                template: "notaTexto"
            }

            const result = await notaTexto(newData);
            setMensaje('Nota guardada con éxito');
            setFeature({ titulo: '', texto: '' });
            if (onSave) onSave(result);
            closeModal();
        } catch (error) {
            console.error(error);
            setMensaje('Ocurrió un error al guardar');
        } finally {
            setLoader(false);
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
                        disabled={loader}
                    >
                        {loader ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    );
};

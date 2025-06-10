'use client';

import React, { useEffect, useState } from 'react';
import ModalTemplate from '@/templates/ModalTemplate';
import Label from '@/templates/Labels';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import { useAppContext } from '@/contexts/Context';
import { useParams } from 'next/navigation';

const FormEditSeleccionPalabras = () => {
    const { select, setIsOpenModal } = useAppContext();

    const [title, setTitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [exerciseText, setExerciseText] = useState('');
    const [preview, setPreview] = useState([]);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (select) {
            setTitle(select.titulo || '');
            setDescripcion(select.descripcion || '');
            setExerciseText(select.textoOriginal || '');
        }
    }, [select]);

    useEffect(() => {
        const parts = exerciseText.split(/\[|\]/);
        const rendered = parts.map((part, index) =>
            index % 2 === 1 ? (
                <select key={index} className="mx-1 border rounded px-1 py-0.5 text-sm">
                    {part.split('/').map((opt, i) => (
                        <option key={i}>{opt}</option>
                    ))}
                </select>
            ) : (
                <span key={index}>{part}</span>
            )
        );
        setPreview(rendered);
    }, [exerciseText]);

    const extractOpcionesPorGrupo = (text) => {
        const matches = text.match(/\[(.*?)\]/g) || [];
        return matches.map((m) => ({
            opciones: m.slice(1, -1).split('/'),
        }));
    };

    const handleSave = async () => {
        const payload = {
            titulo: title,
            textoOriginal: exerciseText,
            opcionesPorGrupo: extractOpcionesPorGrupo(exerciseText),
            descripcion,
        };

        try {
            const res = await fetch(`http://localhost:5001/api/seleccion-palabra/${select._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.message || 'Error al guardar');
                return;
            }

            setIsOpenModal(false);
        } catch (error) {
            console.error(error);
            alert('Error de conexión al servidor');
        }
    };

    const handleCancel = () => {
        setIsOpenModal(false);
    };

    return (
        <ModalTemplate className="w-full">
            <h1 className="text-2xl font-bold mb-4">Editar ejercicio de Selección de Palabras</h1>

            <div className="mb-4">
                <Label>Título:</Label>
                <InputTemplate
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título del ejercicio"
                />
            </div>

            <div className="mb-4">
                <Label>Descripción:</Label>
                <TextAreaTemplate
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción del ejercicio"
                    rows={2}
                />
            </div>

            <div className="mb-4">
                <Label htmlFor="exerciseText">Texto del ejercicio:</Label>
                <TextAreaTemplate
                    value={exerciseText}
                    onChange={(e) => setExerciseText(e.target.value)}
                    placeholder="Ejemplo: El color del cielo es [azul/rojo/verde]"
                    rows={4}
                />
            </div>

            <div className="mb-4 p-3 bg-gray-100 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Vista previa:</h2>
                <div className="flex flex-wrap">{preview}</div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button onClick={handleSave}>Guardar Cambios</Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
                </Button>
            </div>
        </ModalTemplate>
    );
};

export default FormEditSeleccionPalabras;

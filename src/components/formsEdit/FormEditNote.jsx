'use client';

import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateNotaColores } from '@/services/exercises/exercises.service';

export const FormEditNote = () => {
    const { select, setSelect, setIsOpenModal, loader, setLoader } = useAppContext();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedColor, setSelectedColor] = useState('blue');

    const colors = [
        { name: 'blue', bg: '#E3F2FD', text: '#1565C0' },
        { name: 'yellow', bg: '#FFF9C4', text: '#F9A825' },
        { name: 'green', bg: '#E8F5E9', text: '#2E7D32' },
        { name: 'red', bg: '#FFEBEE', text: '#C62828' },
        { name: 'gray', bg: '#F5F5F5', text: '#424242' }
    ];

    useEffect(() => {
        if (select) {
            setTitle(select.titulo || '');
            setMessage(select.mensaje || '');

            const index = colors.findIndex(
                (c) => c.bg === select.color && c.text === select.colorTexto
            );
            setSelectedColor(index !== -1 ? colors[index].name : 'blue');
        }
    }, [select]);

    const handleCancel = () => {
        setIsOpenModal(false);
        setSelect(null);
    };

    const handleSave = async () => {
        const selected = colors.find((c) => c.name === selectedColor);
        if (!selected || !select?._id) return;

        const payload = {
            titulo: title,
            mensaje: message,
            color: selected.bg,
            colorTexto: selected.text,
        };

        try {
            setLoader(true);

            await updateNotaColores(select._id, payload);

            alert('Nota editada correctamente');
            setIsOpenModal(false);
            setSelect(null);
        } catch (error) {
            console.error('Error al editar la nota:', error);
            alert('Error al editar la nota');
        } finally {
            setLoader(false);
        }
    };

    if (!select) return null;

    return (
        <ModalTemplate>
            <div className="space-y-4">
                <h3 className="font-bold text-center text-[24px]">Editar Nota</h3>

                <div>
                    <Label>Título:</Label>
                    <InputTemplate
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ingresa un título"
                    />
                </div>

                <div>
                    <Label>Mensaje de texto:</Label>
                    <TextAreaTemplate
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ingresa tu mensaje"
                    />
                </div>

                <div>
                    <Label>Color:</Label>
                    <div className="flex space-x-4">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                                    }`}
                                style={{ backgroundColor: color.bg }}
                            >
                                <Circle size={20} fill={color.text} color={color.text} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <Label>Vista previa:</Label>
                    <div
                        className="p-4 rounded-lg"
                        style={{
                            backgroundColor: colors.find((c) => c.name === selectedColor)?.bg,
                            color: colors.find((c) => c.name === selectedColor)?.text,
                        }}
                    >
                        <h3 className="text-lg font-semibold mb-2">{title || 'Sin título'}</h3>
                        <p className="whitespace-pre-wrap">{message || 'Sin mensaje'}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    );
};
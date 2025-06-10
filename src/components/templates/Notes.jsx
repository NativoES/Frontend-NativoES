'use client';

import React, { useState } from 'react';
import { Circle } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const params = useParams();
  const id = params.id;

  const colors = [
    { name: 'blue', bg: '#E3F2FD', text: '#1565C0' },
    { name: 'yellow', bg: '#FFF9C4', text: '#F9A825' },
    { name: 'green', bg: '#E8F5E9', text: '#2E7D32' },
    { name: 'red', bg: '#FFEBEE', text: '#C62828' },
    { name: 'gray', bg: '#F5F5F5', text: '#424242' }
  ];

  const handleSave = async () => {
    const selected = colors.find((c) => c.name === selectedColor);
    if (!selected) return;

    const nota = {
      titulo: title,
      mensaje: message,
      color: selected.bg,
      colorTexto: selected.text,
      claseId: id,
      template: 'nota',
    };

    try {
      const response = await fetch('http://localhost:5001/api/nota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
      });

      if (!response.ok) {
        throw new Error('Error al crear la nota');
      }

      const result = await response.json();
      console.log('Nota creada:', result);
      handleCancel(); // limpia el formulario
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };


  const handleCancel = () => {
    // Lógica para cancelar y limpiar el formulario
    setTitle('');
    setMessage('');
    setSelectedColor('blue');
  };

  return (
    <ModalTemplate>
      <div className="space-y-4">

        <h3 className='font-bold text-center text-[24px]'>Crear Notas</h3>
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa un título"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
          />
        </div>

        {/* Mensaje de texto */}
        <div>
          <Label htmlFor="message">Mensaje de texto:</Label>
          <TextAreaTemplate
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingresa tu mensaje"
          />
        </div>

        {/* Selección de color */}
        <div>
          <Label htmlFor="color">Color:</Label>
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

        {/* Vista previa */}
        <div>
          <Label>Vista previa:</Label>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors.find((c) => c.name === selectedColor)?.bg,
              color: colors.find((c) => c.name === selectedColor)?.text
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{title || 'Sin título'}</h3>
            <p className="whitespace-pre-wrap">{message || 'Sin mensaje'}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} variant="primary" className="w-full">
            Guardar
          </Button>

        </div>
      </div>
    </ModalTemplate>
  );
};

export default Notes;

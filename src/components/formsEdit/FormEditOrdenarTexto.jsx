'use client';
import React, { useEffect, useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateOrdenarTexto } from '@/services/exercises/exercises.service';

export const FormEditOrdenarTexto = () => {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();
  const [title, setTitle] = useState('');
  const [parts, setParts] = useState(['']);
  const [shuffledParts, setShuffledParts] = useState([]);
  const [orderedParts, setOrderedParts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (select) {
      setTitle(select.titulo || '');
      setParts(select.palabrasOriginales || ['']);
    }
  }, [select]);

  const handlePartChange = (index, value) => {
    const updated = [...parts];
    updated[index] = value;
    setParts(updated);
  };

  const handleAddPart = () => {
    setParts([...parts, '']);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handlePreview = () => {
    const filtered = parts.filter((p) => p.trim() !== '');
    const shuffled = shuffleArray(filtered);
    setShuffledParts(shuffled);
    setOrderedParts(Array(filtered.length).fill(null));
    setFeedback(Array(filtered.length).fill(null));
  };

  const handleSave = async () => {
    const filtered = parts.filter((p) => p.trim() !== '');
    if (!title.trim() || filtered.length < 2) {
      alert('Debe tener un título y al menos dos partes.');
      return;
    }

    try {
      setLoader(true);
      await updateOrdenarTexto(select._id, {
        titulo: title.trim(),
        palabrasOriginales: filtered
      });

      alert('Ejercicio actualizado correctamente');
      setIsOpenModal(null);
      setLoader(false);
    } catch (err) {
      alert('Error al actualizar: ' + err.message);
    }
  };

  const handleDragStart = (e, part) => {
    e.dataTransfer.setData('text/plain', part);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const part = e.dataTransfer.getData('text/plain');
    const newOrdered = [...orderedParts];
    newOrdered[index] = part;
    setOrderedParts(newOrdered);
    const newFeedback = [...feedback];
    newFeedback[index] = part === parts[index] ? 'OK!' : 'X';
    setFeedback(newFeedback);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <ModalTemplate>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar: Ordenar Texto</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título"
          />
        </div>

        <div>
          <Label>Partes del texto:</Label>
          {parts.map((part, index) => (
            <InputTemplate
              key={index}
              value={part}
              onChange={(e) => handlePartChange(index, e.target.value)}
              placeholder={`Parte ${index + 1}`}
              className="mb-2"
            />
          ))}
          <div className="flex justify-end">
            <Button onClick={handleAddPart} variant="success">
              Agregar Parte
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handlePreview} variant="secondary">
            Vista previa
          </Button>
          <Button onClick={handleSave} variant="primary">
            Guardar Cambios
          </Button>
        </div>
      </div>

      {shuffledParts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Arrastra en el orden correcto:</h3>
          <div className="flex flex-col gap-2 mb-4">
            {shuffledParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 bg-gray-100 cursor-move rounded-md"
                draggable
                onDragStart={(e) => handleDragStart(e, part)}
              >
                {part}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {orderedParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 h-12 flex items-center justify-between rounded-md"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                {part || 'Arrastra aquí'}
                {feedback[index] && (
                  <span className={feedback[index] === 'OK!' ? 'text-green-500' : 'text-red-500'}>
                    {feedback[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </ModalTemplate>
  );
};

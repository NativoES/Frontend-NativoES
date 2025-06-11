'use client';
import React, { useEffect, useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import DroppableContainer from '@/components/templates/DroppableContainer';
import DraggableLetter from '@/components/templates/DraggableLetter';
import { shuffleArray } from '@/utils/ArrayUtils';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';

export const FormEditOrdenarPalabra = () => {
  const { select, setIsOpenModal } = useAppContext();
  const [title, setTitle] = useState(select?.titulo || '');
  const [word, setWord] = useState(select?.palabraCorrecta || '');
  const [descripcion, setDescripcion] = useState(select?.descripcion || '');
  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (word) {
      const upper = word.toUpperCase();
      setDroppedLetters(Array(upper.length).fill(''));
      setFeedback(Array(upper.length).fill(null));
      setShuffledLetters(shuffleArray(upper.split('')));
    }
  }, [word]);

  const handleWordChange = (e) => {
    const input = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(input)) {
      setWord(input);
      setDroppedLetters(Array(input.length).fill(''));
      setFeedback(Array(input.length).fill(null));
      setShuffledLetters(shuffleArray(input.split('')));
    }
  };

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    if (letter) {
      const updated = [...droppedLetters];
      updated[index] = letter;
      setDroppedLetters(updated);
      checkAnswer(letter, index);
    }
  };

  const checkAnswer = (letter, index) => {
    const correct = letter === word[index];
    setFeedback((prev) => {
      const next = [...prev];
      next[index] = correct ? 'Correcto' : 'Incorrecto';
      return next;
    });
  };

  const handleUpdate = async () => {
    if (!title || !word) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);

    const data = {
      titulo: title,
      letras: word.split(''),
      palabraCorrecta: word,
      descripcion: descripcion || undefined,
    };

    try {
      const res = await fetch(`http://localhost:5001/api/formar-palabra/${select._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error al actualizar el ejercicio');

      const result = await res.json();
      console.log('Actualizado:', result);
      setIsOpenModal(null);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al actualizar el ejercicio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Editar ejercicio de ordenar palabra
      </h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese título de la actividad"
          />
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción (opcional):</Label>
          <InputTemplate
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese una breve descripción"
          />
        </div>

        <div>
          <Label htmlFor="word">Palabra a formar:</Label>
          <InputTemplate
            id="word"
            value={word}
            onChange={handleWordChange}
            placeholder="Ingrese una palabra (solo letras)"
          />
        </div>

        <div className="flex flex-col space-y-8">
          <div className="flex flex-wrap gap-4">
            {shuffledLetters.map((letter, index) => (
              <DraggableLetter
                key={index}
                letter={letter}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {word && Array.from({ length: word.length }).map((_, index) => (
              <DroppableContainer
                key={index}
                index={index}
                onDrop={handleDrop}
                droppedLetters={droppedLetters}
                feedback={feedback}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleUpdate}
          className="w-full"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </ModalTemplate>
  );
};

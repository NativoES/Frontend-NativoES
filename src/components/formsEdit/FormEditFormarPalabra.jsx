'use client';

import React, { useState, useEffect } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import DroppableContainer from '@/components/templates/DroppableContainer';
import DraggableLetter from '@/components/templates/DraggableLetter';
import { shuffleArray } from '@/utils/ArrayUtils';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateFormarPalabra } from '@/services/exercises/exercises.service';

export const FormEditFormarPalabra = () => {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();
  const [title, setTitle] = useState('');
  const [word, setWord] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);

  useEffect(() => {
    if (select) {
      setTitle(select.titulo || '');
      setWord(select.palabraCorrecta || '');
      setDescripcion(select.descripcion || '');
      setDroppedLetters(Array(select.palabraCorrecta.length).fill(''));
      setFeedback(Array(select.palabraCorrecta.length).fill(null));
      setShuffledLetters(shuffleArray(select.letras || []));
    }
  }, [select]);

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
    const isCorrect = letter === word[index];
    const updatedFeedback = [...feedback];
    updatedFeedback[index] = isCorrect ? 'Correcto' : 'Incorrecto';
    setFeedback(updatedFeedback);
  };

  const handleSave = async () => {
    if (!title || !word) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const payload = {
      titulo: title,
      letras: word.split(''),
      palabraCorrecta: word,
      descripcion: descripcion || undefined,
    };

    try {
      setLoader(true);
      await updateFormarPalabra(select._id, payload);

      setLoader(false);
      setIsOpenModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalTemplate>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Editar ejercicio: Formar Palabra
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
            {word &&
              Array.from({ length: word.length }).map((_, index) => (
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
          onClick={handleSave}
          className="w-full"
          variant="primary"
          disabled={loader}
        >
          {loader ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </ModalTemplate>
  );
};

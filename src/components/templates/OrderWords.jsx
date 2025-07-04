'use client';
import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import DroppableContainer from '@/components/templates/DroppableContainer';
import DraggableLetter from '@/components/templates/DraggableLetter';
import { shuffleArray } from '@/utils/ArrayUtils';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { formarPalabra } from '@/services/exercises/exercises.service';

const DraggableLetters = ({ onSave, closeModal }) => {
  const { loader, setLoader } = useAppContext();
  const [title, setTitle] = useState('');
  const [word, setWord] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const params = useParams();
  const id = params.id;

  const handleWordChange = (e) => {
    const inputWord = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(inputWord)) {
      setWord(inputWord);
      setDroppedLetters(Array(inputWord.length).fill(''));
      setFeedback(Array(inputWord.length).fill(null));
      setShuffledLetters(shuffleArray(inputWord.split('')));
    }
  };

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    if (letter) {
      const updatedLetters = [...droppedLetters];
      updatedLetters[index] = letter;
      setDroppedLetters(updatedLetters);
      checkAnswer(letter, index);
    }
  };

  const checkAnswer = (letter, index) => {
    const correct = letter === word[index];
    const newFeedback = [...feedback];
    newFeedback[index] = correct ? 'Correcto' : 'Incorrecto';
    setFeedback(newFeedback);
  };

  const handleSave = async () => {
    if (!title || !word) {
      alert('Todos los campos son obligatorios.');
      return;
    }
        
    const data = {
      titulo: title,
      letras: word.split(''),
      palabraCorrecta: word,
      claseId: id,
      template: 'formarPalabra',
      descripcion: descripcion || undefined,
    };
    
    try {
      setLoader(true);
      const result = formarPalabra(data);
      if (onSave) onSave(result);
      setLoader(false);
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar el ejercicio.');
    }
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Juego de arrastrar y soltar letras
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
          {loader ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default DraggableLetters;

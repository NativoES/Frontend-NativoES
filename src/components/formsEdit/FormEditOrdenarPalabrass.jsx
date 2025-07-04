'use client';

import React, { useState, useEffect } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { useParams } from 'next/navigation';
import { updateOrdenarPalabra } from '@/services/exercises/exercises.service';

export const FormEditOrdenarPalabrass = () => {
  const { select, setIsOpenModal, loader, setLoader } = useAppContext();
  const params = useParams();
  const id = params.id;

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [palabrasEnOrden, setPalabrasEnOrden] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (select) {
      setTitulo(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setTextoOriginal(select.textoOriginal || '');

      const palabras = select.palabrasEnOrden || [];
      setPalabrasEnOrden(palabras);
      setDroppedTexts(Array(palabras.length).fill(''));
      setFeedback(Array(palabras.length).fill(null));
    }
  }, [select]);

  console.log("ejercicio: ", select);


  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextoOriginal(inputText);
    extractWords(inputText);
  };

  const extractWords = (text) => {
    const regex = /\[(.*?)\]/g;
    const words = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      words.push(match[1]);
    }
    setPalabrasEnOrden(words);
    setDroppedTexts(Array(words.length).fill(''));
    setFeedback(Array(words.length).fill(null));
  };

  const handleDragStart = (e, text) => {
    e.dataTransfer.setData('text/plain', text);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain');
    if (text) {
      const updated = [...droppedTexts];
      updated[index] = text;
      setDroppedTexts(updated);
      checkAnswer(text, index);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const checkAnswer = (text, index) => {
    const isCorrect = text === palabrasEnOrden[index];
    const newFeedback = [...feedback];
    newFeedback[index] = isCorrect ? 'Correcto' : 'Incorrecto';
    setFeedback(newFeedback);
  };

  const DroppableContainer = ({ index }) => (
    <div className="rounded-lg flex flex-col items-center justify-center space-y-4 my-4">
      <div
        className={`border-dashed border-2 border-gray-300 px-4 py-2 w-full flex items-center justify-center rounded-[5px] ${feedback[index] === 'Correcto'
            ? 'bg-green-300'
            : feedback[index] === 'Incorrecto'
              ? 'bg-red-200'
              : ''
          }`}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedTexts[index] ? (
          <span className="text-gray-800 text-sm">{droppedTexts[index]}</span>
        ) : (
          <span className="text-gray-400 text-sm">Poner palabra aquí</span>
        )}
      </div>
    </div>
  );

  const handleSave = async () => {
    const payload = {
      titulo,
      textoOriginal,
      palabrasEnOrden,
      descripcion,
    };

    try {
      setLoader(true);
      await updateOrdenarPalabra(select._id, payload);
      setLoader(false);
      setIsOpenModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalTemplate>
      <h3 className="font-bold text-center text-2xl mb-4">Editar ejercicio: Ordenar Palabra</h3>

      <div className="mb-4">
        <Label htmlFor="titulo">Título:</Label>
        <InputTemplate
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese título del ejercicio"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="descripcion">Descripción (opcional):</Label>
        <InputTemplate
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="textoOriginal">Texto a completar:</Label>
        <label className="block text-sm mb-2 text-gray-500">
          Usa corchetes [ ] para marcar las palabras arrastrables.
        </label>
        <textarea
          id="textoOriginal"
          value={textoOriginal}
          onChange={handleTextChange}
          className="border rounded p-2 w-full h-24"
        />
      </div>

      <div className="mb-4">
        {/* Palabras arrastrables */}
        <div className="flex flex-wrap gap-2 mb-4">
          {palabrasEnOrden.map((word, index) => (
            <span
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              className="cursor-pointer inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded shadow hover:bg-blue-200"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Contenedores para soltar */}
        <div className="flex flex-wrap gap-2">
          {palabrasEnOrden.map((_, index) => (
            <DroppableContainer key={index} index={index} />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} variant="primary" className="w-full mt-4">
        Guardar cambios
      </Button>
    </ModalTemplate>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import LabelTemplate from '@/templates/Labels';
import Button from '@/templates/Button';
import InputTemplate from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import { updateLlenarEspacio } from '@/services/exercises/exercises.service';

const parseExerciseText = (exerciseText, fillInWords, handleInputChange, errors) => {
  const parts = exerciseText.split(/(\[.*?\])/);
  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const word = part.slice(1, -1);
      const isError = errors[index];
      return (
        <div key={index} className="flex items-center space-x-2">
          <InputTemplate
            type="text"
            className={`px-1 py-1 p-0 mx-2 inline-block ${isError ? 'border-red-500' : ''}`}
            placeholder={word}
            value={fillInWords[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {isError ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : fillInWords[index] ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : null}
        </div>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export const FormEditLlenarTexto = () => {
  const { isOpenModal, setIsOpenModal, select, loader, setLoader } = useAppContext();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [fillInWords, setFillInWords] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (select) {
      setTitulo(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setTextoOriginal(select.textoOriginal || '');
    }
  }, [select]);

  const handleInputChange = (index, value) => {
    setFillInWords((prev) => ({ ...prev, [index]: value }));

    const correctWords = extractWordsFromBrackets(textoOriginal);
    const isCorrect = value.trim().toLowerCase() === correctWords[index]?.toLowerCase();
    setErrors((prev) => ({ ...prev, [index]: isCorrect ? null : 'incorrect' }));
  };

  const extractWordsFromBrackets = (text) => {
    const matches = text.match(/\[(.*?)\]/g) || [];
    return matches.map((m) => m.slice(1, -1));
  };

  const handleSave = async () => {
    const palabras = extractWordsFromBrackets(textoOriginal);
    const payload = {
      titulo,
      descripcion,
      textoOriginal,
      palabras,
    };

    try {
      setLoader(true);

      await updateLlenarEspacio(select._id, payload);

      setIsOpenModal(false);
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error(error);
    }finally {
      setLoader(false)
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  if (isOpenModal !== 'editLlenarTexto') return null;

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Editar ejercicio: Rellenar espacios</h2>

      <div className="mb-4">
        <LabelTemplate htmlFor="titulo">Título</LabelTemplate>
        <InputTemplate
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe un título"
        />
      </div>

      <div className="mb-4">
        <LabelTemplate htmlFor="descripcion">Descripción (opcional)</LabelTemplate>
        <TextAreaTemplate
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Agrega una descripción del ejercicio"
          className="h-24"
        />
      </div>

      <div className="mb-4">
        <LabelTemplate htmlFor="texto">Texto del ejercicio</LabelTemplate>
        <p className="text-sm text-gray-600">Usa [ ] para marcar las palabras a completar.</p>
        <TextAreaTemplate
          id="texto"
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="mb-4 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Vista previa:</h3>
        {titulo && <h4 className="font-medium mb-2">{titulo}</h4>}
        <div className="flex flex-wrap gap-2">
          {parseExerciseText(textoOriginal, fillInWords, handleInputChange, errors)}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
};

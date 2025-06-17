'use client';

import React, { useEffect, useState } from 'react';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';
import Label from '@/templates/Labels';
import InputTemplate from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import DraggableCard from '@/templates/DraggableCard';
import DroppableContainer from '@/templates/DroppableContainer';
import { updateCompletarTexto } from '@/services/exercises/exercises.service';

export const FormEditArrastrarTexto = () => {
  const { select, setSelect, setIsOpenModal, loader, setLoader } = useAppContext();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState({});
  const [feedback, setFeedback] = useState({});
  const [displayText, setDisplayText] = useState([]);

  useEffect(() => {
    if (select) {
      setTitulo(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setTextoOriginal(select.textoOriginal || '');
    }
  }, [select]);

  const extractWords = (text) => {
    const regex = /\[(.*?)\]/g;
    const words = [];
    const newDisplayText = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const word = match[1];
      words.push(word);

      if (match.index > lastIndex) {
        newDisplayText.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }

      newDisplayText.push({ type: 'drop', index: words.length - 1 });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      newDisplayText.push({ type: 'text', content: text.slice(lastIndex) });
    }

    setDroppedTexts({});
    setFeedback({});
    setCorrectWords(words);
    setDisplayText(newDisplayText);
  };

  useEffect(() => {
    extractWords(textoOriginal);
  }, [textoOriginal]);

  const handleCancel = () => {
    setIsOpenModal(false);
    setSelect(null);
  };

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = (text, index) => {
    const expected = correctWords[index];
    const isCorrect = text === expected;

    setFeedback((prev) => ({
      ...prev,
      [index]: isCorrect ? 'Correct!' : 'Incorrect!',
    }));
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData('text/plain');
    setDroppedTexts((prev) => ({ ...prev, [index]: draggedWord }));
    checkAnswer(draggedWord, index);
  };

  const handleSave = async () => {
  const updatedFields = {
    titulo,
    descripcion,
    textoOriginal,
    palabrasCorrectas: correctWords,
  };

  try {
    setLoader(true);
    await updateCompletarTexto(select._id, updatedFields);

    alert('Editado correctamente');
    setIsOpenModal(false);
    setSelect(null);
  } catch (error) {
    console.error('Error al guardar los cambios:', error);
    alert('Error al editar');
  } finally {
    setLoader(true);
  }
};


  if (!select) return null;

  return (
    <ModalTemplate>
      <div className="space-y-4">
        <h3 className="text-center text-xl font-bold">Editar ejercicio: Arrastrar al texto</h3>

        <div>
          <Label>Título</Label>
          <InputTemplate value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>

        <div>
          <Label>Descripción</Label>
          <TextAreaTemplate value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        <div>
          <Label>Texto con espacios [entre corchetes]</Label>
          <TextAreaTemplate value={textoOriginal} onChange={(e) => setTextoOriginal(e.target.value)} />
        </div>

        <div>
          <Label>Vista previa</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {correctWords.map((word, index) => (
              <DraggableCard key={index} word={word} onDragStart={(e) => handleDragStart(e, word)} />
            ))}
          </div>

          <div className="border rounded p-4 flex flex-wrap items-center">
            {displayText.map((item, index) =>
              item.type === 'text' ? (
                <span key={index} className="mr-1">{item.content}</span>
              ) : (
                <DroppableContainer
                  key={index}
                  droppedText={droppedTexts[item.index]}
                  feedback={feedback[item.index]}
                  onDrop={(e) => handleDrop(e, item.index)}
                  onDragOver={handleDragOver}
                />
              )
            )}
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

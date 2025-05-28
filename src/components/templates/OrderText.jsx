"use client";
import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';

import ModalTemplate from '@/templates/ModalTemplate';

const DraggableText = () => {
  const [title, setTitle] = useState("");
  const [textToComplete, setTextToComplete] = useState("");
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [feedback, setFeedback] = useState(Array(3).fill(null));

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextToComplete(inputText);
    extractWords(inputText);
  };

  const extractWords = (text) => {
    const regex = /\[(.*?)\]/g;
    const words = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      words.push(match[1]);
    }
    setDroppedTexts(Array(words.length).fill(""));
    setCorrectWords(words);
  };

  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (text) {
      const updatedTexts = [...droppedTexts];
      updatedTexts[index] = text;
      setDroppedTexts(updatedTexts);
      checkAnswer(text, index);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = (text, index) => {
    if (text === correctWords[index]) {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "Correct!";
        return newFeedback;
      });
    } else {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "Incorrect!";
        return newFeedback;
      });
    }
  };

  const DroppableContainer = ({ index }) => (
    <div className="rounded-lg  flex flex-col  items-center justify-center space-y-4 my-4">
      <div
        className={`border-dashed border-2 border-gray-300 px-4 py-2 w-full flex items-center justify-center rounded-[5px] ${feedback[index] === 'Correct!'? 'bg-green-300': feedback[index] === 'Incorrect!' &&'bg-red-200'}`}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedTexts[index] ? (
          <span className={`text-gray-800  text-[14px]`}>{droppedTexts[index]}</span>
        ) : (
          <span className="text-gray-400 text-[14px]">Poner palabra aquí</span>
        )}
      </div>
    </div>
  );

  const handleSave = () => {
    // Implementar la lógica de guardado aquí
    console.log("Title:", title);
    console.log("Text to complete:", textToComplete);
    console.log("Dropped texts:", droppedTexts);
  };

  const handleCancel = () => {
    setTitle("");
    setTextToComplete("");
    setDroppedTexts([]);
    setCorrectWords([]);
    setFeedback(Array(3).fill(null));
  };

  return (
    <ModalTemplate>
      <div className="mb-4">

      <h3 className='font-bold text-center text-[24px]'>Ordenar texto</h3>

        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese título de ejercicio"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="textToComplete">Texto a completar:</Label>
        <label className="block mb-2">
          El texto entre "[ ]" se usará para formar la oración:
        </label>
        <textarea
          value={textToComplete}
          onChange={handleTextChange}
          className="border rounded p-2 w-full h-24"
        />
      </div>

      <div className="mb-4">
        {/* Draggable Texts */}
        <div className="flex flex-wrap items-end  space-x-4  ">
          {correctWords.map((word, index) => (
            <span
              key={index}
              className="cursor-pointer inline-block bg-blue-100 text-blue-600  px-4 py-2   rounded shadow hover:bg-blue-200"
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Droppable Containers */}
        <div className="flex space-x-4">
          {correctWords.map((_, index) => (
            <DroppableContainer key={index} index={index} />
          ))}
        </div>
      </div>

        <Button onClick={handleSave} variant="primary">
          Guardar
        </Button>
    
    </ModalTemplate>
  );
};

export default DraggableText;

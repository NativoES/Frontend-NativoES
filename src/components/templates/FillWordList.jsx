"use client";
import React, { useState } from 'react';
import Label from '@/templates/Labels';
import Button from '@/templates/Button';
import DraggableCard from '@/templates/DraggableCard';
import DroppableContainer from '@/templates/DroppableContainer';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';

const DraggableWords = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [textToComplete, setTextToComplete] = useState("");
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [displayText, setDisplayText] = useState([]);
  const params = useParams();
  const id = params.id;


  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextToComplete(inputText);
    extractWords(inputText);
  };

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

    setDroppedTexts(Array(words.length).fill(""));
    setCorrectWords(words);
    setFeedback(Array(words.length).fill(null));
    setDisplayText(newDisplayText);
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
  console.log("pathname", id)

  const handleSave = async () => {

    const content = {
      titulo: title,
      descripcion: description,
      textoOriginal: textToComplete,
      palabrasCorrectas: correctWords,
      claseId: id
    }

    console.log("content: ", content);

    const res = await fetch(
      window?.location?.href?.includes("localhost")
        ? `http://localhost:5001/api/completar-texto`
        : ``,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ← necesario
        },
        body: JSON.stringify(content),
      }
    );

    const result = await res.json();
    console.log("resultadoo: ", result);

    if (res.ok) {

      const response = await fetch(window?.location?.href?.includes('localhost')
        ? `http://localhost:5001/api/completar-texto/${id}`
        : '', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseId: result.classe.id }),
      });

      console.log('RESPONSE', response)

      alert("Ejercicio guardado correctamente");
    }
    else {
      alert("Error al guardar el ejercicio");
    }
    setTitle("");
    setDescription("");
    setTextToComplete("");
    setDroppedTexts([]);
    setCorrectWords([]);
    setFeedback([]);
    setDisplayText([]);
  };

  return (
    <ModalTemplate className="w-full ">
      <div className="space-y-4">

        <h3 className='font-bold text-center text-[24px]'>Completar texto con lista </h3>
        <div className="mb-4">
          <Label>Title:</Label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <Label>Descripcion:</Label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <Label>
            Texto a Completar:
          </Label>
          <p className="block text-sm">El texto entre "[ ]" se usará para formar la oración.</p>

          <textarea
            value={textToComplete}
            onChange={handleTextChange}
            className="border rounded p-2 w-full h-24"
          />
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {correctWords.map((word, index) => (
              <DraggableCard key={index} word={word} onDragStart={handleDragStart} />
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

        <Button onClick={handleSave} className="w-full" variant="primary">Guardar</Button>
      </div>
    </ModalTemplate>
  );
};

export default DraggableWords;

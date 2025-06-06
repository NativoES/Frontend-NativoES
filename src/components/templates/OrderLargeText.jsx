'use client';
import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
const SingleSelectQuestion = () => {
  const [title, setTitle] = useState("");
  const [parts, setParts] = useState([""]);
  const [shuffledParts, setShuffledParts] = useState([]);
  const [orderedParts, setOrderedParts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const handleAddPart = () => {
    setParts([...parts, ""]);
  };

  const handlePartChange = (index, value) => {
    const updatedParts = [...parts];
    updatedParts[index] = value;
    setParts(updatedParts);
  };

  const handleSave = () => {
    console.log("Parts original:", parts);

    const filtered = parts.filter((part) => part.trim() !== "");
    console.log("Filtered (sin espacios vacíos):", filtered);

    const shuffled = shuffleArray(filtered);
    console.log("Shuffled (orden aleatorio):", shuffled);

    setShuffledParts(shuffled);
    setOrderedParts(Array(filtered.length).fill(null));
    setFeedback(Array(filtered.length).fill(null));

    const ejercicioAGuardar = {
      titulo: "Título de ejemplo",
      textoACompletar: parts.join(" "), // o como construyas el texto
      palabrasCorrectas: filtered,
      textosColocados: Array(filtered.length).fill(""),
      retroalimentacion: Array(filtered.length).fill(null),
      claseId: "id-de-la-clase-aqui", // reemplaza dinámicamente
      creadoEn: new Date().toISOString()
    };

    console.log("Ejercicio a guardar:", ejercicioAGuardar);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleDragStart = (e, part) => {
    e.dataTransfer.setData("text/plain", part);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const part = e.dataTransfer.getData("text/plain");
    const newOrderedParts = [...orderedParts];
    newOrderedParts[index] = part;
    setOrderedParts(newOrderedParts);

    const newFeedback = [...feedback];
    newFeedback[index] = part === parts[index] ? "OK!" : "X";
    setFeedback(newFeedback);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setTitle("");
    setParts([""]);
    setShuffledParts([]);
    setOrderedParts([]);
    setFeedback([]);
  };

  return (
    <ModalTemplate >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Ordenar Texto Largo
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título de la actividad"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"

          />
        </div>

        <div>
          <Label htmlFor="parts">Partes del texto a ordenar:</Label>
          {parts.map((part, index) => (
            <InputTemplate
              key={index}
              id={`part-${index}`}
              value={part}
              onChange={(e) => handlePartChange(index, e.target.value)}
              placeholder={`Parte ${index + 1}`}
              className="mb-2"
            />
          ))}
          <div className='w-full flex justify-end'>
            <Button onClick={handleAddPart} variant="success">
              Agregar Parte
            </Button>
          </div>

        </div>

        <Button onClick={handleSave} className="w-full" variant="primary">
          Guardar
        </Button>


      </div>

      {shuffledParts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Arrastra las partes en el orden correcto:
          </h3>
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
                {part || "Arrastra aquí"}
                {feedback[index] && (
                  <span
                    className={
                      feedback[index] === "OK!" ? "text-green-500" : "text-red-500"
                    }
                  >
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

export default SingleSelectQuestion;

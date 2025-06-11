'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import { ImageUp } from 'lucide-react';
import Label from '@/templates/Labels';
import { useParams } from 'next/navigation';

const DraggableText = () => {
  const [title, setTitle] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [images, setImages] = useState([]);
  const [fileImages, setFileImages] = useState([]);
  const [text, setText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [randomWords, setRandomWords] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState([]);

  const params = useParams();
  const claseId = params.id;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput?.files?.[0];

    if (!previewImage || !text || !file) return;

    setImages((prev) => [...prev, { src: previewImage, text }]);
    setFileImages((prev) => [...prev, file]);

    const updatedImages = [...images, { src: previewImage, text }];
    const words = updatedImages.map((img) => img.text);
    setRandomWords(shuffleArray(words));
    setDroppedTexts(Array(words.length).fill(''));

    setPreviewImage(null);
    setText('');
    fileInput.value = ''; // limpiar input
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData('text/plain');
    if (draggedText) {
      const updatedTexts = [...droppedTexts];
      updatedTexts[index] = draggedText;
      setDroppedTexts(updatedTexts);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('titulo', title);
      formData.append('descripcion', descripcion);
      formData.append('claseId', claseId);
      formData.append('template', 'imagenPalabra');

      images.forEach((img, i) => {
        formData.append('palabras', img.text);
        formData.append('imagenes', fileImages[i]);
      });

      const res = await fetch('http://localhost:5001/api/imagen-palabra', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al guardar el ejercicio');
      console.log('Ejercicio guardado correctamente');
    } catch (err) {
      console.error(err);
    }
  };

  const DroppableArea = ({ imageSrc, text, onDrop, onDragOver }) => (
    <div className="border border-gray-400 rounded-lg flex flex-col items-center justify-center w-[150px]">
      <div
        className="border-dashed border-2 border-gray-300 p-2 w-full flex items-center justify-center"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {text ? (
          <span className="text-gray-800">{text}</span>
        ) : (
          <span className="text-gray-400">Suelta aquí el texto</span>
        )}
      </div>
      <img
        src={imageSrc}
        alt="Imagen"
        className="w-[150px] h-[150px] object-cover rounded-[5px]"
      />
    </div>
  );

  return (
    <ModalTemplate className="w-full">
      <div className="space-y-4">
        <h3 className="font-bold text-center text-[24px]">Relacionar imágenes y palabras</h3>

        <Label>Título:</Label>
        <InputTemplate
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese un título"
        />

        <Label>Descripción:</Label>
        <InputTemplate
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción opcional del ejercicio"
        />

        <Label>Añadir tarjeta:</Label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label
              htmlFor="file-input"
              className="flex justify-center items-center w-[120px] h-[120px] border border-dashed border-gray-300 rounded-md"
            >
              {!previewImage && <ImageUp />}
              {!previewImage && <span className="text-[12px]">Cargar IMG</span>}
              {previewImage && (
                <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-input"
            />
          </div>

          <div className="flex flex-col w-[300px] space-y-4">
            <InputTemplate
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Texto relacionado a la imagen"
            />
            <Button onClick={handleAddImage} className="w-full" variant="primary">
              Agregar
            </Button>
          </div>
        </div>

        <Label>Vista previa:</Label>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-wrap gap-4">
            {randomWords.map((word, index) => (
              <div
                key={index}
                className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
              >
                {word}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            {images.map((image, index) => (
              <DroppableArea
                key={index}
                imageSrc={image.src}
                text={droppedTexts[index]}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full" variant="primary">
          Guardar
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default DraggableText;

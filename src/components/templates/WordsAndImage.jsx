'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import { ImageUp } from 'lucide-react';
import Label from '@/templates/Labels';
const DroppableArea = ({ imageSrc, text, onDrop, onDragOver }) => (
  <div className="border border-gray-400 rounded-lg  flex flex-col items-center justify-center w-[150px]">
    <div
      className="border-dashed border-2 border-gray-300 p-2 w-full  flex items-center justify-center"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {text ? (
        <span className="text-gray-800">{text}</span>
      ) : (
        <span className="text-gray-400">Drop text here</span>
      )}
    </div>
    <img
      src={imageSrc}
      alt="Reference"
      className="w-[150px] h-[150px] object-cover rounded-[5px]"
    />
  </div>
)

const DraggableText = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [randomWords, setRandomWords] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState(Array(3).fill(''));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (previewImage && text) {
      setImages([...images, { src: previewImage, text }]);
      setPreviewImage(null);

      const words = [...images, { src: previewImage, text }].map((image) => image.text);
      setRandomWords(shuffleArray(words));
      setDroppedTexts(Array(words.length).fill(''));


      setText('');
    }
  };

  const handleSave = () => {
    const words = images.map((image) => image.text);
    setRandomWords(shuffleArray(words));
    setDroppedTexts(Array(words.length).fill(''));
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

  const handleReset = () => {
    setTitle('');
    setImages([]);
    setPreviewImage(null);
    setText('');
    setRandomWords([]);
    setDroppedTexts([]);
  };

  return (
    <ModalTemplate className="w-full ">
      <div className="space-y-4">

        <h3 className='font-bold text-center text-[24px]'>Relacionar imagenes y palabras </h3>
        <Label>Titulo:</Label>

        <InputTemplate
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese un título"
        />
        <Label>Añadir tarjeta:</Label>

        <div className=' flex justify-center  flex-end space-x-4'>
          <div className='flex items-center'>
            <label
              htmlFor='file-input' className="relative flex justify-center items-center flex-wrap  w-[120px] h-[120px] mb-6 border border-dashed border-gray-300 rounded-md">
              {!previewImage && <ImageUp></ImageUp>}
              {!previewImage && <span className='text-[12px]'>Cargar IMG</span>}
              {previewImage && <img src={previewImage} alt="Perfil" className="w-full h-full object-cover  mt-2  " />}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-input"
            />
          </div>
          <div className='flex flex-col w-[300px] space-y-4 '>
            <InputTemplate
              label="Texto para emparejar a la imagen:"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ingrese el texto relacionado"
            />
            <Button onClick={handleAddImage} className="w-[300px]" variant="primary">
              Agregar
            </Button>
          </div>
        </div>



        <Label>Vista previa:</Label>

        <div className="flex flex-col  mb-4 mt-6">
          {/* Draggable Texts */}
          <div className="flex flex-wrap space-x-4 mb-4">
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

          {/* Droppable Containers */}
          <div className="flex space-x-8">
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

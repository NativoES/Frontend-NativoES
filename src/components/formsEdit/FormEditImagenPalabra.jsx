'use client';

import React, { useEffect, useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import { ImageUp } from 'lucide-react';
import Label from '@/templates/Labels';
import { useAppContext } from '@/contexts/Context';

const FormEditImagenPalabra = () => {
    const { select, setIsOpenModal } = useAppContext();
    const [title, setTitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [images, setImages] = useState([]);
    const [fileImages, setFileImages] = useState([]);
    const [text, setText] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [randomWords, setRandomWords] = useState([]);
    const [droppedTexts, setDroppedTexts] = useState([]);

    useEffect(() => {
        if (select) {
            setTitle(select.titulo || '');
            setDescripcion(select.descripcion || '');
            const loaded = select.asociaciones.map((a) => ({ src: a.imagenUrl, text: a.palabra }));
            setImages(loaded);
            setDroppedTexts(loaded.map((i) => i.text));
            setRandomWords(shuffleArray(loaded.map((i) => i.text)));
            setFileImages(loaded.map(() => null));
        }
    }, [select]);

    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
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

        const newImage = { src: previewImage, text };
        const updated = [...images, newImage];

        setImages(updated);
        setFileImages((prev) => [...prev, file]);
        setRandomWords(shuffleArray(updated.map((i) => i.text)));
        setDroppedTexts(Array(updated.length).fill(''));

        setPreviewImage(null);
        setText('');
        fileInput.value = '';
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedText = e.dataTransfer.getData('text/plain');
        if (draggedText) {
            const updated = [...droppedTexts];
            updated[index] = draggedText;
            setDroppedTexts(updated);
        }
    };

    const handleSave = async () => {
        try {
            if (!select?._id) return;

            const formData = new FormData();
            formData.append('titulo', title);
            formData.append('descripcion', descripcion);

            images.forEach((img, i) => {
                formData.append(`asociaciones[${i}][palabra]`, img.text);
                if (fileImages[i]) {
                    formData.append(`asociaciones[${i}][imagen]`, fileImages[i]);
                }
            });


            const res = await fetch(`http://localhost:5001/api/imagen-palabra/${select._id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!res.ok) throw new Error('Error al actualizar el ejercicio');

            setIsOpenModal(false);
        } catch (err) {
            console.error(err);
        }
    };


    const DroppableArea = ({ imageSrc, text, onDrop }) => (
        <div className="border border-gray-400 rounded-lg flex flex-col items-center justify-center w-[150px]">
            <div
                className="border-dashed border-2 border-gray-300 p-2 w-full flex items-center justify-center"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {text ? <span>{text}</span> : <span className="text-gray-400">Suelta aquí</span>}
            </div>
            <img src={imageSrc} alt="Imagen" className="w-[150px] h-[150px] object-cover rounded-[5px]" />
        </div>
    );

    return (
        <ModalTemplate className="w-full">
            <div className="space-y-4">
                <h3 className="font-bold text-center text-[24px]">Editar ejercicio: Imágenes y palabras</h3>

                <Label>Título:</Label>
                <InputTemplate value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />

                <Label>Descripción:</Label>
                <InputTemplate value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />

                <Label>Añadir nueva tarjeta:</Label>
                <div className="flex space-x-4">
                    <label htmlFor="file-input" className="flex items-center justify-center w-[120px] h-[120px] border border-dashed border-gray-300 rounded-md">
                        {!previewImage && <ImageUp />}
                        {!previewImage && <span className="text-[12px]">Cargar IMG</span>}
                        {previewImage && <img src={previewImage} alt="preview" className="w-full h-full object-cover" />}
                    </label>
                    <input type="file" accept="image/*" id="file-input" className="hidden" onChange={handleImageUpload} />

                    <div className="flex flex-col w-[300px] space-y-4">
                        <InputTemplate value={text} onChange={(e) => setText(e.target.value)} placeholder="Texto relacionado" />
                        <Button onClick={handleAddImage} className="w-full" variant="primary">Agregar</Button>
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
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handleSave} className="w-full" variant="primary">
                    Guardar cambios
                </Button>
            </div>
        </ModalTemplate>
    );
};

export default FormEditImagenPalabra;

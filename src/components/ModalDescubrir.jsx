import React, { useEffect, useState } from 'react';
import ModalTemplate from '@/templates/ModalTemplate';

import { ArrastrarAlTextoExercise } from '@/components/ejercicios/ArrastrarAlTextoExercise';
import { NotaExercise } from '@/components/ejercicios/NotaExercise';
import { NotaTextoExercise } from '@/components/ejercicios/NotaTextoExercise';
import { OrdenarTextoExercise } from '@/components/ejercicios/OrdenarTextoExercise';
import { LlenarTextoExercise } from '@/components/ejercicios/LlenarTextoExercise';
import { SeleccionarPalabraExercise } from '@/components/ejercicios/SeleccionarPalabraExercise';
import { OrderWordsExercise } from '@/components/ejercicios/OrderWordsExercise';
import { OrdenarPalabraExercise } from '@/components/ejercicios/OrdenarPalabrasExercise';
import { ImagenPalabraExercise } from '@/components/ejercicios/ImagenPalabraExercise';
import { MediaExercise } from '@/components/ejercicios/MediaExercise';
import { EnlaceExternoExercise } from '@/components/ejercicios/EnlaceExternoExercise';
import { RelacionarPalabrasExercise } from '@/components/ejercicios/RelacionarPalabrasExercise';
import { FalsoVerdaderoExercise } from '@/components/ejercicios/FalsoVerdaderoExercise';
import FullScreenModal from '@/templates/FullScreenModal';


async function getAllTemplatesPublics() {
    const res = await fetch('http://localhost:5001/api/ejercicios/public-exercise');
    if (!res.ok) throw new Error('Error al cargar los templates');
    const data = await res.json();
    return data; // ajusta según la estructura que retorne tu backend
}

export const ModalDescubrir = ({ closeModal, onSave }) => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [droppedTextsMap, setDroppedTextsMap] = useState({});
    const [feedbackMap, setFeedbackMap] = useState({});

    useEffect(() => {
        async function fetchExercises() {
            try {
                const data = await getAllTemplatesPublics();
                setExercises(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchExercises();
    }, []);

    const handleDrop = (e, blankIndex, exerciseIndex) => {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        if (!text) return;

        setDroppedTextsMap(prev => {
            const updated = { ...prev };
            const current = [...(updated[exerciseIndex] || [])];
            current[blankIndex] = text;
            updated[exerciseIndex] = current;
            return updated;
        });

        checkAnswer(text, blankIndex, exerciseIndex);
    };

    const checkAnswer = (text, blankIndex, exerciseIndex) => {
        const correct = correctWordsMap[exerciseIndex]?.[blankIndex];

        setFeedbackMap(prev => {
            const updated = { ...prev };
            const current = [...(updated[exerciseIndex] || [])];
            current[blankIndex] = text === correct ? "Correct!" : "Incorrect!";
            updated[exerciseIndex] = current;
            return updated;
        });
    };

    const handleDragStart = (e, text) => {
        e.dataTransfer.setData("text/plain", text);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <FullScreenModal>
            <div className="relative w-full">
                {/* Botón flotante de cierre */}
                <button
                    onClick={closeModal}
                    className="absolute -top-5 right-0 z-20 text-gray-600 hover:text-gray-900 font-bold text-3xl"
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>


                {/* Contenido del modal */}
                <div className="overflow-y-auto px-8 py-8 max-h-[80vh]">
                    {loading && <p>Cargando ejercicios...</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 gap-4 mt-6">
                            {exercises.map((exercise, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-md">
                                    {exercise.imgURL && (
                                        <div>
                                            <img
                                                src={exercise.imgURL}
                                                alt={exercise.titulo}
                                                className="w-full h-80 object-cover rounded-md"
                                            />
                                            {exercise.titulo && (
                                                <h3 className="mt-2 text-xl font-semibold text-gray-800">{exercise.titulo}</h3>
                                            )}
                                            {exercise.descripcion && (
                                                <p className="mt-2 text-sm text-gray-600">{exercise.descripcion}</p>
                                            )}
                                        </div>
                                    )}

                                    {exercise.audio && (
                                        <div className="p-4 border rounded-lg shadow-md">
                                            {exercise.nombre && (
                                                <h3 className="text-xl font-semibold text-gray-800">{exercise.nombre}</h3>
                                            )}
                                            {exercise.description && (
                                                <p className="mt-2 text-sm text-gray-600">{exercise.description}</p>
                                            )}
                                            <audio controls className="w-full mt-2">
                                                <source src={URL.createObjectURL(exercise.audio)} type="audio/mpeg" />
                                                Tu navegador no soporta este elemento.
                                            </audio>
                                        </div>
                                    )}

                                    {exercise.template === 'seleccionPalabra' && (
                                        <SeleccionarPalabraExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'rellenarTexto' && (
                                        <LlenarTextoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'ordenarTexto' && (
                                        <OrdenarTextoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'nota' && (
                                        <NotaExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'formarPalabra' && (
                                        <OrderWordsExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'notaTexto' && (
                                        <NotaTextoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'ordenarPalabras' && (
                                        <OrdenarPalabraExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'imagenPalabra' && (
                                        <ImagenPalabraExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'relacionarPalabra' && (
                                        <RelacionarPalabrasExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'enlaceExterno' && (
                                        <EnlaceExternoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'falsoVerdadero' && (
                                        <FalsoVerdaderoExercise exercise={exercise} />
                                    )}
                                    {['gif', 'audio', 'video', 'imagen'].includes(exercise.template) && (
                                        <MediaExercise exercise={exercise} />
                                    )}
                                    {exercise.template === 'arrastrarAlTexto' && (
                                        <ArrastrarAlTextoExercise
                                            exercise={exercise}
                                            index={index}
                                            droppedTextsMap={droppedTextsMap}
                                            feedbackMap={feedbackMap}
                                            handleDragStart={handleDragStart}
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FullScreenModal>
    );
};
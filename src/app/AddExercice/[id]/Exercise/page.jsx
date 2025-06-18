'use client';

import React, { useState, useEffect } from 'react';
import { useParams, } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import ImageProvider from '@/components/templates/ImageProvider';
import UploadAudio from '@/components/templates/UploadAudio';
import FillInTheBlanks from '@/components/templates/FillInTheBlanks'
import CompleteText from '@/components/templates/CompleteText';
import OrderText from '@/components/templates/OrderText';
import SingleSelectQuestion from '@/components/templates/OrderLargeText';
import WordsAndImage from '@/components/templates/WordsAndImage';
import WordMatchGame from '@/components/templates/OrderColumn';
import DraggableWords from '@/components/templates/FillWordList';
import DraggableLetters from '@/components/templates/OrderWords';
import ExternalLinkCard from '@/components/templates/ExternalLink';
import Notes from '@/components/templates/Notes';
import CardTemplate from '@/components/CardTemplate';
import ModalTemplate from '@/templates/ModalTemplate';

import {
    useAppContext
} from '@/contexts/Context';
import { NotesText } from '@/components/templates/NotesText';
import { ArrastrarAlTextoExercise } from '@/components/ejercicios/ArrastrarAlTextoExercise';
import { NotaExercise } from '@/components/ejercicios/NotaExercise';
import { NotaTextoExercise } from '@/components/ejercicios/NotaTextoExercise';
import { OrdenarTextoExercise } from '@/components/ejercicios/OrdenarTextoExercise';
import { LlenarTextoExercise } from '@/components/ejercicios/LlenarTextoExercise';
import { SeleccionarPalabraExercise } from '@/components/ejercicios/SeleccionarPalabraExercise';
import { OrderWordsExercise } from '@/components/ejercicios/OrderWordsExercise';
import { OrdenarPalabraExercise } from '@/components/ejercicios/OrdenarPalabrasExercise';
import { ImagenPalabraExercise } from '@/components/ejercicios/ImagenPalabraExercise';
import GifUploadModal from '@/components/templates/GifUploadModal';
import VideoUploadModal from '@/components/templates/VideoUploadModal';
import { MediaExercise } from '@/components/ejercicios/MediaExercise';
import EnlaceExterno from '@/components/templates/EnlaceExterno';
import TrueFalseModal from '@/components/templates/TrueFalse';
import { EnlaceExternoExercise } from '@/components/ejercicios/EnlaceExternoExercise';
import { RelacionarPalabrasExercise } from '@/components/ejercicios/RelacionarPalabrasExercise';
import { FalsoVerdaderoExercise } from '@/components/ejercicios/FalsoVerdaderoExercise';
import { templates } from '@/data/templates';
import { getClassById } from '@/services/exercises/clases.service';


export default function ExercisePage() {
    const { setIsOpenModal, isOpenModal } = useAppContext()

    const [exercises, setExercises] = useState([]);
    const params = useParams();
    const id = params.id;

    const [droppedTextsMap, setDroppedTextsMap] = useState({});
    const [feedbackMap, setFeedbackMap] = useState({});

    const [correctWordsMap, setCorrectWordsMap] = useState({});

    console.log("modal uno: ", isOpenModal);


    const handleDragStart = (e, text) => {
        e.dataTransfer.setData("text/plain", text);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

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

    useEffect(() => {
        const modalState = localStorage.getItem('isOpenModal');
        if (modalState === 'true') {
            setIsOpenModal(true);
        }
    }, []);

    const closeModal = () => {
        setIsOpenModal(false);
        setIsOpenModal("");
    };

    const handleExerciseAdd = (newExercise) => {
        setExercises((prevExercises) => [...prevExercises, newExercise]);
        closeModal();
    };

    const fetchData = async (claseId) => {
        try {
            const data = await getClassById(claseId);

            setExercises(data);

            const map = {};
            data.forEach((ex, i) => {
                if (ex.template === 'arrastrarAlTexto') {
                    map[i] = ex.palabrasCorrectas || [];
                }
            });

            setCorrectWordsMap(map);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    useEffect(() => {

        fetchData(id);
    }, [id]);

    console.log("ejercicios: ", exercises);
    console.log("modal: ", isOpenModal);

    return (
        <>
            <div className="flex flex-col h-full">

                <p className="text-3xl font-bold py-2 mb-4">Lista de Ejercicios</p>

                {exercises.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-400" />
                        <p className="mt-4 text-center text-gray-600">
                            No tienes ejercicios en esta sección, ¿deseas agregar ejercicios?
                        </p>
                    </div>
                )}

                {exercises.length > 0 && (
                    <div className="flex-1 overflow-y-auto pr-2 mt-2">
                        <div className="grid grid-cols-1 gap-4">
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

                                    {exercise.template === "seleccionPalabra" && (
                                        <SeleccionarPalabraExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "rellenarTexto" && (
                                        <LlenarTextoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "ordenarTexto" && (
                                        <OrdenarTextoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "nota" && (
                                        <NotaExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "formarPalabra" && (
                                        <OrderWordsExercise exercise={exercise} />
                                    )}

                                    {exercise.template === "notaTexto" && (
                                        <NotaTextoExercise exercise={exercise} />
                                    )}

                                    {exercise.template === "ordenarPalabras" && (
                                        <OrdenarPalabraExercise exercise={exercise} />
                                    )}

                                    {exercise.template === "imagenPalabra" && (
                                        <ImagenPalabraExercise exercise={exercise} />
                                    )}

                                    {/* modificaciones de tres tipos  */}
                                    {exercise.template === "relacionarPalabra" && (
                                        <RelacionarPalabrasExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "enlaceExterno" && (
                                        <EnlaceExternoExercise exercise={exercise} />
                                    )}
                                    {exercise.template === "falsoVerdadero" && (
                                        <FalsoVerdaderoExercise exercise={exercise} />
                                    )}

                                    {['gif', 'audio', 'video', 'imagen'].includes(exercise.template) && (
                                        <MediaExercise exercise={exercise} />
                                    )}


                                    {exercise.template === "arrastrarAlTexto" && (
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
                    </div>
                )}



                <div className="mt-4">
                    <button
                        onClick={() => setIsOpenModal('templates')}
                        className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full justify-center"
                    >
                        Agregar Ejercicio
                    </button>
                </div>
            </div>

            {isOpenModal === 'templates' && (
                <ModalTemplate className="w-full ">
                    <h2 className="text-2xl font-bold mb-4">Escoje una accion</h2>
                    <div className="grid grid-cols-2 gap-4 w-full max-h-full overflow-y-auto">
                        {
                            templates.map((template, index) => (
                                <div className='' key={index}>
                                    <CardTemplate img={'/books.png'} title={template.title} description={template.description} onClick={() => setIsOpenModal(template.openModal)} />
                                </div>
                            ))
                        }
                    </div>
                </ModalTemplate>
            )}
            {isOpenModal === 'imageProvider' && (
                <ImageProvider closeModal={closeModal} onImageUpload={handleExerciseAdd} />
            )}
            {isOpenModal === 'audioProvider' && (
                <UploadAudio isOpen={true} onClose={closeModal} onAudioUpload={handleExerciseAdd} />
            )}
            {isOpenModal === 'fillInTheBlanks' && (
                <FillInTheBlanks closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'completeText' && (
                <CompleteText closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'textAndArticle' && (
                <NotesText onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'orderText' && (
                <OrderText closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'selectQuestion' && (
                <SingleSelectQuestion onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'wordsAndImage' && (
                <WordsAndImage closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'fillWordsList' && (
                <DraggableWords onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'orderWords' && (
                <DraggableLetters closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'externalLink' && (
                <ExternalLinkCard onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'notes' && (
                <Notes onClose={closeModal} onSave={handleExerciseAdd} />
            )}

            {isOpenModal === 'gif' && (
                <GifUploadModal closeModal={closeModal} onGifUpload={handleExerciseAdd} />
            )}

            {isOpenModal === 'video' && (
                <VideoUploadModal closeModal={closeModal} onVideoUpload={handleExerciseAdd} />
            )}

            {isOpenModal === 'relacionarPalabra' && (
                <WordMatchGame closeModal={closeModal} onSave={handleExerciseAdd} />
            )}

            {isOpenModal === 'enlaceExterno' && (
                <EnlaceExterno closeModal={closeModal} onSave={handleExerciseAdd} />
            )}
            {isOpenModal === 'trueFalse' && (
                <TrueFalseModal closeModal={closeModal} onSave={handleExerciseAdd} />
            )}

        </>
    );
}

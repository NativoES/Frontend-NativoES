'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import ImageProvider from '@/components/templates/ImageProvider';
import UploadAudio from '@/components/templates/UploadAudio';
import FillInTheBlanks from '@/components/templates/FillInTheBlanks'
import CompleteText from '@/components/templates/CompleteText';
import OrderText from '@/components/templates/OrderText';
import SingleSelectQuestion from '@/components/templates/OrderLargeText';
import WordsAndImage from '@/components/templates/WordsAndImage';
import { WordMatchGame } from '@/components/templates/OrderColumn';
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
import Label from '@/templates/Labels';
import DraggableCard from '@/templates/DraggableCard';
import DroppableContainer from '@/templates/DroppableContainer';


const templates = [
  {
    title: 'Cargar imagen',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'imageProvider',
  },
  {
    title: 'Cargar GIF',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Cargar video',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Completar espacios en blanco con palabras de lista',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'fillWordsList',
  },
  {
    title: 'De seleion',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'selectQuestion',
  },
  {
    title: 'Articulo, ensayo o texto',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'textAndArticle',
  },
  {
    title: 'Grabacion de audio',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'audioProvider',
  },
  {
    title: 'Completa espacios en blanco',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'fillInTheBlanks',
  },
  {
    title: 'Une palabras con imagenes',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'wordsAndImage',
  },
  {
    title: 'Organiza palabras',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'completeText',
  },
  {
    title: 'Selecciona la opcion correcta',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Falso o verdadero',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Relacionar palabras',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Formar palabras con letras',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'orderWords',
  },
  {
    title: 'Clasificar palabras',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'orderColumn',
  },
  {
    title: 'Ordenar texto',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'orderText',
  },
  {
    title: 'Enlace externo',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Nota',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'notes',
  },
  {
    title: 'Grabacion de audio',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
  {
    title: 'Relacionar palabras y definiciones',
    description: 'Sube una imagen para el ejercicio',
    openModal: 'cargarImagen',
  },
]


export default function AddExercise() {
  const router = useRouter();
  const { setSelect, setIsOpenModal, isOpenModal } = useAppContext()

  const [exercises, setExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const modalRef = useRef(null);

  const [droppedTextsMap, setDroppedTextsMap] = useState({});
  const [feedbackMap, setFeedbackMap] = useState({});

  const [correctWordsMap, setCorrectWordsMap] = useState({});

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
      current[blankIndex] = text; // asignamos directamente
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


  console.log("dropedText: ", droppedTextsMap);
  console.log("feedback: ", feedbackMap);



  useEffect(() => {
    const modalState = localStorage.getItem('isOpenModal');
    if (modalState === 'true') {
      setisOpenModal(true);
    }
  }, []);

  const openModal = () => {
    setisOpenModal(true);
    localStorage.setItem('isOpenModal', 'true');
  };

  const closeModal = () => {
    setisOpenModal(false);
    setisOpenModal('');
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleExerciseAdd = (newExercise) => {
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    closeModal();
  };


  const handleInputChange = (index, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };


  const openExternalLinkCard = () => {
    console.log('Abriendo enlace externo');
    setisOpenModal('externalLink');
    openModal();
  };
  // const openImageProvider = () => setisOpenModal('imageProvider');
  // const openAudioProvider = () => setisOpenModal('audioProvider');
  // const openFillInTheBlanks = () => setisOpenModal('fillInTheBlanks');
  // const openDropdownParagraph = () => setisOpenModal('completeText');
  // const openWordMatchGame = () => setisOpenModal('orderColumn');
  // const openDraggableText = () => setisOpenModal('orderText');
  // const openSingleSelectQuestion = () => setisOpenModal('selectQuestion');
  // const openDraggableimage = () => setisOpenModal('wordsAndImage');
  // const openDraggableWords = () => setisOpenModal('fillWordsList');
  // const openDraggableLetters = () => setisOpenModal('orderWords');

  // const openNotes = () => setisOpenModal('notes');


  function getData() {

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch('http://localhost:5001/api/completar-texto'),
          fetch('http://localhost:5001/api/nota-texto'),
          fetch('http://localhost:5001/api/nota'),
        ]);

        const [data1, data2, data3] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
        ]);

        const combined = [...data1, ...data2, ...data3];
        setExercises(combined);

        // ← Generamos el mapa de palabras correctas por ejercicio
        const map = {};
        combined.forEach((ex, i) => {
          if (ex.template === 'arrastrarAlTexto') {
            map[i] = ex.palabrasCorrectas || [];
          }
        });
        setCorrectWordsMap(map);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchData();
  }, []);



  console.log("ejercicios: ", exercises);
  console.log("modal: ", isOpenModal);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">

        <div>
          <h1 className="text-3xl font-bold py-2 mb-6">Lista de Ejercicios</h1>

          {exercises.length === 0 && (
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-center text-gray-600">
                No tienes ejercicios en esta seccion, desea agregar ejercicios.
              </p>
            </div>
          )}

          {exercises.length > 0 && (
            <div className="grid grid-cols-1  gap-4 mt-4">
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

                  {exercise.titulo && (
                    <h3 className="mt-2 text-xl font-semibold text-gray-800">{exercise.titulo}</h3>
                  )}
                  {exercise.descripcion && (
                    <p className="mt-2 text-sm text-gray-600">{exercise.descripcion}</p>
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
                        tu buscador no soporta este elemento.
                      </audio>
                    </div>
                  )}

                  {exercise.mensaje && (
                    <div>
                      <div
                        className="p-4 rounded-lg"
                        style={{
                          backgroundColor: exercise.colorTexto,
                          color: exercise.color
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2">{exercise.titulo || 'Sin título'}</h3>
                        <p className="whitespace-pre-wrap">{exercise.mensaje || 'Sin mensaje'}</p>
                      </div>
                    </div>
                  )}

                  {exercise.texto && (
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: exercise.texto }}
                    />
                  )}

                  {exercise.template === "arrastrarAlTexto" && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exercise?.palabrasCorrectas?.map((word, wordIndex) => (
                          <DraggableCard key={wordIndex} word={word} onDragStart={handleDragStart} />
                        ))}
                      </div>

                      <div className="border rounded p-4 flex flex-wrap items-center">
                        {exercise.textoOriginal &&
                          exercise.textoOriginal.split(/(\[.*?\])/).map((part, idx) => {
                            if (part.startsWith('[') && part.endsWith(']')) {
                              return (
                                <DroppableContainer
                                  key={idx}
                                  droppedText={droppedTextsMap[index]?.[idx]}
                                  feedback={feedbackMap[index]?.[idx]}
                                  onDrop={(e) => handleDrop(e, idx, index)}
                                  onDragOver={handleDragOver}
                                />
                              );
                            }
                            return (
                              <span key={idx} className="mr-1">
                                {part}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {exercise.nombre && (
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{exercise.nombre}</h3>
                  )}

                  {/* {exercise.textoOriginal &&
                    exercise.textoOriginal.split(/(\[.*?\])/).map((part, idx) => {
                      if (part.startsWith('[') && part.endsWith(']')) {
                        const value = answers[index]?.[idx] || '';

                        const handleChange = (e) => {
                          const newValue = e.target.value;
                          setAnswers((prev) => ({
                            ...prev,
                            [index]: {
                              ...(prev[index] || {}),
                              [idx]: newValue,
                            },
                          }));
                        };

                        return (
                          <input
                            key={idx}
                            type="text"
                            className="border-b border-gray-300 focus:border-[#FEAB5F] outline-none px-1 w-20 inline-block"
                            placeholder="Completar"
                            value={value}
                            onChange={handleChange}
                          />
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })} */}

                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => { setIsOpenModal('templates'); }}
            className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
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
        <FillInTheBlanks isOpen={true} onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'completeText' && (
        <CompleteText onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'textAndArticle' && (
        <NotesText onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'orderText' && (
        <OrderText onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'selectQuestion' && (
        <SingleSelectQuestion onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'wordsAndImage' && (
        <WordsAndImage onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'fillWordsList' && (
        <DraggableWords onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'orderWords' && (
        <DraggableLetters onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'externalLink' && (
        <ExternalLinkCard onClose={closeModal} onSave={handleExerciseAdd} />
      )}
      {isOpenModal === 'notes' && (
        <Notes onClose={closeModal} onSave={handleExerciseAdd} />
      )}
    </div>
  );
}













{/* <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openImageProvider}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Cargar Imagen
              </h3>
            </div>

            <CardTemplate img={''} title="Cargar Imagen" description={''} onCLick={openImageProvider} />

            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openAudioProvider}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Cargar Audio
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openFillInTheBlanks}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Rellenar espacion en blanco
                <br />
              </h3>
            </div>
            <CardTemplate img={''} title="Rellenar espacion en blanco" description={''} onClick={openFillInTheBlanks} />

            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openDropdownParagraph}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Seleccionar Para Completar
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openWordMatchGame}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Emparejar Columnas
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openDraggableText}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Organizar palabras
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openSingleSelectQuestion}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Ordenar Oraciones
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openDraggableimage}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Emparejar texto con Imagen
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openDraggableWords}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Rellenar con lista de palabras
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openDraggableLetters}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Organizar Palabras desde Letras
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openExternalLinkCard}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Crear Tarjeta de Enlace Externo
              </h3>
            </div>
            <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openNotes}
            >
              <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Crear Nota
              </h3>
            </div> */}
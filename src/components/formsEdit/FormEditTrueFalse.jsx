'use client';

import React, { useEffect, useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Label from '@/templates/Labels';
import Button from '@/templates/Button';
import ModalTemplate from '@/templates/ModalTemplate';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

export const FormEditTrueFalse = () => {
  const { select, setIsOpenModal } = useAppContext();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [modoPreview, setModoPreview] = useState(false);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);

  useEffect(() => {
    if (select) {
      setTitulo(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setPreguntas(select.preguntas || []);
    }
  }, [select]);

  const actualizarPregunta = (index, campo, valor) => {
    const nuevas = [...preguntas];
    nuevas[index][campo] = valor;
    setPreguntas(nuevas);
  };

  const eliminarPregunta = (index) => {
    setPreguntas(preguntas.filter((_, i) => i !== index));
  };

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { texto: '', respuestaCorrecta: true }]);
  };

  const handleUpdate = async () => {
    if (!titulo.trim() || preguntas.length < 1) {
      alert('Debe agregar un título y al menos una pregunta');
      return;
    }

    const payload = {
      titulo,
      descripcion,
      preguntas,
    };

    try {
      const res = await fetch(`http://localhost:5001/api/falso-verdadero/${select._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error al actualizar el ejercicio');
      alert('Ejercicio actualizado correctamente');
      setIsOpenModal(false);
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al actualizar');
    }
  };

  const iniciarPreview = () => {
    setRespuestasUsuario(Array(preguntas.length).fill(null));
    setModoPreview(true);
  };

  const responder = (index, valor) => {
    const nuevas = [...respuestasUsuario];
    nuevas[index] = valor;
    setRespuestasUsuario(nuevas);
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar: Falso o Verdadero</h2>

      {!modoPreview ? (
        <>
          <div className="mb-4">
            <Label>Título</Label>
            <InputTemplate
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del ejercicio"
            />
          </div>

          <div className="mb-4">
            <Label>Descripción</Label>
            <InputTemplate
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción (opcional)"
            />
          </div>

          {preguntas.map((pregunta, index) => (
            <div key={index} className="mb-4 border p-3 rounded-lg bg-gray-50">
              <Label>Pregunta {index + 1}</Label>
              <InputTemplate
                value={pregunta.texto}
                onChange={(e) => actualizarPregunta(index, 'texto', e.target.value)}
                placeholder="Escriba la afirmación"
              />
              <div className="mt-2 flex items-center gap-4">
                <label>
                  <input
                    type="radio"
                    checked={pregunta.respuestaCorrecta === true}
                    onChange={() => actualizarPregunta(index, 'respuestaCorrecta', true)}
                  />
                  <span className="ml-1">Verdadero</span>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={pregunta.respuestaCorrecta === false}
                    onChange={() => actualizarPregunta(index, 'respuestaCorrecta', false)}
                  />
                  <span className="ml-1">Falso</span>
                </label>
                <button
                  onClick={() => eliminarPregunta(index)}
                  className="text-red-500 ml-auto"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <Button onClick={agregarPregunta} icon={<Plus size={18} />} variant="primary">
            Añadir pregunta
          </Button>

          <div className="flex justify-between mt-6 gap-3">
            <Button onClick={iniciarPreview} variant="secondary">
              Vista previa
            </Button>
            <Button onClick={handleUpdate} variant="primary" icon={<Save size={18} />}>
              Actualizar
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg text-gray-700">{titulo}</h3>
          <p className="text-gray-600">{descripcion}</p>

          {preguntas.map((pregunta, index) => {
            const respuestaUsuario = respuestasUsuario[index];
            const correcta = pregunta.respuestaCorrecta;
            let color = '';

            if (respuestaUsuario !== null) {
              color =
                respuestaUsuario === correcta
                  ? 'bg-green-100 border-green-400'
                  : 'bg-red-100 border-red-400';
            }

            return (
              <div
                key={index}
                className={`p-4 border rounded ${color} transition-all`}
              >
                <p className="font-medium text-gray-800 mb-2">{pregunta.texto}</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => responder(index, true)}
                    variant={respuestaUsuario === true ? 'primary' : 'ghost'}
                  >
                    Verdadero
                  </Button>
                  <Button
                    onClick={() => responder(index, false)}
                    variant={respuestaUsuario === false ? 'primary' : 'ghost'}
                  >
                    Falso
                  </Button>
                  <Button
                    onClick={() => responder(index, null)}
                    variant={respuestaUsuario === null ? 'primary' : 'ghost'}
                  >
                    No sé
                  </Button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between mt-6">
            <Button onClick={() => setModoPreview(false)} variant="secondary">
              Volver a editar
            </Button>
          </div>
        </div>
      )}
    </ModalTemplate>
  );
}

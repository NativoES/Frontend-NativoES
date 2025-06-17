'use client';

import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/Context';
import { relacionarPalabra } from '@/services/exercises/exercises.service';

export default function WordMatchGame({ onSave, closeModal }) {
  const { loader, setLoader } = useAppContext();
  const [title, setTitle] = useState('');
  const [pairs, setPairs] = useState([{ spanish: '', english: '' }]);
  const [descripcion, setDescripcion] = useState('');
  const params = useParams();
  const claseId = params.id;

  const addPair = () => {
    setPairs([...pairs, { spanish: '', english: '' }]);
  };

  const updatePair = (index, field, value) => {
    const newPairs = pairs.map((pair, i) =>
      i === index ? { ...pair, [field]: value } : pair
    );
    setPairs(newPairs);
  };

  const removePair = (index) => {
    setPairs(pairs.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (title.trim() === '') {
      alert('Por favor agregue un Título');
      return;
    }

    const validPairs = pairs
      .filter(pair => pair.spanish.trim() && pair.english.trim())
      .map(pair => ({
        palabra: pair.spanish.trim(),
        significado: pair.english.trim()
      }));

    if (validPairs.length < 2) {
      alert('Agregue al menos 2 pares para completar el ejercicio');
      return;
    }

    const payload = {
      titulo: title,
      descripcion,
      parejas: validPairs,
      claseId,
      template: "relacionarPalabra"
    };

    try {
      setLoader(true);
      const result = await relacionarPalabra(payload);
      if (onSave) onSave(result);
      closeModal();
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al guardar');
    } finally {
      setLoader(false);
    }
  };


  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Relacionar palabras</h2>

      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese título de ejercicio"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="descripcion">Descripción (opcional):</Label>
        <InputTemplate
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción (opcional)"
        />
      </div>

      <Label>Añadir palabras:</Label>
      <div className="space-y-4 mb-6">
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="flex-1">
              <InputTemplate
                value={pair.spanish}
                onChange={(e) => updatePair(index, 'spanish', e.target.value)}
                placeholder="Palabra en Español"
              />
            </div>
            <div className="flex-1">
              <InputTemplate
                value={pair.english}
                onChange={(e) => updatePair(index, 'english', e.target.value)}
                placeholder="Palabra en Inglés"
              />
            </div>
            {pairs.length > 1 && (
              <button
                onClick={() => removePair(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <Button onClick={addPair} variant="primary" icon={<Plus size={20} />}>
        Agregar pareja de palabras
      </Button>

      <br /><br />

      <Button onClick={handleSave} className="w-full" variant="primary" icon={<Save size={20} />}>
        Guardar
      </Button>
    </ModalTemplate>
  );
}

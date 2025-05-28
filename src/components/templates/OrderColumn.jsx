'use client';

import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate'

export function WordMatchGame({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [pairs, setPairs] = useState([{ spanish: '', english: '' }]);

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

  const handleSave = () => {
    if (title.trim() === '') {
      alert('Por favor Agregue un Titulo');
      return;
    }

    const validPairs = pairs.filter(pair => pair.spanish.trim() && pair.english.trim());
    if (validPairs.length < 2) {
      alert('Agregue almenos 2 para completar el ejercicio');
      return;
    }

    onSave(title, validPairs);
  };

  return (
    <ModalTemplate className="w-full ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Relacionar palabras</h2>
      
      <div className="mb-6">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese título de ejercicio"
        />
      </div>
      <Label htmlFor="title">Añadir palabras:</Label>

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
      <br />

        <Button onClick={handleSave} className="w-full" variant="primary" icon={<Save size={20} />}>
          Guardar
        </Button>
   
    </ModalTemplate>
  );
}

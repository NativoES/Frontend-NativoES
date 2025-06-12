'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import ModalTemplate from '@/templates/ModalTemplate';
import { useAppContext } from '@/contexts/Context';

export const FormEditRelacionarPalabra = () => {
  const { select, setIsOpenModal } = useAppContext();
  const [title, setTitle] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [pairs, setPairs] = useState([{ spanish: '', english: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (select) {
      setTitle(select.titulo || '');
      setDescripcion(select.descripcion || '');
      setPairs(
        Array.isArray(select.parejas)
          ? select.parejas.map(p => ({
              spanish: p.palabra || '',
              english: p.significado || ''
            }))
          : [{ spanish: '', english: '' }]
      );
    }
  }, [select]);

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

  const handleUpdate = async () => {
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
      parejas: validPairs
    };

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5001/api/relacionar-palabra/${select._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Error al actualizar');

      alert('Actualizado correctamente');
      setIsOpenModal(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalTemplate className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar ejercicio: Relacionar Palabras</h2>

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

      <Button
        onClick={handleUpdate}
        className="w-full"
        variant="primary"
        icon={<Save size={20} />}
        disabled={loading}
      >
        {loading ? 'Actualizando...' : 'Actualizar'}
      </Button>
    </ModalTemplate>
  );
}

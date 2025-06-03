'use client'

import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import TextEditor from '@/components/textEditor/TextEditor';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.core.css';
import 'react-quill-new/dist/quill.snow.css'
import 'react-quill-new/dist/quill.bubble.css'
import 'react-quill-new/dist/quill.core.css'
import Textarea from '@/components/ui/Textarea';

const FeaturesEditor = () => {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/form-study?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        const items = data.map((item) => ({
          _id: item._id,
          titulo: item[locale]?.titulo || '',
          descripcion: item[locale]?.descripcion || '',
          typeIcon: item[locale]?.typeIcon || '',
        }));
        setFeatures(items);
      })
      .catch(err => console.error('Error cargando features:', err));
  }, [language]);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, { titulo: '', descripcion: '', typeIcon: '' }]);
  };

  const removeFeature = async (index, id) => {
    console.log("id: ", id);
    if (!id) {
      const updated = [...features];
      updated.splice(index, 1);
      setFeatures(updated);
      return;
    }
    

    try {
      const res = await fetch(`http://localhost:5000/api/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar en el servidor');

      const updated = [...features];
      updated.splice(index, 1);
      setFeatures(updated);
    } catch (err) {
      console.error('Error al eliminar característica:', err);
      alert('No se pudo eliminar la característica');
    }
  };


  const moveFeature = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === features.length - 1)) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...features];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFeatures(updated);
  };

  const handleSave = async () => {
    for (const feature of features) {
      const payload = {
        locale,
        content: {
          titulo: feature.titulo,
          descripcion: feature.descripcion,
          typeIcon: feature.typeIcon,
        },
      };

      try {
        if (feature._id) {
          await fetch(`http://localhost:5000/api/form-study/${feature._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } else {
          await fetch('http://localhost:5000/api/form-study', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }
      } catch (error) {
        console.error('Error al guardar característica:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Características</h2>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        leftIcon={<Plus size={16} />}
        onClick={addFeature}
      >
        Añadir característica
      </Button>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <h4 className="text-md font-medium">Característica {index + 1}</h4>
              <div className="flex items-center space-x-2">
                <button onClick={() => moveFeature(index, 'up')} disabled={index === 0} className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30">
                  <Move size={16} className="rotate-90" />
                </button>
                <button onClick={() => moveFeature(index, 'down')} disabled={index === features.length - 1} className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30">
                  <Move size={16} className="-rotate-90" />
                </button>
                <button onClick={() => removeFeature(index, feature?._id)} className="p-1 text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Título"
                value={feature.titulo}
                onChange={(e) => handleFeatureChange(index, 'titulo', e.target.value)}
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <TextEditor
                  value={feature.descripcion}
                  setValue={(value) => handleFeatureChange(index, 'descripcion', value)}
                  edit
                />
              </div>

              {/* <Textarea
                label="Descripción"
                value={feature.descripcion}
                onChange={(e) => handleFeatureChange(index, 'descripcion', e.target.value)}
                rows={3}
                fullWidth
              /> */}

              <Input
                label="Icono"
                value={feature.typeIcon}
                onChange={(e) => handleFeatureChange(index, 'typeIcon', e.target.value)}
                placeholder="monitor, puzzle, video, etc."
                fullWidth
              />
            </CardContent>
          </Card>
        ))}

        {features.length === 0 && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No hay características. Haga clic en "Añadir característica" para comenzar.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default FeaturesEditor;

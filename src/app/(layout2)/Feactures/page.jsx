'use client'

import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import TextEditor from '@/components/TextEditor/TextEditor';
import 'react-quill-new/dist/quill.snow.css'
import 'react-quill-new/dist/quill.bubble.css'
import 'react-quill-new/dist/quill.core.css'
import { createFormStudy, deleteFormStudy, getFormStudy, updateFormStudy } from '@/services/landing/landing.service';

const FeaturesEditor = () => {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [features, setFeatures] = useState([]);

  const idioma = language.toLowerCase();

  const getFormStudies = async (locale) => {
    try {
      const data = await getFormStudy(locale);

      const items = data.map((item) => ({
          _id: item._id,
          titulo: item[locale]?.titulo || '',
          descripcion: item[locale]?.descripcion || '',
          visible: item[locale]?.visible || false,
          media: item[locale]?.media || { url: '', type: 'image' },
        }));

        setFeatures(items);
    } catch (error) {
      alert("Error al registrar.")
    }
  }
  useEffect(() => {
    getFormStudies(idioma)
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

      const res = await deleteFormStudy(id);
      console.log("respsuesta eliminar. ", res);
      
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
      const formData = new FormData();

      formData.append('locale', locale);

      const content = {
        titulo: feature.titulo,
        descripcion: feature.descripcion,
        visible: feature.visible ?? false,
      };

      // Si hay media y es tipo File (imagen nueva seleccionada)
      if (feature.media instanceof File) {
        formData.append('file', feature.media); // clave debe coincidir con Multer
      } else if (feature.media?.url && feature.media?.type) {
        // Si ya hay media previa, la incluimos como parte del content
        content.media = feature.media;
      }

      formData.append('content', JSON.stringify(content));

      try {
        if (feature._id) {
          await updateFormStudy(feature._id, formData);
         
        } else {
          await createFormStudy(formData);
          
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

              <div>
                <label className="text-sm font-medium mb-1 block">¿Visible?</label>
                <input
                  type="checkbox"
                  checked={feature.visible}
                  onChange={(e) => handleFeatureChange(index, 'visible', e.target.checked)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Tipo de media</label>
                <select
                  value={feature.media?.type || 'image'}
                  onChange={(e) =>
                    handleFeatureChange(index, 'media', {
                      ...feature.media,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="image">Imagen</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {feature.media?.type === 'image' ? (
                <Input
                  label="Subir imagen"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file); // solo preview, luego debes subirla
                      handleFeatureChange(index, 'media', { type: 'image', url });
                      // Aquí luego debes implementar subida real a S3 y reemplazar `url`
                    }
                  }}
                />
              ) : (
                <Input
                  label="URL del video"
                  value={feature.media?.url || ''}
                  onChange={(e) =>
                    handleFeatureChange(index, 'media', {
                      ...feature.media,
                      url: e.target.value,
                    })
                  }
                />
              )}

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

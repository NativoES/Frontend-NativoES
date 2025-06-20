'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import TextEditor from '@/components/TextEditor/TextEditor';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import 'react-quill-new/dist/quill.core.css';
import { createCharacteristic, deleteCharacteristic, getCharacteristics, updateCharacteristic } from '@/services/landing/landing.service';

const FeaturesEditor = () => {
  const { language, showAlert } = useAppContext();
  const locale = language.toLowerCase();
  const [features, setFeatures] = useState([]);

  const getFormStudies = async (locale) => {
    try {
      const data = await getCharacteristics(locale);

      const items = data.map((item) => ({
        _id: item._id,
        titulo: item[locale]?.titulo || '',
        descripcion: item[locale]?.descripcion || '',
        visible: item[locale]?.visible || false,
        media: item[locale]?.media || { url: '', type: 'image' },
      }));

      setFeatures(items);
    } catch (error) {
      alert("Error al cargar características.");
    }
  };

  useEffect(() => {
    getFormStudies(locale);
  }, [language]);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, {
      titulo: '',
      descripcion: '',
      visible: false,
      media: { url: '', type: 'image' }
    }]);
  };

  const removeFeature = async (index, id) => {
    if (!id) {
      const updated = [...features];
      updated.splice(index, 1);
      setFeatures(updated);
      return;
    }

    try {
      await deleteCharacteristic(id);
      const updated = [...features];
      updated.splice(index, 1);
      setFeatures(updated);
      showAlert('Eliminado correctamente', 'success');

    } catch (err) {
      console.error('Error al eliminar característica:', err);
      showAlert('Error al eliminar', 'error');
    }
  };

  const moveFeature = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= features.length) return;
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

      if (feature.media?.file instanceof File) {
        formData.append('file', feature.media.file);
      }

      if (!(feature.media?.file instanceof File) && feature.media?.url && feature.media?.type) {
        content.media = {
          url: feature.media.url,
          type: feature.media.type,
        };
      }

      formData.append('content', JSON.stringify(content));

      try {
        if (feature._id) {
          await updateCharacteristic(feature._id, formData);
        } else {
          await createCharacteristic(formData);
        }
        showAlert('Guardado correctamente', 'success');
      } catch (error) {
        console.error('Error al guardar característica:', error);
        showAlert('Error al guardar', 'error');
      }
    }

    await getFormStudies(locale);
  };

  const handleFileSelect = (e, index) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFeatureChange(index, 'media', {
        type: 'image',
        url: URL.createObjectURL(file),
        file,
      });
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
                <>
                  <Input
                    label="Subir imagen"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, index)}
                  />

                  {feature.media?.file ? (
                    <img
                      src={URL.createObjectURL(feature.media.file)}
                      alt="Vista previa (local)"
                      className="h-32 object-contain mt-2"
                    />
                  ) : feature.media?.url ? (
                    <img
                      src={feature.media.url}
                      alt="Vista previa (remota)"
                      className="h-32 object-contain mt-2"
                    />
                  ) : null}

                </>
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
            <p className="text-gray-500 dark:text-gray-400">
              No hay características. Haga clic en "Añadir característica" para comenzar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesEditor;

'use client';

import { useEffect, useState } from "react";
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import TextEditor from '@/components/TextEditor/TextEditor';
import 'react-quill-new/dist/quill.snow.css';
import { createFormStudy, deleteFormStudy, getFormStudy, updateFormStudy } from "@/services/landing/landing.service";

export default function FormStudyPage() {
    const { language, showAlert } = useAppContext();
    const locale = language.toLowerCase();
    const [features, setFeatures] = useState([]);

    // Carga las características del backend según el idioma
    const getFormStudies = async (locale) => {
        try {
            const data = await getFormStudy(locale);
            const items = data.map((item) => ({
                _id: item._id,
                titulo: item[locale]?.titulo || '',
                descripcion: item[locale]?.descripcion || '',
                imageUrl: item[locale]?.imageUrl || '',
                imageFile: null, // para almacenar la imagen local recién seleccionada
            }));
            setFeatures(items);
        } catch (error) {
            alert("Error al cargar características.");
        }
    };

    useEffect(() => {
        getFormStudies(locale);
    }, [language]);

    // Cambia cualquier campo de la característica en el índice dado
    const handleFeatureChange = (index, field, value) => {
        const updated = [...features];
        updated[index][field] = value;
        setFeatures(updated);
    };

    // Cuando se selecciona un archivo, guardamos el archivo y creamos URL para preview
    const handleFileSelect = (e, index) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const updated = [...features];
            updated[index].imageFile = file; // archivo local
            updated[index].imageUrl = url;   // preview
            setFeatures(updated);
        }
    };

    const addFeature = () => {
        setFeatures(prev => [...prev, {
            titulo: '',
            descripcion: '',
            imageUrl: '',
            imageFile: null,
        }]);
    };

    const removeFeature = async (index, id) => {
        if (!id) {
            // solo eliminar del estado local
            const updated = [...features];
            updated.splice(index, 1);
            setFeatures(updated);
            return;
        }
        try {
            await deleteFormStudy(id);
            const updated = [...features];
            updated.splice(index, 1);
            setFeatures(updated);
            showAlert('Eliminado correctamente', 'success');
        } catch (err) {
            console.error('Error al eliminar característica:', err);
            showAlert('No se pudo eliminar la característica', 'error');
        }
    };

    const moveFeature = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= features.length) return;
        const updated = [...features];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setFeatures(updated);
    };

    // Guardar todas las características al backend
    const handleSave = async () => {
        for (const feature of features) {
            const formData = new FormData();
            formData.append('locale', locale);

            const content = {
                titulo: feature.titulo,
                descripcion: feature.descripcion,
                imageUrl: feature.imageUrl, // url remota o preview
            };

            // Si hay archivo local nuevo, lo añadimos
            if (feature.imageFile instanceof File) {
                formData.append('file', feature.imageFile);
            }

            // Siempre enviamos el JSON con datos para título, descripción y URL
            formData.append('content', JSON.stringify(content));

            try {
                if (feature._id) {
                    await updateFormStudy(feature._id, formData);
                } else {
                    await createFormStudy(formData);
                }
                showAlert('Guardado correctamente', 'success');
            } catch (error) {
                console.error('Error al guardar característica:', error);
                showAlert('Error al guardar', 'error');
            }
        }

        await getFormStudies(locale); // recargar para sincronizar estado
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
                    <Card key={feature._id ?? index} className="border border-gray-200 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <h4 className="text-md font-medium">Característica {index + 1}</h4>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => moveFeature(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                                >
                                    <Move size={16} className="rotate-90" />
                                </button>
                                <button
                                    onClick={() => moveFeature(index, 'down')}
                                    disabled={index === features.length - 1}
                                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                                >
                                    <Move size={16} className="-rotate-90" />
                                </button>
                                <button
                                    onClick={() => removeFeature(index, feature?._id)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Campo Título */}
                            <Input
                                label="Título"
                                value={feature.titulo}
                                onChange={(e) => handleFeatureChange(index, 'titulo', e.target.value)}
                                fullWidth
                            />

                            {/* Campo Descripción con editor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <TextEditor
                                    value={feature.descripcion}
                                    setValue={(value) => handleFeatureChange(index, 'descripcion', value)}
                                    edit
                                />
                            </div>

                            {/* Campo Imagen */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">Subir imagen</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, index)}
                                />

                                {feature.imageUrl && (
                                    <img
                                        src={feature.imageUrl}
                                        alt={`Vista previa característica ${index + 1}`}
                                        className="h-32 object-contain mt-2"
                                    />
                                )}
                            </div>
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
}

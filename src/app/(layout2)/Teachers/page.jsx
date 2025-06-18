'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { createTeacher, deleteTeacher, getTeacher, updateTeacher } from '@/services/landing/landing.service';

const TeachersEditor = () => {
  const { siteData, updateSection, language } = useAppContext();
  const [formData, setFormData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const idioma = language.toLowerCase();
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});


  const fetchTeachers = async (locale) => {
    try {
      const data = await getTeacher(locale);
      setTeachers(data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
    }
  };
  useEffect(() => {
    fetchTeachers(idioma);
  }, [language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeacherChange = (index, field, value) => {
    const updated = [...teachers];
    updated[index] = {
      ...updated[index],
      [idioma]: {
        ...updated[index][idioma],
        [field]: value
      }
    };
    setTeachers(updated);
  };

  const handleArrayChange = (index, field, subIndex, value) => {
    const updated = [...teachers];
    const arr = [...(updated[index][idioma]?.[field] || [])];
    arr[subIndex] = value;
    updated[index] = {
      ...updated[index],
      [idioma]: {
        ...updated[index][idioma],
        [field]: arr
      }
    };
    setTeachers(updated);
  };

  const addArrayItem = (index, field) => {
    const updated = [...teachers];
    const arr = [...(updated[index][idioma]?.[field] || [])];
    arr.push('');
    updated[index] = {
      ...updated[index],
      [idioma]: {
        ...updated[index][idioma],
        [field]: arr
      }
    };
    setTeachers(updated);
  };

  const removeArrayItem = (index, field, subIndex) => {
    const updated = [...teachers];
    const arr = [...(updated[index][idioma]?.[field] || [])];
    arr.splice(subIndex, 1);
    updated[index] = {
      ...updated[index],
      [idioma]: {
        ...updated[index][idioma],
        [field]: arr
      }
    };
    setTeachers(updated);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target?.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setSelectedImages(prev => ({ ...prev, [index]: base64 }));
      setSelectedFiles(prev => ({ ...prev, [index]: file }));
    };
    reader.readAsDataURL(file);
  };


  const addTeacher = () => {
    const newTeacher = {
      [idioma]: {
        nombre: '',
        cargo: '',
        fotografia: '',
        resumenPrincipal: [],
        resumenSecundario: [],
        presentacion: []
      }
    };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const removeTeacher = async (index, id) => {
    console.log("id usuario: ", id);
    
    if (!id) {
      const updated = [...teachers];
      updated.splice(index, 1);
      setTeachers(updated);
      return;
    }

    try {
      const res = await deleteTeacher(id);
      console.log("eliminar teacher: ", res);
      
      const updated = [...teachers];
      updated.splice(index, 1);
      setTeachers(updated);
    } catch (error) {
      console.error('Error al eliminar característica:', err);
        alert('No se pudo eliminar la característica');
    }
  };

  const moveTeacher = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= teachers.length) return;
    const reordered = [...teachers];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setTeachers(reordered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Esto sigue igual si no incluye archivos
    updateSection('teachers', formData);

    for (let index = 0; index < teachers.length; index++) {
      const teacher = teachers[index];
      const formData = new FormData();

      formData.append('locale', idioma);
      formData.append('nombre', teacher[idioma]?.nombre || '');
      formData.append('cargo', teacher[idioma]?.cargo || '');
      formData.append('resumenPrincipal', JSON.stringify(teacher[idioma]?.resumenPrincipal || []));
      formData.append('resumenSecundario', JSON.stringify(teacher[idioma]?.resumenSecundario || []));
      formData.append('presentacion', JSON.stringify(teacher[idioma]?.presentacion || []));

      if (selectedFiles[index]) {
        formData.append('file', selectedFiles[index]);
      }

      if (teacher._id) {
        await updateTeacher(teacher._id, formData);
      } else {
        await createTeacher(formData);
      }
    }
    fetchTeachers(idioma);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Profesores</h2>
        <Button type="submit" form="teachers-form">Guardar cambios</Button>
      </div>

      <form id="teachers-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Perfiles de profesores</h3>
          <Button type="button" variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={addTeacher}>
            Añadir profesor
          </Button>
        </div>

        <div className="space-y-4">
          {teachers.map((teacher, index) => {
            const t = teacher[idioma] || {};
            return (
              <Card key={index}>
                <CardHeader className="flex justify-between items-center">
                  <h4 className="text-md font-medium">{t.nombre || 'Nuevo Profesor'}</h4>
                  <div className="flex space-x-2">
                    <button  type='button' onClick={() => moveTeacher(index, 'up')} disabled={index === 0} className="p-1">
                      <Move size={16} className="rotate-90" />
                    </button>
                    <button type='button' onClick={() => moveTeacher(index, 'down')} disabled={index === teachers.length - 1} className="p-1">
                      <Move size={16} className="-rotate-90" />
                    </button>
                    <button type='button' onClick={() => removeTeacher(index, teacher._id)} className="p-1 text-red-500">
                      <Trash size={16} />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Fotografía</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">

                        <img
                          src={selectedImages[index] || t.fotografia || '/no-image.png'}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />

                      </div>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                    </div>
                  </div>

                  <Input
                    label="Nombre"
                    value={t.nombre || ''}
                    onChange={(e) => handleTeacherChange(index, 'nombre', e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Cargo"
                    value={t.cargo || ''}
                    onChange={(e) => handleTeacherChange(index, 'cargo', e.target.value)}
                    fullWidth
                  />

                  {['resumenPrincipal', 'resumenSecundario', 'presentacion'].map((field) => (
                    <div key={field} className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{field}</h5>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          leftIcon={<Plus size={14} />}
                          onClick={() => addArrayItem(index, field)}
                        >
                          Añadir
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {(t[field] || []).map((item, i) => (
                          <div key={i} className="flex items-center">
                            <Input
                              value={item}
                              onChange={(e) => handleArrayChange(index, field, i, e.target.value)}
                              className="flex-grow"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem(index, field, i)}
                              className="ml-2 p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                        {(t[field] || []).length === 0 && (
                          <div className="text-center py-4 bg-gray-50 rounded border border-dashed">
                            <p className="text-sm text-gray-500">No hay elementos. Haga clic en "Añadir" para comenzar.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default TeachersEditor;

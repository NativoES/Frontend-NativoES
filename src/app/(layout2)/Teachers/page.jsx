'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import 'react-quill-new/dist/quill.core.css';
import { Plus, Trash, Move } from 'lucide-react';

import { createTeacher, deleteTeacher, getTeacher, updateTeacher } from '@/services/landing/landing.service';
import TextEditor from '@/components/TextEditor/TextEditor';

const TeachersEditor = () => {
  const { updateSection, language, showAlert } = useAppContext();
  const [teachers, setTeachers] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const idioma = language.toLowerCase();

  useEffect(() => {
    fetchTeachers(idioma);
  }, [language]);

  const fetchTeachers = async (locale) => {
    try {
      const data = await getTeacher(locale);
      setTeachers(data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
    }
  };

  const handleTeacherChange = (index, field, value) => {
    const prevValue = teachers[index]?.[idioma]?.[field];
    if (prevValue === value) return;

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
        resumenPrincipal: '',
        resumenSecundario: '',
        presentacion: ''
      }
    };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const removeTeacher = async (index, id) => {
    if (!id) {
      const updated = [...teachers];
      updated.splice(index, 1);
      setTeachers(updated);
      return;
    }

    try {
      await deleteTeacher(id);
      const updated = [...teachers];
      updated.splice(index, 1);
      setTeachers(updated);

      showAlert('Eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar profesor:', error);
      showAlert('Error al eliminar', 'error');
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
    updateSection('teachers', {});
    try {
      for (let index = 0; index < teachers.length; index++) {
        const teacher = teachers[index];
        const formData = new FormData();

        formData.append('locale', idioma);
        formData.append('nombre', teacher[idioma]?.nombre || '');
        formData.append('cargo', teacher[idioma]?.cargo || '');
        formData.append('resumenPrincipal', teacher[idioma]?.resumenPrincipal || '');
        formData.append('resumenSecundario', teacher[idioma]?.resumenSecundario || '');
        formData.append('presentacion', teacher[idioma]?.presentacion || '');

        if (selectedFiles[index]) {
          formData.append('file', selectedFiles[index]);
        }

        if (teacher._id) {
          await updateTeacher(teacher._id, formData);
        } else {
          await createTeacher(formData);
        }
      }

      showAlert('Guardado correctamente', 'success');
      fetchTeachers(idioma);
    } catch (error) {
      showAlert('Error al guardar', 'error');
    }


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
                    <button type='button' onClick={() => moveTeacher(index, 'up')} disabled={index === 0} className="p-1">
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
                          src={typeof selectedImages[index] === 'string' ? selectedImages[index] : (t.fotografia || '/no-image.png')}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen Principal</label>
                    <TextEditor
                      value={t.resumenPrincipal}
                      setValue={(value) => handleTeacherChange(index, 'resumenPrincipal', value)}
                      edit
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen Secundario</label>
                    <TextEditor
                      value={t.resumenSecundario}
                      setValue={(value) => handleTeacherChange(index, 'resumenSecundario', value)}
                      edit
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Presentación</label>
                    <TextEditor
                      value={t.presentacion}
                      setValue={(value) => handleTeacherChange(index, 'presentacion', value)}
                      edit
                    />
                  </div>
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

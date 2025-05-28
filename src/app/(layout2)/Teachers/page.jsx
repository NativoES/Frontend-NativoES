'use client'

import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';

const TeachersEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({
    title: siteData.teachers.title,
    subtitle: siteData.teachers.subtitle,
    profiles: [...siteData.teachers.profiles]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeacherChange = (index, field, value) => {
    const updatedProfiles = [...formData.profiles];
    updatedProfiles[index] = {
      ...updatedProfiles[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      profiles: updatedProfiles
    }));
  };

  const addTeacher = () => {
    const newTeacher = {
      id: Date.now().toString(),
      name: 'Nuevo Profesor',
      role: 'Profesor de Español',
      bio: 'Información del profesor...',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    };
    
    setFormData(prev => ({
      ...prev,
      profiles: [...prev.profiles, newTeacher]
    }));
  };

  const removeTeacher = (index) => {
    const updatedProfiles = [...formData.profiles];
    updatedProfiles.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      profiles: updatedProfiles
    }));
  };

  const moveTeacher = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.profiles.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedProfiles = [...formData.profiles];
    [updatedProfiles[index], updatedProfiles[newIndex]] = [updatedProfiles[newIndex], updatedProfiles[index]];
    
    setFormData(prev => ({
      ...prev,
      profiles: updatedProfiles
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('teachers', formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Profesores</h2>
        <Button type="submit" form="teachers-form">Guardar cambios</Button>
      </div>
      
      <form id="teachers-form" onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Encabezado de la sección</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Título de la sección"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
            />
            
            <Textarea
              label="Subtítulo de la sección"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              rows={2}
              fullWidth
            />
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Perfiles de profesores</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={addTeacher}
          >
            Añadir profesor
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.profiles.map((teacher, index) => (
            <Card key={teacher.id} className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <h4 className="text-md font-medium">{teacher.name}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => moveTeacher(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTeacher(index, 'down')}
                    disabled={index === formData.profiles.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTeacher(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Input
                    label="URL de imagen"
                    value={teacher.image}
                    onChange={(e) => handleTeacherChange(index, 'image', e.target.value)}
                    fullWidth
                  />
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <Input
                    label="Nombre"
                    value={teacher.name}
                    onChange={(e) => handleTeacherChange(index, 'name', e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    label="Cargo"
                    value={teacher.role}
                    onChange={(e) => handleTeacherChange(index, 'role', e.target.value)}
                    fullWidth
                  />
                  
                  <Textarea
                    label="Biografía"
                    value={teacher.bio}
                    onChange={(e) => handleTeacherChange(index, 'bio', e.target.value)}
                    rows={3}
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          {formData.profiles.length === 0 && (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No hay profesores. Haga clic en "Añadir profesor" para comenzar.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeachersEditor;
'use client'
import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';

const MethodsEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({
    title: siteData.methods.title,
    subtitle: siteData.methods.subtitle,
    items: [...siteData.methods.items]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMethodChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addMethod = () => {
    const newMethod = {
      id: Date.now().toString(),
      title: 'Nuevo método',
      description: 'Descripción del nuevo método de estudio',
      icon: 'book'
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newMethod]
    }));
  };

  const removeMethod = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const moveMethod = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.items.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedItems = [...formData.items];
    [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('methods', formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Métodos de Estudio</h2>
        <Button type="submit" form="methods-form">Guardar cambios</Button>
      </div>
      
      <form id="methods-form" onSubmit={handleSubmit}>
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
          <h3 className="text-lg font-semibold">Métodos de estudio</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={addMethod}
          >
            Añadir método
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.items.map((method, index) => (
            <Card key={method.id} className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <h4 className="text-md font-medium">{method.title}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => moveMethod(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMethod(index, 'down')}
                    disabled={index === formData.items.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMethod(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Título"
                  value={method.title}
                  onChange={(e) => handleMethodChange(index, 'title', e.target.value)}
                  fullWidth
                />
                
                <Textarea
                  label="Descripción"
                  value={method.description}
                  onChange={(e) => handleMethodChange(index, 'description', e.target.value)}
                  rows={3}
                  fullWidth
                />
                
                <Input
                  label="Icono"
                  value={method.icon}
                  onChange={(e) => handleMethodChange(index, 'icon', e.target.value)}
                  placeholder="book, video, user, etc."
                  fullWidth
                />
              </CardContent>
            </Card>
          ))}
          
          {formData.items.length === 0 && (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No hay métodos. Haga clic en "Añadir método" para comenzar.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MethodsEditor;
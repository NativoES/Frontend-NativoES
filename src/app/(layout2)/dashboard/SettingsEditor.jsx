'use client'
import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';

const SettingsEditor= () => {
  const { siteData, updateSection, resetToDefault } = useAppContext();
  const [navigation, setNavigation] = useState([...siteData.navigation]);

  const handleNavItemChange = (index, field, value) => {
    const updatedNavItems = [...navigation];
    updatedNavItems[index] = {
      ...updatedNavItems[index],
      [field]: value
    };
    setNavigation(updatedNavItems);
  };

  const addNavItem = () => {
    const newNavItem = {
      title: 'Nueva sección',
      href: '#nuevaseccion'
    };
    
    setNavigation(prev => [...prev, newNavItem]);
  };

  const removeNavItem = (index) => {
    const updatedNavItems = [...navigation];
    updatedNavItems.splice(index, 1);
    setNavigation(updatedNavItems);
  };

  const moveNavItem = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === navigation.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedNavItems = [...navigation];
    [updatedNavItems[index], updatedNavItems[newIndex]] = [updatedNavItems[newIndex], updatedNavItems[index]];
    
    setNavigation(updatedNavItems);
  };

  const handleSaveNavigation = () => {
    updateSection('navigation', navigation);
  };

  const handleResetData = () => {
    if (window.confirm('¿Está seguro que desea restablecer todos los datos a los valores por defecto? Esta acción no se puede deshacer.')) {
      resetToDefault();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Configuración del sitio</h2>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Navegación</h3>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleSaveNavigation}
            >
              Guardar navegación
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end mb-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={addNavItem}
            >
              Añadir elemento
            </Button>
          </div>
          
          <div className="space-y-3">
            {navigation.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  label="Título"
                  value={item.title}
                  onChange={(e) => handleNavItemChange(index, 'title', e.target.value)}
                  className="flex-1"
                />
                
                <Input
                  label="Enlace"
                  value={item.href}
                  onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                  className="flex-1"
                />
                
                <div className="flex mt-5 space-x-1">
                  <button
                    type="button"
                    onClick={() => moveNavItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveNavItem(index, 'down')}
                    disabled={index === navigation.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeNavItem(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {navigation.length === 0 && (
              <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">No hay elementos de navegación. Haga clic en "Añadir elemento" para comenzar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Acciones avanzadas</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Restablecer todos los datos del sitio a los valores por defecto. Esta acción no se puede deshacer.
              </p>
              <Button 
                variant="danger" 
                onClick={handleResetData}
              >
                Restablecer datos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsEditor;
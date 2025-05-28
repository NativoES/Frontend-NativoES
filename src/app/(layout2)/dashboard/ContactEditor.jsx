'use client'
import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const ContactEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({ ...siteData.contact });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('hours.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        hours: {
          ...prev.hours,
          [day]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('contact', formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Información de Contacto</h2>
        <Button type="submit" form="contact-form">Guardar cambios</Button>
      </div>
      
      <form id="contact-form" onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Información de contacto</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
              />
              
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-3">Horario de atención</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Lunes"
                    name="hours.monday"
                    value={formData.hours.monday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Martes"
                    name="hours.tuesday"
                    value={formData.hours.tuesday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Miércoles"
                    name="hours.wednesday"
                    value={formData.hours.wednesday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Jueves"
                    name="hours.thursday"
                    value={formData.hours.thursday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Viernes"
                    name="hours.friday"
                    value={formData.hours.friday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Sábado"
                    name="hours.saturday"
                    value={formData.hours.saturday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Domingo"
                    name="hours.sunday"
                    value={formData.hours.sunday}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ContactEditor;
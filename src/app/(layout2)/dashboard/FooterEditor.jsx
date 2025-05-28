import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash } from 'lucide-react';

const FooterEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({ ...siteData.footer });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const addSocialLink = () => {
    const newLink = {
      platform: 'nueva-plataforma',
      url: '#'
    };
    
    setFormData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink]
    }));
  };

  const removeSocialLink = (index) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('footer', formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Pie de Página</h2>
        <Button type="submit" form="footer-form">Guardar cambios</Button>
      </div>
      
      <form id="footer-form" onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Información del pie de página</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Logo / Texto del logo"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              fullWidth
            />
            
            <Textarea
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              fullWidth
            />
            
            <Input
              label="Texto de copyright"
              name="copyright"
              value={formData.copyright}
              onChange={handleInputChange}
              fullWidth
            />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium">Redes sociales</h4>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={addSocialLink}
                >
                  Añadir red social
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      label="Plataforma"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      className="flex-1"
                    />
                    
                    <Input
                      label="URL"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      className="flex-1"
                    />
                    
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="mt-5 p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
                
                {formData.socialLinks.length === 0 && (
                  <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No hay redes sociales. Haga clic en "Añadir red social" para comenzar.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default FooterEditor;
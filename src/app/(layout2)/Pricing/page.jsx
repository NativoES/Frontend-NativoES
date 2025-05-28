'use client'

import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move, Check } from 'lucide-react';

const PricingEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({
    title: siteData.pricing.title,
    subtitle: siteData.pricing.subtitle,
    tiers: [...siteData.pricing.tiers]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const handleFeatureChange = (tierIndex, featureIndex, value) => {
    const updatedTiers = [...formData.tiers];
    const updatedFeatures = [...updatedTiers[tierIndex].features];
    updatedFeatures[featureIndex] = value;
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      features: updatedFeatures
    };
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const addFeature = (tierIndex) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      features: [...updatedTiers[tierIndex].features, 'Nueva característica']
    };
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const removeFeature = (tierIndex, featureIndex) => {
    const updatedTiers = [...formData.tiers];
    const updatedFeatures = [...updatedTiers[tierIndex].features];
    updatedFeatures.splice(featureIndex, 1);
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      features: updatedFeatures
    };
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const addTier = () => {
    const newTier = {
      id: Date.now().toString(),
      title: 'Nuevo Plan',
      price: '1000',
      discountPrice: null,
      features: ['Característica 1', 'Característica 2', 'Característica 3'],
      cta: 'Reserva tu clase'
    };
    
    setFormData(prev => ({
      ...prev,
      tiers: [...prev.tiers, newTier]
    }));
  };

  const removeTier = (index) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const moveTier = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.tiers.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedTiers = [...formData.tiers];
    [updatedTiers[index], updatedTiers[newIndex]] = [updatedTiers[newIndex], updatedTiers[index]];
    
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const togglePopular = (index) => {
    const updatedTiers = [...formData.tiers];
    
    // First, remove popular from all tiers
    updatedTiers.forEach(tier => {
      tier.isPopular = false;
    });
    
    // Then set the selected one as popular
    updatedTiers[index] = {
      ...updatedTiers[index],
      isPopular: !updatedTiers[index].isPopular
    };
    
    setFormData(prev => ({
      ...prev,
      tiers: updatedTiers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('pricing', formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Precios</h2>
        <Button type="submit" form="pricing-form">Guardar cambios</Button>
      </div>
      
      <form id="pricing-form" onSubmit={handleSubmit}>
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
          <h3 className="text-lg font-semibold">Planes de precios</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={addTier}
          >
            Añadir plan
          </Button>
        </div>
        
        <div className="space-y-6">
          {formData.tiers.map((tier, tierIndex) => (
            <Card key={tier.id} className={`border ${tier.isPopular ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900' : 'border-gray-200 dark:border-gray-700'}`}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center">
                  <h4 className="text-md font-medium">{tier.title}</h4>
                  {tier.isPopular && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => togglePopular(tierIndex)}
                    className={`p-1 ${tier.isPopular ? 'text-blue-500 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Marcar como popular"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTier(tierIndex, 'up')}
                    disabled={tierIndex === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTier(tierIndex, 'down')}
                    disabled={tierIndex === formData.tiers.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTier(tierIndex)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Título del plan"
                  value={tier.title}
                  onChange={(e) => handleTierChange(tierIndex, 'title', e.target.value)}
                  fullWidth
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Precio regular"
                    value={tier.price}
                    onChange={(e) => handleTierChange(tierIndex, 'price', e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    label="Precio con descuento (dejar vacío si no hay)"
                    value={tier.discountPrice || ''}
                    onChange={(e) => handleTierChange(tierIndex, 'discountPrice', e.target.value || null)}
                    fullWidth
                  />
                </div>
                
                <Input
                  label="Texto del botón CTA"
                  value={tier.cta}
                  onChange={(e) => handleTierChange(tierIndex, 'cta', e.target.value)}
                  fullWidth
                />
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Características</h5>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      leftIcon={<Plus size={14} />}
                      onClick={() => addFeature(tierIndex)}
                    >
                      Añadir
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(tierIndex, featureIndex, e.target.value)}
                          className="flex-grow"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(tierIndex, featureIndex)}
                          className="ml-2 p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {tier.features.length === 0 && (
                      <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">No hay características. Haga clic en "Añadir" para comenzar.</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {formData.tiers.length === 0 && (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No hay planes de precios. Haga clic en "Añadir plan" para comenzar.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PricingEditor;
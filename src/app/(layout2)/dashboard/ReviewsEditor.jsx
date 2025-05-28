'use client'
import React, { useState } from 'react';
 import { useAppContext} from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move, Star } from 'lucide-react';

const ReviewsEditor= () => {
  const { siteData, updateSection } = useAppContext();
  const [formData, setFormData] = useState({
    title: siteData.reviews.title,
    subtitle: siteData.reviews.subtitle,
    items: [...siteData.reviews.items]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReviewChange = (index, field, value) => {
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

  const handleRatingChange = (index, rating) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      rating
    };
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addReview = () => {
    const newReview = {
      id: Date.now().toString(),
      author: 'Nuevo Estudiante',
      content: 'Esta es una nueva reseña...',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newReview]
    }));
  };

  const removeReview = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const moveReview = (index, direction) => {
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
    updateSection('reviews', formData);
  };

  const RatingSelector = ({ rating, onChange }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="p-1 focus:outline-none"
          >
            <Star 
              size={20} 
              className={value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Reseñas</h2>
        <Button type="submit" form="reviews-form">Guardar cambios</Button>
      </div>
      
      <form id="reviews-form" onSubmit={handleSubmit}>
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
          <h3 className="text-lg font-semibold">Reseñas</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={addReview}
          >
            Añadir reseña
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.items.map((review, index) => (
            <Card key={review.id} className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <h4 className="text-md font-medium">{review.author}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => moveReview(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveReview(index, 'down')}
                    disabled={index === formData.items.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <Move size={16} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeReview(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <div className="flex justify-center mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={review.avatar} 
                        alt={review.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <Input
                    label="URL de avatar"
                    value={review.avatar}
                    onChange={(e) => handleReviewChange(index, 'avatar', e.target.value)}
                    fullWidth
                  />
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Calificación
                    </label>
                    <RatingSelector 
                      rating={review.rating} 
                      onChange={(rating) => handleRatingChange(index, rating)} 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <Input
                    label="Nombre del autor"
                    value={review.author}
                    onChange={(e) => handleReviewChange(index, 'author', e.target.value)}
                    fullWidth
                  />
                  
                  <Textarea
                    label="Contenido de la reseña"
                    value={review.content}
                    onChange={(e) => handleReviewChange(index, 'content', e.target.value)}
                    rows={4}
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          {formData.items.length === 0 && (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No hay reseñas. Haga clic en "Añadir reseña" para comenzar.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewsEditor;
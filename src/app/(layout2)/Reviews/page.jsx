'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move, Star } from 'lucide-react';

const ReviewsEditor = () => {
  const { language, updateSection } = useAppContext();
  const [formData, setFormData] = useState([]);

  const idioma = language.toLowerCase();

  const loadData = (lang) => {
  fetch(`http://localhost:5000/api/review?locale=${lang}`)
    .then(res => res.json())  // <--- esto es clave
    .then(data => {
      if (Array.isArray(data)) {
        const normalized = data.map(item => ({
          _id: item._id,
          ...item[lang]?.resennia
        }));
        setFormData(normalized);
      }
    });
};


  useEffect(() => {
    loadData(idioma);
  }, [language]);

  const handleReviewChange = (index, field, value) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);
  };

  const handleAvatarChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleReviewChange(index, 'avatarUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRatingChange = (index, newRating) => {
    const updated = [...formData];
    updated[index].calificacion = newRating;
    setFormData(updated);
  };

  const addReview = () => {
    setFormData(prev => [
      ...prev,
      {
        nombre: '',
        contenido: '',
        calificacion: 0,
        avatarUrl: ''
      }
    ]);
  };

  const removeReview = (index) => {
    const updated = [...formData];
    updated.splice(index, 1);
    setFormData(updated);
  };

  const moveReview = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.length) return;
    const updated = [...formData];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const review of formData) {
      const method = review._id ? 'PATCH' : 'POST';
      const url = review._id
        ? `http://localhost:5000/api/review/${review._id}`
        : `http://localhost:5000/api/review`;

      const body = {
        resennia: { ...review },
        locale: idioma
      };

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    updateSection('reviews', formData);
  };

  console.log('Form Data:', formData);

  const RatingSelector = ({ rating, onChange }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(value => (
        <button key={value} type="button" onClick={() => onChange(value)} className="p-1">
          <Star
            size={20}
            className={value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Sección de Reseñas</h2>
        <Button type="submit" form="reviews-form">Guardar cambios</Button>
      </div>

      <form id="reviews-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mt-6">
          <h3 className="text-lg font-semibold">Reseñas</h3>
          <Button type="button" onClick={addReview} leftIcon={<Plus size={16} />}>
            Añadir reseña
          </Button>
        </div>

        <div className="space-y-4 mt-4">
          {formData.map((review, index) => (
            <Card key={review._id || index}>
              <CardHeader className="flex items-center justify-between py-3">
                <span className="font-medium">{review.nombre || 'Sin nombre'}</span>
                <div className="flex gap-2">
                  <button type="button" disabled={index === 0} onClick={() => moveReview(index, 'up')}>
                    <Move size={16} className="rotate-90 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    disabled={index === formData.length - 1}
                    onClick={() => moveReview(index, 'down')}
                  >
                    <Move size={16} className="-rotate-90 text-gray-500" />
                  </button>
                  <button type="button" onClick={() => removeReview(index)}>
                    <Trash size={16} className="text-red-500" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                    <img
                      src={review.avatarUrl || '/books.png'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarChange(index, file);
                    }}
                  />
                  <div className="mt-2">
                    <label className="text-sm">Calificación</label>
                    <RatingSelector
                      rating={review.calificacion ?? 0}
                      onChange={(value) => handleRatingChange(index, value)}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <Input
                    label="Nombre"
                    value={review.nombre}
                    onChange={(e) => handleReviewChange(index, 'nombre', e.target.value)}
                    fullWidth
                  />
                  <Textarea
                    label="Contenido"
                    value={review.contenido}
                    onChange={(e) => handleReviewChange(index, 'contenido', e.target.value)}
                    rows={4}
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ReviewsEditor;

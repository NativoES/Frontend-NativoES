'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/Context';

import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';

const ReviewsEditor = () => {
  const { language, updateSection } = useAppContext();
  const [formData, setFormData] = useState([]);
  const idioma = language.toLowerCase();

  const loadData = async () => {
    fetch(`http://localhost:5000/api/review?locale=${idioma}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const normalized = data.map(item => ({
            _id: item._id,
            ...item[idioma]?.resennia,
            avatarUrl: item[idioma]?.resennia?.avatarUrl || '',
            avatarFile: null,
            respuestas: item[idioma]?.respuestas ?? {
              texto: '',
              autor: '',
              contenido: '',
              fecha: new Date().toISOString()
            }
          }));
          setFormData(normalized);
        }
      });
  }

  useEffect(() => {
    loadData();
  }, [language]);

  const updateReviewField = (index, field, value) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);
  };

  const updateAvatarFile = (index, file) => {
    const updated = [...formData];
    updated[index].avatarFile = file;
    updated[index].avatarUrl = URL.createObjectURL(file); // para vista previa
    setFormData(updated);
  };

  const updateRespuestaField = (index, field, value) => {
    const updated = [...formData];
    updated[index].respuestas = {
      ...updated[index].respuestas,
      [field]: value
    };
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const review of formData) {
      const method = review._id ? 'PATCH' : 'POST';
      const url = review._id
        ? `http://localhost:5000/api/review/${review._id}`
        : `http://localhost:5000/api/review`;

      const form = new FormData();
      form.append('locale', idioma);

      // 🔁 Serializamos 'resennia' como un objeto
      const resennia = {
        nombre: review.nombre,
        contenido: review.contenido,
        calificacion: review.calificacion,
        avatarUrl: review.avatarUrl, // solo si ya existe
      };
      form.append('resennia', JSON.stringify(resennia));

      // 🔁 También serializamos 'respuestas'
      form.append('respuestas', JSON.stringify(review.respuestas));

      // Si hay archivo seleccionado (nuevo)
      if (review.avatarFile instanceof File) {
        form.append('file', review.avatarFile);
      }

      await fetch(url, {
        method,
        body: form,
      });
    }

    updateSection('reviews', formData);
    loadData();
  };



  const addReview = () => {
    setFormData(prev => [
      ...prev,
      {
        nombre: '',
        contenido: '',
        calificacion: 0,
        avatarUrl: '',
        avatarFile: null,
        respuestas: {
          texto: '',
          autor: '',
          contenido: '',
          fecha: new Date().toISOString()
        }
      }
    ]);
  };

  const removeReview = async (index) => {
    const review = formData[index];

    // Si tiene ID, eliminar en backend primero
    if (review._id) {
      try {
        const response = await fetch(`http://localhost:5000/api/review/${review._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.error('Error al eliminar en la base de datos');
          return;
        }
      } catch (error) {
        console.error('Error en la petición DELETE:', error);
        return;
      }
    }

    // Luego eliminar del estado local
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
            <ReviewCard
              key={review._id || index}
              review={review}
              index={index}
              onChange={updateReviewField}
              onChangeRespuesta={updateRespuestaField}
              onAvatarChange={updateAvatarFile}
              onMove={moveReview}
              onRemove={removeReview}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default ReviewsEditor;

'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/Context';

import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { createReview, deleteReview, getReview, updateReview } from '@/services/landing/landing.service';

const ReviewsEditor = () => {
  const { language, showAlert, updateSection } = useAppContext();
  const [formData, setFormData] = useState([]);
  const idioma = language.toLowerCase();

  const loadData = async () => {
    try {
      const data = await getReview(idioma);

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
    } catch (error) {
      console.error('Error al cargar los reviews:', error);
      alert("Error al cargar los datos.")
    }
  };

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

    try {
      for (const review of formData) {
        const form = new FormData();
        form.append('locale', idioma);

        const resennia = {
          nombre: review.nombre,
          contenido: review.contenido,
          calificacion: review.calificacion,
          avatarUrl: review.avatarUrl,
        };
        form.append('resennia', JSON.stringify(resennia));
        form.append('respuestas', JSON.stringify(review.respuestas));

        if (review.avatarFile instanceof File) {
          form.append('file', review.avatarFile);
        }

        if (review._id) {
          await updateReview(review._id, form);
        } else {
          await createReview(form);
        }
      }

      updateSection('reviews', formData);
      await loadData();
      showAlert('Guardado correctamente', 'success');
    } catch (error) {
      showAlert('Error al guardar', 'error');
    }
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

    if (review._id) {
      try {
        await deleteReview(review._id);
        showAlert('Eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar en la base de datos:', error);
        showAlert('Error al eliminar', 'error');
        return;
      }
    }

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

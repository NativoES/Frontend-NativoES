'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

const API_URL = 'http://localhost:5000/api/plan';

export default function PricingEditor() {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        const loaded = data.map(plan => {
          const content = plan[locale] || {};
          return {
            _id: plan._id,
            planTitle: content.tituloDelPlan || '',
            planDescription: content.descripcion || '',
            planImageUrl: content.imageUrl || '',
            typePlans: Array.isArray(content.typePlan)
              ? content.typePlan.map(tp => ({
                title: tp.type || '',
                price: tp.precioRegular?.toString() || '',
                discountPrice: tp.precioConDescuento?.toString() || '',
                features: tp.caracteristicas || [],
              }))
              : [],
          };
        });
        setPlans(loaded);
      });
  }, [language]);

  const handleChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleTypePlanChange = (planIndex, tpIndex, field, value) => {
    const updated = [...plans];
    updated[planIndex].typePlans[tpIndex][field] = value;
    setPlans(updated);
  };

  const handleFeatureChange = (planIndex, tpIndex, featIndex, value) => {
    const updated = [...plans];
    updated[planIndex].typePlans[tpIndex].features[featIndex] = value;
    setPlans(updated);
  };

  const addPlan = () => {
    setPlans([
      ...plans,
      {
        _id: null,
        planTitle: '',
        planDescription: '',
        planImageUrl: '',
        typePlans: [],
      },
    ]);
  };

  const addTypePlan = (index) => {
    const updated = [...plans];
    updated[index].typePlans.push({
      title: 'Nuevo tipo',
      price: '',
      discountPrice: '',
      features: ['Nueva característica'],
    });
    setPlans(updated);
  };

  const removeTypePlan = (planIndex, tpIndex) => {
    const updated = [...plans];
    updated[planIndex].typePlans.splice(tpIndex, 1);
    setPlans(updated);
  };

  const addFeature = (planIndex, tpIndex) => {
    const updated = [...plans];
    updated[planIndex].typePlans[tpIndex].features.push('Nueva característica');
    setPlans(updated);
  };

  const removeFeature = (planIndex, tpIndex, featIndex) => {
    const updated = [...plans];
    updated[planIndex].typePlans[tpIndex].features.splice(featIndex, 1);
    setPlans(updated);
  };

  const removePlan = async (index) => {
    const plan = plans[index];

    // Si el plan ya existe en la base de datos (tiene _id), lo eliminamos del backend
    if (plan._id) {
      const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este plan?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`${API_URL}/${plan._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error eliminando plan: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al eliminar el plan');
        return; // No continuamos si falló el backend
      }
    }

    // Solo si todo va bien, actualizamos el estado local
    const updated = [...plans];
    updated.splice(index, 1);
    setPlans(updated);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const plan of plans) {
      const payload = {
        locale,
        tituloDelPlan: plan.planTitle,
        descripcion: plan.planDescription,
        imageUrl: plan.planImageUrl,
        typePlan: plan.typePlans.map(tp => ({
          type: tp.title,
          precioRegular: Number(tp.price),
          precioConDescuento: tp.discountPrice ? Number(tp.discountPrice) : null,
          caracteristicas: tp.features,
        })),
      };
      const res = await fetch(`${API_URL}${plan._id ? `/${plan._id}` : ''}`, {
        method: plan._id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) alert('Error al guardar algún plan');
    }
    alert('Planes guardados correctamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editar Sección de Precios</h2>
        <Button onClick={handleSubmit}>Guardar cambios</Button>
      </div>

      <Button type="button" onClick={addPlan} variant="outline" size="sm" leftIcon={<Plus size={16} />}>
        Agregar nuevo plan
      </Button>

      <form onSubmit={handleSubmit}>
        {plans.map((plan, i) => (
          <Card key={i} className="mb-6">
            <CardHeader className="flex justify-between items-center">
              <Input
                label="Título del plan"
                value={plan.planTitle}
                onChange={(e) => handleChange(i, 'planTitle', e.target.value)}
                fullWidth
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => removePlan(i)}>
                <Trash size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <Input
                label="URL imagen"
                value={plan.planImageUrl}
                onChange={(e) => handleChange(i, 'planImageUrl', e.target.value)}
                fullWidth
              />
              <Textarea
                label="Descripción del plan"
                value={plan.planDescription}
                onChange={(e) => handleChange(i, 'planDescription', e.target.value)}
                rows={3}
                fullWidth
              />

              <div className="flex justify-between items-center mt-6 mb-2">
                <h4 className="font-semibold">Tipos de plan</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => addTypePlan(i)} leftIcon={<Plus size={14} />}>
                  Agregar tipo de plan
                </Button>
              </div>

              {plan.typePlans.map((tp, j) => (
                <div key={j} className="border p-4 mb-4 rounded">
                  <Input
                    label="Tipo"
                    value={tp.title}
                    onChange={(e) => handleTypePlanChange(i, j, 'title', e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Precio regular"
                    type="number"
                    value={tp.price}
                    onChange={(e) => handleTypePlanChange(i, j, 'price', e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Precio con descuento"
                    type="number"
                    value={tp.discountPrice}
                    onChange={(e) => handleTypePlanChange(i, j, 'discountPrice', e.target.value)}
                    fullWidth
                  />

                  <div className="mt-4">
                    <h5 className="font-semibold mb-2">Características</h5>
                    {tp.features.map((feature, k) => (
                      <div key={k} className="flex items-center gap-2 mb-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(i, j, k, e.target.value)}
                          fullWidth
                        />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(i, j, k)}>
                          <Trash size={14} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addFeature(i, j)} leftIcon={<Plus size={14} />}>
                      Agregar característica
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeTypePlan(i, j)}>
                      <Trash size={16} className="mr-2" /> Eliminar tipo de plan
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </form>
    </div>
  );
}

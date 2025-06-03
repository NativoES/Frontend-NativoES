'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

const API_URL = 'http://localhost:5000/api/plan';

export default function PricingEditor() {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [tiers, setTiers] = useState([]);

  const loadPlans = (lang) => {
    fetch(`${API_URL}?locale=${lang}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('La respuesta no es un arreglo');

        const uiTiers = [];

        data.forEach(plan => {
          // El contenido para el idioma está dentro de plan[lang], ej plan['en']
          const content = plan[lang];
          if (!content) {
            console.warn(`No hay contenido para locale ${lang} en plan ${plan._id}`);
            return;
          }
          if (!Array.isArray(content.typePlan)) {
            console.warn(`typePlan no es arreglo en plan ${plan._id}`);
            return;
          }

          content.typePlan.forEach((tp, i) => {
            uiTiers.push({
              _id: plan._id,
              planTitle: content.tituloDelPlan || '',
              planDescription: content.descripcion || '',
              planImageUrl: content.imageUrl || '',
              tierId: i.toString(),
              title: tp.type || '',
              price: tp.precioRegular != null ? tp.precioRegular.toString() : '',
              discountPrice: tp.precioConDescuento != null ? tp.precioConDescuento.toString() : '',
              features: Array.isArray(tp.caracteristicas) ? tp.caracteristicas : [],
            });
          });
        });

        setTiers(uiTiers);
      })
      .catch(err => {
        console.error('Error al cargar planes:', err);
        alert('Error cargando planes, revisa consola.');
      });
  };

  console.log('Tiers cargados:', tiers);
  


  useEffect(() => {
    loadPlans(locale);
  }, [language]);

  function handleTierChange(index, field, value) {
    const newTiers = [...tiers];
    newTiers[index][field] = value;
    setTiers(newTiers);
  }

  function handleFeatureChange(tierIndex, featureIndex, value) {
    const newTiers = [...tiers];
    newTiers[tierIndex].features[featureIndex] = value;
    setTiers(newTiers);
  }

  function addFeature(tierIndex) {
    const newTiers = [...tiers];
    newTiers[tierIndex].features.push('Nueva característica');
    setTiers(newTiers);
  }

  function removeFeature(tierIndex, featureIndex) {
    const newTiers = [...tiers];
    newTiers[tierIndex].features.splice(featureIndex, 1);
    setTiers(newTiers);
  }

  function addTier() {
    setTiers([
      ...tiers,
      {
        _id: null,
        planTitle: '',
        planDescription: '',
        planImageUrl: '',
        tierId: Date.now().toString(),
        title: 'Nuevo tipo',
        price: '',
        discountPrice: '',
        features: ['Nueva característica'],
      },
    ]);
  }

  function removeTier(index) {
    const newTiers = [...tiers];
    newTiers.splice(index, 1);
    setTiers(newTiers);
  }

  function moveTier(index, direction) {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === tiers.length - 1))
      return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newTiers = [...tiers];
    [newTiers[index], newTiers[newIndex]] = [newTiers[newIndex], newTiers[index]];
    setTiers(newTiers);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Agrupar tiers por plan (_id) para enviar completos
    const plansGrouped = {};
    tiers.forEach(tier => {
      const planId = tier._id || 'new-' + tier.tierId;
      if (!plansGrouped[planId]) {
        plansGrouped[planId] = {
          _id: tier._id,
          tituloDelPlan: tier.planTitle,
          descripcion: tier.planDescription,
          imageUrl: tier.planImageUrl,
          typePlan: [],
        };
      }
      plansGrouped[planId].typePlan.push({
        type: tier.title,
        precioRegular: Number(tier.price),
        precioConDescuento: tier.discountPrice ? Number(tier.discountPrice) : null,
        caracteristicas: tier.features,
      });
    });

    try {
      for (const key in plansGrouped) {
        const plan = plansGrouped[key];
        const body = {
          locale: locale,
          tituloDelPlan: plan.tituloDelPlan,
          descripcion: plan.descripcion,
          imageUrl: plan.imageUrl,
          typePlan: plan.typePlan,
        };

        if (plan._id) {
          await fetch(`${API_URL}/${plan._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        } else {
          await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        }
      }
      alert('Planes guardados correctamente');
    } catch {
      alert('Error al guardar los planes');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editar Sección de Precios</h2>
        <Button onClick={handleSubmit}>Guardar cambios</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Planes de precios</h3>
          <Button type="button" variant="outline" size="sm" onClick={addTier} leftIcon={<Plus size={16} />}>
            Agregar tipo de plan
          </Button>
        </div>

        {tiers.map((tier, i) => (
          <Card key={`${tier._id || 'new'}-${tier.tierId}`} className="mb-6">
            <CardHeader className="flex justify-between items-center gap-2">
              <Input
                label="Título del plan"
                value={tier.planTitle}
                onChange={e => {
                  // Actualizar planTitle en todos los tiers con mismo _id
                  setTiers(current =>
                    current.map(t => (t._id === tier._id ? { ...t, planTitle: e.target.value } : t))
                  );
                }}
                fullWidth
              />
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => moveTier(i, 'up')} disabled={i === 0}>
                  <Move size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => moveTier(i, 'down')} disabled={i === tiers.length - 1}>
                  <Move size={16} className="rotate-180" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeTier(i)}>
                  <Trash size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Input label="Tipo de plan" value={tier.title} onChange={e => handleTierChange(i, 'title', e.target.value)} fullWidth />
              <Input
                label="Precio regular"
                type="number"
                value={tier.price}
                onChange={e => handleTierChange(i, 'price', e.target.value)}
                fullWidth
              />
              <Input
                label="Precio con descuento"
                type="number"
                value={tier.discountPrice}
                onChange={e => handleTierChange(i, 'discountPrice', e.target.value)}
                fullWidth
              />
              <Input
                label="URL imagen"
                value={tier.planImageUrl}
                onChange={e => {
                  // Actualizar en todos tiers con mismo _id
                  setTiers(current =>
                    current.map(t => (t._id === tier._id ? { ...t, planImageUrl: e.target.value } : t))
                  );
                }}
                fullWidth
              />
              <Textarea
                label="Descripción del plan"
                value={tier.planDescription}
                onChange={e => {
                  setTiers(current =>
                    current.map(t => (t._id === tier._id ? { ...t, planDescription: e.target.value } : t))
                  );
                }}
                rows={3}
                fullWidth
              />

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Características</h4>
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={e => handleFeatureChange(i, idx, e.target.value)}
                      fullWidth
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeFeature(i, idx)}>
                      <Trash size={14} />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" leftIcon={<Plus size={14} />} onClick={() => addFeature(i)}>
                  Agregar característica
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </form>
    </div>
  );
}

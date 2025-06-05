'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/Context';
import { Plus, Trash } from 'lucide-react';
import TextEditor from '@/components/textEditor/TextEditor';

const API_URL = 'http://localhost:5000/api/plan';

export default function PricingEditor() {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [plans, setPlans] = useState([]);

  // Cargar planes
  useEffect(() => {
    fetch(`${API_URL}?locale=${locale}`)
      .then(res => res.json())
      .then(data => setPlans(data.map(p => ({
        _id: p._id,
        tituloDelPlan: p[locale]?.tituloDelPlan || '',
        descripcion: p[locale]?.descripcion || '',
        imageUrl: p[locale]?.imageUrl || '',
        typePlan: (p[locale]?.typePlan || []).map(tp => ({
          type: tp.type,
          caracteristicas: tp.caracteristicas.map(c => ({
            caracteristica: c.caracteristica,
            precioRegular: c.precioRegular || '',
            precioConDescuento: c.precioConDescuento || ''
          }))
        }))
      }))));
  }, [locale]);

  const handleChange = (i, field, value) => {
    const updated = [...plans];
    updated[i][field] = value;
    setPlans(updated);
  };

  const handleTypePlanChange = (i, j, field, value) => {
    const updated = [...plans];
    updated[i].typePlan[j][field] = value;
    setPlans(updated);
  };

  const handleFeatureChange = (i, j, k, field, value) => {
    const updated = [...plans];
    updated[i].typePlan[j].caracteristicas[k][field] = value;
    setPlans(updated);
  };

  const addPlan = () => {
    setPlans([...plans, {
      tituloDelPlan: '',
      descripcion: '',
      imageUrl: '',
      typePlan: []
    }]);
  };

  const removePlan = i => {
    const updated = [...plans];
    updated.splice(i, 1);
    setPlans(updated);
  };

  const addTypePlan = i => {
    const updated = [...plans];
    updated[i].typePlan.push({
      type: '',
      caracteristicas: []
    });
    setPlans(updated);
  };

  const removeTypePlan = (i, j) => {
    const updated = [...plans];
    updated[i].typePlan.splice(j, 1);
    setPlans(updated);
  };

  const addCaracteristica = (i, j) => {
    const updated = [...plans];
    updated[i].typePlan[j].caracteristicas.push({
      caracteristica: '',
      precioRegular: '',
      precioConDescuento: ''
    });
    setPlans(updated);
  };

  const removeCaracteristica = (i, j, k) => {
    const updated = [...plans];
    updated[i].typePlan[j].caracteristicas.splice(k, 1);
    setPlans(updated);
  };

  const save = async () => {
    for (const plan of plans) {
      const payload = {
        locale,
        tituloDelPlan: plan.tituloDelPlan,
        descripcion: plan.descripcion,
        imageUrl: plan.imageUrl,
        typePlan: plan.typePlan.map(tp => ({
          type: tp.type,
          caracteristicas: tp.caracteristicas.map(c => ({
            caracteristica: c.caracteristica,
            precioRegular: Number(c.precioRegular),
            precioConDescuento: Number(c.precioConDescuento)
          }))
        }))
      };

      await fetch(`${API_URL}${plan._id ? `/${plan._id}` : ''}`, {
        method: plan._id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    alert('Planes guardados');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Planes</h2>
        <Button onClick={save}>Guardar</Button>
      </div>

      <Button onClick={addPlan} variant="outline" size="sm">Agregar plan</Button>

      {plans.map((plan, i) => (
        <div key={i} className="border p-4 rounded space-y-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <Input label="Título" value={plan.tituloDelPlan} onChange={e => handleChange(i, 'tituloDelPlan', e.target.value)} />
          <Input label="Imagen" value={plan.imageUrl} onChange={e => handleChange(i, 'imageUrl', e.target.value)} />
          <TextEditor value={plan.descripcion} setValue={val => handleChange(i, 'descripcion', val)} edit />

          <Button onClick={() => addTypePlan(i)} variant="outline" size="xs">Agregar tipo de plan</Button>

          {plan.typePlan.map((tp, j) => (
            <div key={j} className="border p-2 rounded bg-gray-50 dark:bg-gray-700">

              <div className="flex justify-between">
                <Input label="Tipo" value={tp.type} onChange={e => handleTypePlanChange(i, j, 'type', e.target.value)} />
                <Button onClick={() => removeTypePlan(i, j)} variant="ghost" size="icon"><Trash size={16} /></Button>
              </div>

              {tp.caracteristicas.map((c, k) => (
                <div key={k} className="grid grid-cols-4 gap-1 mt-2 items-end">
                  <Input label="Característica" value={c.caracteristica} onChange={e => handleFeatureChange(i, j, k, 'caracteristica', e.target.value)} />
                  <Input label="Precio regular" value={c.precioRegular} onChange={e => handleFeatureChange(i, j, k, 'precioRegular', e.target.value)} />
                  <Input label="Con descuento" value={c.precioConDescuento} onChange={e => handleFeatureChange(i, j, k, 'precioConDescuento', e.target.value)} />
                  <Button onClick={() => removeCaracteristica(i, j, k)} variant="ghost" size="icon"><Trash size={14} /></Button>
                </div>
              ))}

              <Button onClick={() => addCaracteristica(i, j)} variant="outline" size="xs" className="mt-2">Agregar característica</Button>
            </div>
          ))}

          <Button onClick={() => removePlan(i)} variant="destructive" size="xs">Eliminar plan</Button>
        </div>
      ))}
    </div>
  );
}

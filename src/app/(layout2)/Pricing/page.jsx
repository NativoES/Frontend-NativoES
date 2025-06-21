'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/Context';
import { Plus, Trash } from 'lucide-react';
import TextEditor from '@/components/TextEditor/TextEditor';
import {
  createPrice,
  updatePrice,
  deletePrice,
  getPrice
} from '@/services/landing/landing.service';

export default function PricingEditor() {
  const { language, showAlert } = useAppContext();
  const locale = language.toLowerCase();
  const [plans, setPlans] = useState([]);

  // Cargar planes
  const fetchPrices = async () => {
    try {
      const data = await getPrice(locale);
      const mapped = data.map(p => ({
        _id: p._id,
        tituloDelPlan: p[locale]?.tituloDelPlan || '',
        descripcion: p[locale]?.descripcion || '',
        imageUrl: p[locale]?.imageUrl || '',
        imageFile: null,
        typePlan: (p[locale]?.typePlan || []).map(tp => ({
          type: tp.type,
          caracteristicas: tp.caracteristicas.map(c => ({
            caracteristica: c.caracteristica,
            precioRegular: c.precioRegular || '',
            precioConDescuento: c.precioConDescuento || ''
          }))
        }))
      }));
      setPlans(mapped);
    } catch (err) {
      console.error('Error al cargar precios:', err);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [locale]);

  const handleChange = (i, field, value) => {
    const updated = [...plans];
    updated[i][field] = value;
    setPlans(updated);
  };

  const handleImageChange = (i, file) => {
    const updated = [...plans];
    updated[i].imageFile = file;
    updated[i].imageUrl = URL.createObjectURL(file);
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
    setPlans(prev => [
      ...prev,
      {
        tituloDelPlan: '',
        descripcion: '',
        imageUrl: '',
        imageFile: null,
        typePlan: [],
      }
    ]);
  };

  const removePlan = async (index) => {
    const plan = plans[index];
    if (plan._id) {
      try {
        await deletePrice(plan._id);
        showAlert('Eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar plan:', error);
        showAlert('Error al eliminar', 'error');
        return;
      }
    }
    const updated = [...plans];
    updated.splice(index, 1);
    setPlans(updated);
  };

  const addTypePlan = (i) => {
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
      const form = new FormData();
      form.append('locale', locale);
      form.append('tituloDelPlan', plan.tituloDelPlan);
      form.append('descripcion', plan.descripcion);

      if (plan.imageFile instanceof File) {
        form.append('file', plan.imageFile);
      } else {
        form.append('imageUrl', plan.imageUrl);
      }


      // form.append('imageUrl', plan.imageUrl);
      form.append('typePlan', JSON.stringify(
        plan.typePlan.map(tp => ({
          type: tp.type,
          caracteristicas: tp.caracteristicas.map(c => ({
            caracteristica: c.caracteristica,
            precioRegular: Number(c.precioRegular),
            precioConDescuento: Number(c.precioConDescuento)
          }))
        }))
      ));

      try {
        if (plan._id) {
          await updatePrice(plan._id, form);
        } else {
          await createPrice(form);
        }
        showAlert('Guardado correctamente', 'success');
      } catch (error) {
        console.error('Error al guardar plan:', error);
        showAlert('Error al guardar', 'error');
        return;
      }
    }

    await fetchPrices();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Planes</h2>
        <Button onClick={save}>Guardar</Button>
      </div>

      <Button onClick={addPlan} variant="outline" size="sm">Agregar plan</Button>

      {plans.map((plan, i) => (
        <div key={i} className="border p-4 rounded space-y-3 bg-white dark:bg-gray-white text-gray-900 dark:text-gray-900">
          <Input label="Título" value={plan.tituloDelPlan} onChange={e => handleChange(i, 'tituloDelPlan', e.target.value)} />
          {/* <Input label="Imagen URL" value={plan.imageUrl} onChange={e => handleChange(i, 'imageUrl', e.target.value)} /> */}
          <input type="file" accept="image/*" onChange={e => handleImageChange(i, e.target.files[0])} />
          {plan.imageUrl && <img src={plan.imageUrl} alt="preview" className="w-40 h-40 object-cover rounded" />}
          <TextEditor value={plan.descripcion} setValue={val => handleChange(i, 'descripcion', val)} edit />

          <Button onClick={() => addTypePlan(i)} variant="outline" size="xs">Agregar tipo de plan</Button>

          {plan.typePlan.map((tp, j) => (
            <div key={j} className="border p-2 rounded bg-gray-50 dark:bg-gray-50">
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

          <Button onClick={() => removePlan(i)} variant="outline" size="xs">Eliminar plan</Button>
        </div>
      ))}
    </div>
  );
}

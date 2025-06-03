'use client'
import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

const MethodsEditor = () => {
  const { language } = useAppContext();
  const locale = language.toLowerCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET
  const fetchMethods = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/method-course?locale=${locale}`);
      const data = await res.json();
      const methods = data.map(item => ({
        _id: item._id,
        title: item[locale].titulo,
        description: item[locale].descripcion,
        icon: item[locale].typeIcon,
      }));
      setItems(methods);
    } catch (err) {
      console.error('Error fetching methods', err);
    }
  };

  // POST
  const createMethod = async (method) => {
    await fetch(`http://localhost:5000/api/method-course`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        titulo: method.title,
        descripcion: method.description,
        typeIcon: method.icon,
      }),
    });
  };

  // PATCH
  const updateMethod = async (id, method) => {
    await fetch(`http://localhost:5000/api/method-course/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        titulo: method.title,
        descripcion: method.description,
        typeIcon: method.icon,
      }),
    });
  };

  const handleSave = async () => {
    setLoading(true);
    for (const method of items) {
      if (method._id) {
        await updateMethod(method._id, method);
      } else {
        await createMethod(method);
      }
    }
    await fetchMethods(); // recargar después de guardar
    setLoading(false);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addMethod = () => {
    setItems(prev => [
      ...prev,
      {
        _id: null,
        title: 'Nuevo método',
        description: 'Descripción del nuevo método',
        icon: 'book',
      }
    ]);
  };

  const removeMethod = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const moveMethod = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setItems(updated);
  };

  useEffect(() => {
    fetchMethods();
  }, [language]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Métodos de Estudio</h2>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Métodos</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<Plus size={16} />}
          onClick={addMethod}
        >
          Añadir método
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((method, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex items-center justify-between py-3">
              <h4 className="text-md font-medium">{method.title}</h4>
              <div className="flex items-center space-x-2">
                <button onClick={() => moveMethod(index, 'up')} disabled={index === 0}>
                  <Move size={16} className="rotate-90" />
                </button>
                <button onClick={() => moveMethod(index, 'down')} disabled={index === items.length - 1}>
                  <Move size={16} className="-rotate-90" />
                </button>
                <button onClick={() => removeMethod(index)} className="text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Título"
                value={method.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                fullWidth
              />
              <Textarea
                label="Descripción"
                value={method.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                fullWidth
              />
              <Input
                label="Icono"
                value={method.icon}
                onChange={(e) => handleChange(index, 'icon', e.target.value)}
                fullWidth
              />
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No hay métodos. Haz clic en "Añadir método" para comenzar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MethodsEditor;

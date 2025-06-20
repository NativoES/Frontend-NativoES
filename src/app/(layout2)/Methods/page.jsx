'use client';
import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash, Move, Book, Pen, Star, Code2, Globe, Heart, User, Shield, Camera, CheckCircle, Compass, Eye, Flame, Cloud, Folder, Gift, Home, KeyRound, Leaf, Lock, Phone } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import {
  createMethodCourse,
  deleteMethodCourse,
  getMethodCourse,
  updateMethodCourse
} from '@/services/landing/landing.service';

const iconOptions = [
  { name: 'book', icon: <Book size={18} /> },
  { name: 'pen', icon: <Pen size={18} /> },
  { name: 'star', icon: <Star size={18} /> },
  { name: 'code', icon: <Code2 size={18} /> },
  { name: 'globe', icon: <Globe size={18} /> },
  { name: 'heart', icon: <Heart size={18} /> },
  { name: 'user', icon: <User size={18} /> },
  { name: 'shield', icon: <Shield size={18} /> },
  { name: 'camera', icon: <Camera size={18} /> },
  { name: 'check-circle', icon: <CheckCircle size={18} /> },
  { name: 'compass', icon: <Compass size={18} /> },
  { name: 'eye', icon: <Eye size={18} /> },
  { name: 'flame', icon: <Flame size={18} /> },
  { name: 'cloud', icon: <Cloud size={18} /> },
  { name: 'folder', icon: <Folder size={18} /> },
  { name: 'gift', icon: <Gift size={18} /> },
  { name: 'home', icon: <Home size={18} /> },
  { name: 'key-round', icon: <KeyRound size={18} /> },
  { name: 'leaf', icon: <Leaf size={18} /> },
  { name: 'lock', icon: <Lock size={18} /> },
  { name: 'phone', icon: <Phone size={18} /> }
];

const MethodsEditor = () => {
  const { language, showAlert } = useAppContext();
  const idioma = language.toLowerCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMethods = async (locale) => {
    try {
      const data = await getMethodCourse(locale);
      const methods = data.map(item => ({
        _id: item._id,
        title: item[idioma].titulo,
        description: item[idioma].descripcion,
        icon: item[idioma].typeIcon,
      }));
      setItems(methods);
    } catch (err) {
      console.error('Error fetching methods:', err);
    }
  };

  const createMethod = async (method) => {
    const data = {
      locale: idioma,
      titulo: method.title,
      descripcion: method.description,
      typeIcon: method.icon,
    };
    await createMethodCourse(data);
  };

  const updateMethod = async (id, method) => {
    const data = {
      locale: idioma,
      titulo: method.title,
      descripcion: method.description,
      typeIcon: method.icon,
    };
    await updateMethodCourse(id, data);
  };

  const handleSave = async () => {
    try {

      for (const method of items) {
        if (!method.title || !method.description || !method.icon) {
          alert('Por favor completa todos los campos antes de guardar.');
          return;
        }
        if (method._id) {
          await updateMethod(method._id, method);
        } else {
          await createMethod(method);
        }
      }
      showAlert('Guardado correctamente', 'success');
    } catch (error) {
      showAlert('Error al guardar', 'error');
    } finally {
      await fetchMethods(idioma);
    }
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

  const removeMethod = async (index, id) => {
    if (!id) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
      return;
    }
    try {
      await deleteMethodCourse(id);
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
      showAlert('Eliminado correctamente', 'success');
    } catch (err) {
      console.error('Error al eliminar método:', err);
      showAlert('Error al eliminar', 'error');
    }
  };

  const moveMethod = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setItems(updated);
  };

  useEffect(() => {
    fetchMethods(idioma);
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
        <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={addMethod}>
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
                <button onClick={() => removeMethod(index, method._id)} className="text-red-500 hover:text-red-700">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Ícono</label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white text-gray-900 dark:bg-white dark:text-gray-900"
                  value={method.icon}
                  onChange={(e) => handleChange(index, 'icon', e.target.value)}
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-sm flex items-center gap-2 bg-white dark:bg-white px-3 py-2 border rounded">
                  <span className="text-gray-600">Vista previa:</span>
                  {iconOptions.find((i) => i.name === method.icon)?.icon}
                  <span className="text-gray-800 font-medium">{method.icon}</span>
                </div>
              </div>
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

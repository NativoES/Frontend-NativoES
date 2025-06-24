'use client';

import React from 'react';
import { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Label from '@/templates/Labels';
import Button from '@/templates/Button';
import { ImageUp } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';

const formFields = [
  { name: 'nombreDeLaClase', label: 'Nombre de la clase', type: 'text' },
  { name: 'nivel', label: 'Nivel', type: 'text' },
  { name: 'idioma', label: 'Idioma', type: 'text' },
  { name: 'horario', label: 'Horario', type: 'text', placeholder: 'Ejemplo: Lunes, Miércoles, Viernes' },
];

export default function ClassForm({ formData, onChange, onSubmit }) {
  const [imagen, setImagen] = useState(null);
  const [file, setFile] = useState(null);
  const [selectValue, setSelectValue] = useState({});
  const { setSelect, setIsOpenModal, loader, setLoader } = useAppContext()

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoader('Guardando...');

      const data = new FormData();
      data.append("file", file);
      data.append("nombreClase", selectValue.nombreDeLaClase);
      // data.append("nivel", Number(selectValue.nivel));
      data.append("nivel", String(Number(selectValue.nivel)));
      data.append("idioma", selectValue.idioma);
      data.append("horario", selectValue.horario);
      data.append("descripcion", selectValue.descripcion);

      const response = await fetch(window?.location?.href?.includes('localhost')
        ? 'http://localhost:5001/api/classes'
        : '', {
        method: 'POST',
        body: data,
      });

      console.log('RESPONSE', response)

      if (!response.ok) {
        setLoader('');
        alert('Error de datos!');
        throw new Error('Registration failed');
      }
      alert('Cuenta creada!');
      setLoader('');
    } catch (error) {
      setLoader('');
      alert(error);
    }
  };

  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })
  }
  const handleImageUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo));
      setFile(archivo)
    }
  };

  console.log('selectValue', selectValue)

  return (
    <form onSubmit={handleCreate} className="space-y-4">

      <div className='flex flex-col items-center'>
        <label
          htmlFor='file-input' className="relative flex justify-center items-center flex-wrap  w-[120px] h-[120px] mb-6 border border-dashed border-gray-300 p-4 rounded-md">
          {!imagen && <ImageUp></ImageUp>}
          {!imagen && <span className='text-[12px]'>Cargar imagen</span>}
          {imagen && <img src={imagen} alt="Perfil" className="w-full h-full object-cover  mt-2  rounded-full" />}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-input"
        />
      </div>
      {formFields.map(({ name, label, type, placeholder }) => (
        <div key={name}>
          <Label className="text-gray-700">{label}</Label>
          <InputTemplate
            type={type}
            name={name}
            value={selectValue[name]}
            onChange={handlerOnChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
          />
        </div>
      ))}

      <div>
        <Label className="text-gray-700">Descripción</Label>
        <TextAreaTemplate
          id="descripcion"
          name="descripcion"
          value={selectValue.descripcion}
          onChange={handlerOnChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
        />
      </div>
      <Button type="submit" className="w-full">
        Crear clase
      </Button>
    </form>
  );
}
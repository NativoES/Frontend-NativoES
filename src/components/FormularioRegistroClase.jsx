'use client';
import React, { useState } from 'react';
import Button from '@/templates/Button';
import { ImageUp } from 'lucide-react';
import { useAppContext } from '@/contexts/Context';
import { ModalTemplate } from './templates/ModalTemplate';
import Label from '@/templates/Labels';
import InputTemplate from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import { createClass } from '@/services/exercises/clases.service';

const idiomas = ['Español', 'Inglés', 'Francés', 'Ruso'];

export const FormularioRegistroClase = () => {
  const { setIsOpenModal, loader, setLoader, showAlert, userDB } = useAppContext();
  const [imagen, setImagen] = useState(null);
  const [file, setFile] = useState(null);
  const [selectValue, setSelectValue] = useState({
    nombreDeLaClase: '',
    nivel: '',
    idioma: '',
    horario: '',
    descripcion: '',
    isPrivate: false,
  });
  
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoader('Guardando...');

      const data = new FormData();
      if (file) data.append('file', file);
      data.append('nombreClase', selectValue.nombreDeLaClase);
      data.append('nivel', selectValue.nivel);
      data.append('idioma', selectValue.idioma);
      data.append('horario', selectValue.horario);
      data.append('profesorId', userDB._id);
      data.append('descripcion', selectValue.descripcion);
      data.append('isPrivate', selectValue.isPrivate ? 'true' : 'false');

      await createClass(data);

      showAlert('Guardado correctamente', 'success');
      setLoader('');
      setIsOpenModal(false);
    } catch (error) {
      console.error(error);
      setLoader('');
      showAlert('Error al guardar', 'error');
    }
  };

  const handlerOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectValue({
      ...selectValue,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo));
      setFile(archivo);
    }
  };

  return (
    <ModalTemplate>
      <h2 className="text-lg text-gray-900 mb-6 p-3 text-center">Añadir Profesor</h2>
      <form onSubmit={handleCreate} className="space-y-4">

        {/* Imagen */}
        <div className="flex flex-col items-center m-4">
          <label
            htmlFor="file-input"
            className="relative flex justify-center items-center flex-wrap w-[100px] h-[100px] mb-6 border border-dashed border-gray-300 p-4 rounded-md"
          >
            {!imagen && <ImageUp />}
            {!imagen && <span className="text-[12px]">Cargar imagen</span>}
            {imagen && (
              <img
                src={imagen}
                alt="Perfil"
                className="w-full h-full object-cover mt-2 rounded-full"
              />
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="file-input"
          />
        </div>

        {/* Nombre */}
        <div>
          <Label className="text-gray-700">Nombre de la clase</Label>
          <InputTemplate
            type="text"
            name="nombreDeLaClase"
            value={selectValue.nombreDeLaClase}
            onChange={handlerOnChange}
            placeholder="Nombre de la clase"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Nivel e Idioma */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <Label className="text-gray-700">Nivel</Label>
            <InputTemplate
              type="text"
              name="nivel"
              value={selectValue.nivel}
              onChange={handlerOnChange}
              placeholder="Ej: A1, B2, etc."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <Label className="text-gray-700">Idioma</Label>
            <select
              name="idioma"
              value={selectValue.idioma}
              onChange={handlerOnChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Selecciona un idioma</option>
              {idiomas.map((idioma) => (
                <option key={idioma} value={idioma}>{idioma}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Horario */}
        <div>
          <Label className="text-gray-700">Horario</Label>
          <InputTemplate
            type="text"
            name="horario"
            value={selectValue.horario}
            onChange={handlerOnChange}
            placeholder="Ejemplo: Lunes, Miércoles, Viernes"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Descripción */}
        <div>
          <Label className="text-gray-700">Descripción</Label>
          <TextAreaTemplate
            id="descripcion"
            name="descripcion"
            value={selectValue.descripcion}
            onChange={handlerOnChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Switch isPrivate */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={selectValue.isPrivate}
            onChange={handlerOnChange}
            className="w-4 h-4"
          />
          <Label htmlFor="isPrivate" className="text-gray-700">
            Esta clase será privada
          </Label>
        </div>

        {/* Botón */}
        <Button type="submit" className="w-full">
          Crear clase
        </Button>
      </form>
    </ModalTemplate>
  );
};

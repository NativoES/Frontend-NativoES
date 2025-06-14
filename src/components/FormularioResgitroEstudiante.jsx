'use client';
import React, { useState } from 'react';
import Button from '@/templates/Button';
import { ImageUp } from 'lucide-react';
import InputFlotante from '@/components/InputFlotante';
import SelectSimple from '@/components/SelectSimple';
import { useAppContext} from '@/contexts/Context';
import { passwordGenerator } from '@/utils/passwordGenerator';
import { ModalTemplate } from './templates/ModalTemplate';

export default function FormularioRegistroEstudiante() {

  const { setSelect, setIsOpenModal, loader, setLoader } = useAppContext()
  const [imagen, setImagen] = useState(null);
  const [file, setFile] = useState(null);
  const [selectValue, setSelectValue] = useState({
    lenguaNativa: 'ingles',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoader('Guardando...');
      const password = passwordGenerator();
      console.log('password', password)
      const data = new FormData();
      data.append("file", file);
      data.append("nombreCompleto", selectValue.nombreDeEstudiante);
      data.append("telefono", selectValue.numeroDeCelular);
      data.append("email", selectValue.email);
      data.append("lenguaNativa", selectValue.lenguaNativa);
      data.append("password", password);

      const response = await fetch(window?.location?.href?.includes('localhost')
        ? 'http://localhost:5002/api/user'
        : '', {
        method: 'POST',
        body: data,
      });

      console.log('response', response)
      if (response.status === 400) {
        setLoader('');
        alert('El usuario ya existe!');
        throw new Error('Registration failed');
      }


      if (!response.ok) {
        setLoader('');
        alert('Error de datos!');
        throw new Error('Registration failed');
      }

      const result = await response.json();
      alert('Cuenta creada!');
      setLoader('');
      setIsOpenModal(false)
    } catch (error) {
      setLoader('');
      alert(error);
    }
  };

  const handleImageUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo));
      setFile(archivo)
    }
  };
  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })
  }
  function handlerClickSelect(name, i) {
    setSelectValue({ ...selectValue, [name]: i })
  }
  return (
    <ModalTemplate>
      <h2 className="text-lg text-gray-900 mb-6  p-3 text-center">Añadir Estudiante</h2>
      <form className='space-y-4'>
        <div className='flex flex-col items-center'>
          <label
            htmlFor='file-input' className="relative flex justify-center items-center flex-wrap  w-[120px] h-[120px] mb-6 border border-dashed border-gray-300 p-4 rounded-md">
            {!imagen && <ImageUp></ImageUp>}
            {!imagen && <span className='text-[12px]'>Cargar Perfil</span>}
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
        <InputFlotante
          type="text"
          name={'nombreDeEstudiante'}
          onChange={handlerOnChange}
          defaultValue={''}
          required
          label={'Nombre'} />
        <InputFlotante
          type="text"
          name={'numeroDeCelular'}
          onChange={handlerOnChange}
          defaultValue={''}
          required
          label={'Numero de celular'} />

        <InputFlotante
          type="email"
          name={'email'}
          onChange={handlerOnChange}
          defaultValue={''}
          required
          label={'Email'} />

        <SelectSimple
          arr={['Ingles', 'Español', 'Ruso']}
          defaultValue={selectValue.lenguaNativa}
          name='lenguaNativa'
          uuid='8768798'
          label='Lengua nativa'
          click={handlerClickSelect}
          required={true} />
        <div className="flex justify-end space-x-2 w-full">
          <Button
            variant="primary"
            className="bg-[#FEAB5F] w-full text-black"
            onClick={handleCreate}
          >
            Guardar
          </Button>
          {/* <Button
            variant="secondary"
            className="bg-gray-500 text-black"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button> */}
        </div>
      </form>
    </ModalTemplate>
  );
}
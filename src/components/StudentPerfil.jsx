
'use client'
import React, { useState } from 'react';

export default function PerfilEstudiante({ student }) {
  const [imagen, setImagen] = useState(null);

  const handleAgregarFoto = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo)); // Crear una URL para la imagen seleccionada
    }
  };

  const handleEditar = () => {
    console.log(`Editar perfil del estudiante con ID: ${student?._id}`);
  };

  const handleAgregarClase = () => {
    console.log(`Agregar clase al estudiante con ID: ${student?._id}`);
  };
  console.log(student)
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-md w-1/2 h-[70vh]">
        <div className='w-full flex items-start justify-between  mb-4'>

          <div className="flex flex-col justify-center  rounded-xlmb-4">
            {student.perfilIMG && <img src={student.perfilIMG} alt="Perfil" className=" w-[150px] h-[150px]  object-cover rounded-xl" />}

          </div>

          <div className="pl-4">
            <p className='text-[12px]'> <span className='font-semibold'>Estudiante ID: </span>{student?._id}</p>
            <p className='text-[12px]'> <span className='font-semibold'>Nombre:</span>{student?.nombreDeEstudiante}</p>
            <p className='text-[12px]'> <span className='font-semibold'>Celular:</span>{student?.numeroDeCelular}</p>
            <p className='text-[12px]'> <span className='font-semibold'>email:</span>{student?.email}</p>
            <p className='text-[12px]'> <span className='font-semibold'>Lengua nativa:</span>{student?.lenguaNativa}</p>
            <button
              className="bg-[#FEAB5F] hover:bg-gray-700 text-black font-bold py-1 px-2 rounded transition duration-300 mt-5"
              onClick={handleEditar}
            >
              Editar
            </button>
          </div>

        </div>

        <div className='flex flex-col items-center justify-center h-full'>
          <button
            className="relative left-0 right-0 mx-auto bg-[#FEAB5F] hover:bg-gray-700 text-black font-bold py-2 px-4 rounded transition duration-300"
            onClick={handleAgregarClase}
          >
            Agregar Clase
          </button>
        </div>

      </div>
    </div>
  );
}

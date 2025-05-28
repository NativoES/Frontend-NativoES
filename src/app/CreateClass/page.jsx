'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CardTemplate } from '@/templates/CardTemplate';
import ImageUpload from '@/app/CreateClass/Class/ImageUpload';
import ClassForm from '@/app/CreateClass/Class/ClassForm';
import ModalTemplate from '@/templates/ModalTemplate';

export default function CreateClassPage() {
  const router = useRouter();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    students: '',
    level: '',
    duration: '',
    language: '',
    schedule: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagenSeleccionada(URL.createObjectURL(archivo));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now().toString(),
      ...formData,
      students: parseInt(formData.students, 10),
      language: { name: formData.language },
      schedule: formData.schedule.split(',').map(day => day.trim()),
      image: imagenSeleccionada,
    };

    const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    localStorage.setItem('classes', JSON.stringify([...storedClasses, newClass]));
    router.push('/Classes');
  };

  return (
    <div className=" max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <div className="flex items-center mb-6">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer text-[#FEAB5F] mr-3"
        />
        <h2 className="text-xl font-semibold text-black">Crear nueva clase</h2>
      </div>

      <ModalTemplate className="bg-white shadow-md p-6">
        {/* <ImageUpload
          imagenSeleccionada={imagenSeleccionada}
          onImageSelect={handleImageSelect}
        /> */}
        <ClassForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </ModalTemplate>
    </div>
  );
}
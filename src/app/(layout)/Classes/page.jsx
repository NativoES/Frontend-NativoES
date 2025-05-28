'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ButtonTemplate } from '@/templates/ButtonTemplate';
import { CardTemplate } from '@/templates/CardTemplate';
import { SubtitleTemplate } from '@/templates/SubtittleTemplate';
import { ClassList } from '@/templates/ClassList';
import { languages } from '@/data/languages';
import Button from '@/templates/Button';
import LinkButton from '@/components/LinkButton';

const mockClasses = [
  {
    id: '1',
    name: 'English for Beginners',
    description: 'Introduction to English language basics',
    students: 15,
    language: languages[0],
    level: 'A1',
    schedule: [
      { day: 'Monday', time: '10:00' },
      { day: 'Wednesday', time: '10:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
];

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState(mockClasses);

  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses([...mockClasses, ...storedClasses]);
  }, []);

  const handleDelete = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
    console.log(`Clase con id ${id} eliminada`);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-end">
      {/* <SubtitleTemplate
        icon={<ArrowRight className="text-black bg-[#FEAB5F] rounded-full" />}
        title="Clases"
      /> */}
      <div className="max-w-4xl h-[85vh] overflow-y-auto w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Clases</h1>

        <LinkButton href="/CreateClass" className="mb-4 w-full flex justify-center">
            <Plus className="mr-2" />
            Crear nueva clase
        </LinkButton>

        <ClassList
          classes={classes}
          onNavigate={(path) => router.push(path)}
          onDelete={handleDelete}
        />
      </div>
    </div>

  );
}
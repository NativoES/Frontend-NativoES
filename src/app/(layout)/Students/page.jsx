'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import FormularioRegistroEstudiante from '@/components/FormularioResgitroEstudiante';
import PerfilEstudiante from '@/components/StudentPerfil';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';
import {
  useAppContext
} from '@/contexts/Context';
import { Paginator } from '@/components/Paginator';
import { getAllUsers } from '@/services/user/user.service';

export default function VistaEstudiante() {
  const { loader, setLoader, isOpenModal, setIsOpenModal } = useAppContext()

  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);



  const handleCreateStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStudentProfileClick = (studentId) => {
    router.push(`/Student/${studentId}`);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);

    if (students[index]?.id === activeStudentId) {
      setActiveStudentId(null);
    }
  };

  if (activeStudentId) {
    const activeStudent = students.find(student => student.id === activeStudentId);
    if (activeStudent) {
      return (
        <PerfilEstudiante
          studentId={activeStudent.id}
          studentData={activeStudent}
          onBack={() => setActiveStudentId(null)}
        />
      );
    }
  }


  const handlerFetch = async (limit, page) => {
    try {
      const result = await getAllUsers({ page: page, limit: limit, rol: 'ESTUDIANTE' });

      setStudents(result.data);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
      setTotalDocuments(result.total);
    } catch (error) {
      console.error("Error al cargar usuarios:", error.message);
    } finally {
      setLoader('');
    }
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    handlerFetch(itemsPerPage, currentPage);
  }, [loader, itemsPerPage, currentPage]);

  const handleReload = () => {
    handlerFetch(itemsPerPage, currentPage);
  };
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (activeStudentId) {
      localStorage.setItem('activeStudentId', activeStudentId);
    } else {
      localStorage.removeItem('activeStudentId');
    }
  }, [activeStudentId]);

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Estudiantes</h1>

        <div className="flex flex-col items-center mb-4">
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="primary"
            className="w-full"
          >
            + Create New Student
          </Button>
        </div>

        {isOpenModal && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <FormularioRegistroEstudiante onCreate={handleCreateStudent} onClose={handleCloseModal} />
          </div>
        )}

        <div className="flex flex-col items-center mb-4 w-full">
          <h2 className="text-lg text-gray-900 mb-2">Estudiantes registrados</h2>
          <ul className="list-none p-0 m-0 w-full">
            {students.map((student, index) => (
              <CardTemplate
                key={index}
                className="hover:shadow-sm transition-shadow duration-300 cursor-pointer hover:border-[#FEAB5F] mb-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  {student?.fotografia && (
                    <img
                      src={student?.fotografia}
                      alt="Perfil"
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg text-gray-900">{student?.nombreCompleto}</h3>
                    <p className="text-gray-600">{student?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStudentProfileClick(student._id)}
                    variant="primary"
                  >
                    Perfil Estudiante
                  </Button>
                  <Button
                    onClick={() => handleDeleteStudent(index)}
                    variant="danger"
                  >
                    <Trash className='stroke-white' size={18} />
                  </Button>
                </div>
              </CardTemplate>
            ))}
          </ul>
        </div>

        <div className="mt-2">
          <Paginator
            totalItems={totalDocuments}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onReload={handleReload}
          />
        </div>
      </div>
    </div>
  );
}

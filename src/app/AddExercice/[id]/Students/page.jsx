'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Trash } from 'lucide-react';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';
import { useAppContext } from '@/contexts/Context';
import { Paginator } from '@/components/Paginator';
import ModalInscribirEstudiante from '@/components/ModalInscribirEstudiante';

export default function VistaEstudiante() {
  const { loader, setLoader, isOpenModal, setIsOpenModal } = useAppContext();
  const { id: claseId } = useParams();
  const router = useRouter();

  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const handlerFetch = async (limit, page) => {
    const res = await fetch(
      `http://localhost:5002/api/enrollment/students?claseId=${claseId}&limit=${limit}&page=${page}`
    );
    const result = await res.json();
    setStudents(result.students);
    setTotalDocuments(result.total);
    setTotalPages(result.totalPages);
    setCurrentPage(result.page);
    setLoader('');
  };

  useEffect(() => {
    handlerFetch(itemsPerPage, currentPage);
  }, [loader, itemsPerPage, currentPage]);

  const handleItemsPerPageChange = (val) => {
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReload = () => {
    handlerFetch(itemsPerPage, currentPage);
  };

  const handleStudentProfileClick = (studentId) => {
    router.push(`/Student/${studentId}`);
  };

  const handleDeleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    if (students[index]?.id === activeStudentId) {
      setActiveStudentId(null);
    }
  };

  console.log("students: ", students)

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200 flex flex-col h-full">
        <h1 className="text-3xl text-center mb-6 text-gray-900">Estudiantes</h1>

        <div className="flex flex-col items-center mb-4">
          <Button onClick={() => setShowModal(true)} variant="primary" className="w-full">
            + Inscribir estudiante
          </Button>
        </div>

        {showModal && (
          <ModalInscribirEstudiante
            onClose={() => setShowModal(false)}
            onInscribir={handleReload}
            claseId={claseId}
          />
        )}

        <div className="flex-1 overflow-y-auto mb-4">
          <ul className="list-none p-0 m-0 w-full">
            {students?.map((student, index) => (
              <CardTemplate
                key={index}
                className="hover:shadow-sm transition-shadow duration-300 cursor-pointer hover:border-[#FEAB5F] mb-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  {student.fotografia && (
                    <img
                      src={student.fotografia}
                      alt="Perfil"
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg text-gray-900">{student.nombreCompleto}</h3>
                    <p className="text-gray-600">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleStudentProfileClick(student._id)} variant="primary">
                    Perfil Estudiante
                  </Button>
                  <Button onClick={() => handleDeleteStudent(index)} variant="danger">
                    <Trash className="stroke-white" size={18} />
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



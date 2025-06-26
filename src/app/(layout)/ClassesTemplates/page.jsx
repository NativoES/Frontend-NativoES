'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClassList } from '@/templates/ClassList';
import { useAppContext } from '@/contexts/Context';
import { Paginator } from '@/components/Paginator';
import { createClass, getClasses } from '@/services/exercises/clases.service';
import ModalTemplate from '@/templates/ModalTemplate';

export default function ClassTemplatesPage() {
  const { loader, userDB, showAlert } = useAppContext();
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const [selectedClass, setSelectedClass] = useState(null);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);

  const handlerFetch = async (limit, page) => {
    const finalLimit = limit || 5;
    const finalPage = page || 1;
    const result = await getClasses({ page: finalPage, limit: finalLimit, publico: true });
    setClasses(result.data);
    setCurrentPage(result.page);
    setTotalPages(result.totalPages);
    setTotalDocuments(result.total);
  };

  useEffect(() => {
    handlerFetch(itemsPerPage, currentPage);
  }, [loader, itemsPerPage, currentPage]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (val) => {
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReload = () => handlerFetch(itemsPerPage, currentPage);

  const handleCloneClick = (clase) => {
    setSelectedClass(clase);
    setIsCloneModalOpen(true);
  };

  const handleConfirmClone = async () => {
    if (!selectedClass || !userDB) return;

    try {
      const clonedPayload = {
        nombreClase: `${selectedClass.nombreClase} (Copia)`,
        idioma: selectedClass.idioma,
        horario: selectedClass.horario,
        isPrivate: true,
        profesorId: userDB._id,
        nivel: selectedClass.nivel,
        descripcion: selectedClass.descripcion,
        imagen: selectedClass.imagen,
      };

      await createClass(clonedPayload);

      setIsCloneModalOpen(false);
      setSelectedClass(null);

      showAlert('Guardado correctamente', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Error al guardar', 'error');
    }
  };

  const handleCancelClone = () => {
    setIsCloneModalOpen(false);
  }


  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Clases públicas</h1>

        <div className="flex flex-col items-center mb-4 w-full">
          <ul className="list-none p-0 m-0 w-full">
            <ClassList
              classes={classes}
              onNavigate={(path) => router.push(path)}
              onDelete={handleDelete}
              onClone={handleCloneClick}
              cloneButton={true}
            />
          </ul>
        </div>

        <Paginator
          totalItems={totalDocuments}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onReload={handleReload}
        />
      </div>

      {isCloneModalOpen && (
        <ModalTemplate onClose={handleCancelClone}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">¿Deseas clonar esta clase?</h2>
            <p className="mb-6 text-gray-700">
              Se creará una copia de <strong>{selectedClass?.nombreDeLaClase}</strong> y se asociará a tu cuenta.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelClone}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmClone}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clonar clase
              </button>
            </div>
          </div>
        </ModalTemplate>
      )}
    </div>
  );
}

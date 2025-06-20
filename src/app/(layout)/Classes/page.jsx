'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ClassList } from '@/templates/ClassList';
import { languages } from '@/data/languages';
import Button from '@/templates/Button';
import LinkButton from '@/components/LinkButton';
import { useAppContext } from '@/contexts/Context';
import { Paginator } from '@/components/Paginator';


export default function ClassesPage() {
  const { loader } = useAppContext();
  const router = useRouter();
  const [classes, setClasses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

  async function handlerFetch(limit, page) {

    const defaultLimit = 5;
    const defaultPage = 1;

    const finalLimit = limit || defaultLimit;
    const finalPage = page || defaultPage;

    const res = await fetch(
      window?.location?.href?.includes("localhost")
        ? `http://localhost:5001/api/classes?limit=${finalLimit}&page=${finalPage}`
        : ``
    );

    const result = await res.json();
    console.log("resultadoo: ", result);

    setClasses(result.data);
    setCurrentPage(result.page);
    setTotalPages(result.totalPages);
    setTotalDocuments(result.total);
  }

  useEffect(() => {
    handlerFetch(itemsPerPage, currentPage);
  }, [loader, itemsPerPage, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
    console.log(`Clase con id ${id} eliminada`);
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleReload = () => {
    handlerFetch(itemsPerPage, currentPage);
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Clases</h1>

        <div className="flex flex-col items-center mb-4">
          {/* <Button
              onClick={() => setIsOpenModal(true)}
              variant="primary"
              className="w-full"
            >
              + Create New Teacher
            </Button> */}

          <LinkButton href="/CreateClass" className="mb-4 w-full flex justify-center">
            <Plus className="mr-2" />
            Crear nueva clase
          </LinkButton>
        </div>

        {/* {isOpenModal && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <FormularioRegistroProfesor onCreate={handleCreateStudent} onClose={handleCloseModal} />
          </div>
        )} */}

        <div className="flex flex-col items-center mb-4 w-full">
          <h2 className="text-lg text-gray-900 mb-2">Clases registrados</h2>
          <ul className="list-none p-0 m-0 w-full">
            <ClassList
              classes={classes}
              onNavigate={(path) => router.push(path)}
              onDelete={handleDelete}
            />
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
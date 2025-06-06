import React, { useState, useEffect } from 'react';

import { ClassCreateCard } from '@/components/ClassCreateCard';
import { useAppContext
 } from '@/contexts/Context';

export const ClassList = ({  onNavigate, onDelete }) => {
  const { select, setSelect, setNavItem, loader, setLoader, isOpenModal, setIsOpenModal } = useAppContext()
  const [classes, setClasses] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);



  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  async function handlerFetch(limit, page) {

    const defaultLimit = 5; // Valor predeterminado para limit
    const defaultPage = 1; // Valor predeterminado para page

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

    // setCurrentPage(result.currentPage);
    // setTotalPages(result.totalPages);
    // setTotalDocuments(result.totalDocuments);
    // setLoader('');
  }
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

console.log('classes', classes)

  return (
    <ul className="space-y-4">
      {classes?.map((classItem) => (
        <li key={classItem._id}>
          <ClassCreateCard
            classItem={classItem}
            onClick={() => onNavigate(`/AddExercice/${classItem._id}`)}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );

} 
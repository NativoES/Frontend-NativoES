'use client';
import { useState, useEffect } from 'react';
import React, { use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PerfilEstudiante from '@/components/StudentPerfil';

export default function StudentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [student, setStudent] = useState(null);

console.log('params', params)
  async function handlerFetch(limit, page) {

    const defaultLimit = 1; // Valor predeterminado para limit
    const defaultPage = 1; // Valor predeterminado para page

    const finalLimit = limit || defaultLimit;
    const finalPage = page || defaultPage;

    const res = await fetch(
      window?.location?.href?.includes("localhost")
        ? `http://localhost:4000/api/auth/users?limit=${finalLimit}&page=${finalPage}&_id=${id}`
        : ``
    );

    const result = await res.json();
    console.log("resultadoo: ", result);

    setStudent(result.data[0]);
    setLoader("");
  }

  console.log('student', student)

  useEffect(() => {
    handlerFetch(1, 1);
  } , []);
  return (
    student && <PerfilEstudiante
      student={student}
    />
  );
}

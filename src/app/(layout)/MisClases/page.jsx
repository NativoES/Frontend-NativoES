'use client';

import React, { useEffect, useState } from 'react';
import { getClasesByStudent } from '@/services/user/user.service';
import { StudentClassesList } from './components/StudentClassesList';
import { useAppContext } from '@/contexts/Context';

export default function MisClasesPage() {
  const { userDB } = useAppContext();
  const [clases, setClases] = useState([]);;

  useEffect(() => {
    if (!userDB) return;

    async function fetchClases() {
      // console.log("userDB", userDB);
      // console.log("userDB._id", userDB?._id);

      const result = await getClasesByStudent(userDB._id);
      setClases(result.clases || []);
    }

    fetchClases();
  }, [userDB]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis clases</h1>
      <StudentClassesList clases={clases} />
    </div>
  );
}

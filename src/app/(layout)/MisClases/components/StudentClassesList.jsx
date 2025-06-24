import React from 'react';
import { StudentClassCard } from './StudentClassCard';

export const StudentClassesList = ({ clases }) => {
  if (!clases?.length) {
    return <p className="text-center text-gray-500">No estás inscrito en ninguna clase aún.</p>;
  }

  return (
    <div className="space-y-4">
      {clases.map((clase) => (
        <StudentClassCard key={clase._id} clase={clase} />
      ))}
    </div>
  );
};

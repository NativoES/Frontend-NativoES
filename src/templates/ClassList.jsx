import React from 'react';

import { ClassCreateCard } from '@/components/ClassCreateCard';

export const ClassList = ({ onNavigate, onDelete, onClone, classes }) => {
  return (
    <ul className="space-y-4">
      {classes?.map((classItem) => (
        <li key={classItem._id}>
          <ClassCreateCard
            classItem={classItem}
            onClick={() => onNavigate(`/AddExercice/${classItem._id}`)}
            onDelete={onDelete}
            onClone={onClone}
          />
        </li>
      ))}
    </ul>
  );
};

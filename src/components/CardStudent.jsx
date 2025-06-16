import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/utils/utils';
import Label from '@/templates/Labels';
import { CardTemplate } from '@/templates/CardTemplate';

export function CardStudent({ class: classItem, className, onClick }) {
  return (
    <CardTemplate
      className={cn(
        "bg-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer shadow-xl",
        className
      )}
    >
      <div className="flex items-start justify-between" onClick={onClick}>
        {classItem.image && (
          <img
            src={classItem.image}
            alt={`${classItem.name} thumbnail`}
            className="w-16 h-16 rounded-md object-cover mr-4"
          />
        )}

        <div>
          <Label className="text-lg font-semibold text-black">{classItem.name}</Label>
          <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{classItem.students} students</span>
        </div>
      </div>
    </CardTemplate>
  );
}

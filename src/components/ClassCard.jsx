import React from 'react';
import { Users, Globe2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Label from '@/templates/Labels';
import  {CardTemplate} from '@/templates/CardTemplate'

export function ClassCard({ classItem, className, onClick }) {
  return (
    <CardTemplate
      className={cn(
        "bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer shadow-xl",
        className
      )}
    >
      <div className="flex items-start justify-between" onClick={onClick}>
        <div>
          <Label className="text-lg font-semibold text-black mb-2">{classItem.name}</Label>
          <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Administrar
        </span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <InfoItem icon={Globe2} text={classItem.language?.name || 'No language specified'} />
        <InfoItem icon={Users} text={`${classItem.students} profesores`} />
        <InfoItem icon={Calendar} text={`${classItem.schedule?.length || 0} sessions/week`} />
      </div>
    </CardTemplate>
  );
}

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center">
    <Icon className="h-4 w-4 mr-1" />
    <span>{text}</span>
  </div>
);
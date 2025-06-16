import React from 'react';
import { FileText, Users, Globe2 } from 'lucide-react';
import { cn } from '@/utils/utils';



export function TemplateCard({ template, className, onClick }) {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg  p-6 hover:shadow-md transition-shadow cursor-pointer shadow-xl",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">{template.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{template.description}</p>
        </div>
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-xs font-medium",
          template.type === 'vocabulary' && "bg-emerald-100 text-emerald-800",
          template.type === 'grammar' && "bg-blue-100 text-blue-800",
          template.type === 'conversation' && "bg-purple-100 text-purple-800",
          template.type === 'reading' && "bg-amber-100 text-amber-800",
          template.type === 'listening' && "bg-indigo-100 text-orange-500",
          template.type === 'writing' && "bg-rose-100 text-rose-800"
        )}>
          {template.type}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Globe2 className="h-4 w-4 mr-1" />
          <span>{template.language.name}</span>
        </div>
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          <span>{template.activities.length} activities</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>Level {template.level}</span>
        </div>
      </div>
    </div>
  );
}
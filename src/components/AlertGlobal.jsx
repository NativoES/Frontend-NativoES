'use client';
import React from 'react';
import { useAppContext } from '@/contexts/Context';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const iconMap = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
  warning: <AlertTriangle className="text-yellow-500" size={20} />,
  info: <CheckCircle className="text-blue-500" size={20} />,
};

const bgMap = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
};

export default function AlertGlobal() {
  const { alert, hideAlert } = useAppContext();

  if (!alert.visible) return null;

  return (
    <div className={`fixed top-5 right-5 z-50 border-l-4 px-4 py-3 rounded shadow-lg transition-all duration-300 ${bgMap[alert.type]}`}>
      <div className="flex items-center gap-3">
        {iconMap[alert.type]}
        <span className="font-medium">{alert.message}</span>
        <button onClick={hideAlert} className="ml-2 text-sm text-gray-600 hover:text-black">✕</button>
      </div>
    </div>
  );
}

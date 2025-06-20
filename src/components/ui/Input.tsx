import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export function Input({ 
  icon: Icon,
  error,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        className={`
          block w-full rounded-md border border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
          sm:text-sm py-2 pr-3 bg-white hover:border-gray-400 transition-colors
          ${Icon ? 'pl-10' : 'pl-3'}
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
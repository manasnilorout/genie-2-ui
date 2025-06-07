import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  error?: string;
}

export function Dropdown({ 
  options,
  error,
  className = '',
  ...props 
}: DropdownProps) {
  return (
    <div className="relative">
      <select
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm
          appearance-none pr-10
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
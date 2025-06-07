import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  className?: string;
  error?: string;
}

export function Dropdown({ 
  options,
  value,
  onChange,
  className = '',
  error
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`
          relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          hover:border-gray-400 transition-colors duration-200
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate text-sm font-medium text-gray-900">
          {selectedOption?.label || 'Select...'}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown 
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100
                ${value === option.value ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
              `}
              onClick={() => handleOptionClick(option.value)}
            >
              <span className={`block truncate text-sm ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                {option.label}
              </span>
              {value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
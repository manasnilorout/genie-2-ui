import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  icon?: LucideIcon;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

interface PlaceholderMatch {
  text: string;
  placeholder: string;
  start: number;
  end: number;
}

interface PlaceholderDialogProps {
  isOpen: boolean;
  placeholder: string;
  currentValue: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

function PlaceholderDialog({ isOpen, placeholder, currentValue, onSave, onClose, position }: PlaceholderDialogProps) {
  const [inputValue, setInputValue] = useState(currentValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute bg-white rounded-lg shadow-lg p-4 min-w-80"
        style={{
          left: Math.min(position.x, window.innerWidth - 320),
          top: Math.min(position.y, window.innerHeight - 200),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edit placeholder: <span className="text-blue-600 font-mono">{`{{${placeholder}}}`}</span>
          </label>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex gap-2 mt-3">
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PlaceholderInput({ 
  icon: Icon,
  error,
  className = '',
  value,
  onChange,
  ...props 
}: PlaceholderInputProps) {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    placeholder: string;
    currentValue: string;
    position: { x: number; y: number };
    matchIndex: number;
  }>({
    isOpen: false,
    placeholder: '',
    currentValue: '',
    position: { x: 0, y: 0 },
    matchIndex: -1,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Find all placeholder matches in the text
  const findPlaceholders = (text: string): PlaceholderMatch[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches: PlaceholderMatch[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      matches.push({
        text: match[0],
        placeholder: match[1],
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    return matches;
  };

  const placeholders = findPlaceholders(value);

  // Handle placeholder click
  const handlePlaceholderClick = (e: React.MouseEvent, matchIndex: number) => {
    e.preventDefault();
    const match = placeholders[matchIndex];
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    
    setDialogState({
      isOpen: true,
      placeholder: match.placeholder,
      currentValue: match.placeholder,
      position: { x: rect.left, y: rect.bottom + 5 },
      matchIndex,
    });
  };

  // Handle saving new placeholder value
  const handleSavePlaceholder = (newValue: string) => {
    if (dialogState.matchIndex >= 0) {
      const match = placeholders[dialogState.matchIndex];
      const newText = value.substring(0, match.start) + 
                     newValue + 
                     value.substring(match.end);
      onChange(newText);
    }
    
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  // Render text with clickable placeholders
  const renderTextWithPlaceholders = () => {
    if (placeholders.length === 0) {
      return value;
    }

    const parts = [];
    let lastIndex = 0;

    placeholders.forEach((match, index) => {
      // Add text before placeholder
      if (match.start > lastIndex) {
        parts.push(value.substring(lastIndex, match.start));
      }

      // Add clickable placeholder
      parts.push(
        <span
          key={index}
          className="text-blue-600 bg-blue-50 px-1 rounded cursor-pointer hover:bg-blue-100 font-medium"
          onClick={(e) => handlePlaceholderClick(e, index)}
          title={`Click to edit placeholder: ${match.placeholder}`}
        >
          {match.text}
        </span>
      );

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < value.length) {
      parts.push(value.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={inputRef}
          className={`
            block w-full rounded-md border border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
            sm:text-sm py-2 pr-3 bg-white hover:border-gray-400 transition-colors
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${placeholders.length > 0 ? 'text-transparent' : ''}
            ${className}
          `}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        
        {placeholders.length > 0 && (
          <div 
            className={`absolute inset-0 pointer-events-none flex items-center ${Icon ? 'pl-10' : 'pl-3'} pr-3`}
          >
            <div className="pointer-events-auto whitespace-nowrap overflow-x-auto overflow-y-hidden w-full">
              {renderTextWithPlaceholders()}
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <PlaceholderDialog
        isOpen={dialogState.isOpen}
        placeholder={dialogState.placeholder}
        currentValue={dialogState.currentValue}
        onSave={handleSavePlaceholder}
        onClose={() => setDialogState(prev => ({ ...prev, isOpen: false }))}
        position={dialogState.position}
      />
    </div>
  );
}
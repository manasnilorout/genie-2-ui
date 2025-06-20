import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function CollapsibleSection({ 
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle
}: CollapsibleSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newValue = !isOpen;
    if (isControlled && onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsOpen(newValue);
    }
  };

  return (
    <div className="border-t border-gray-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900"
        onClick={handleToggle}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}
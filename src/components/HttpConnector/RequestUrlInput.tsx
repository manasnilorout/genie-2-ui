import React from 'react';
import { PlaceholderInput } from '../ui/PlaceholderInput';
import { Globe } from 'lucide-react';

interface RequestUrlInputProps {
  value: string;
  onChange: (url: string) => void;
}

export function RequestUrlInput({ value, onChange }: RequestUrlInputProps) {
  return (
    <div className="space-y-1">
      <PlaceholderInput
        icon={Globe}
        placeholder="https://example.com/path"
        value={value}
        onChange={onChange}
      />
      <p className="text-sm text-gray-500">
        Write the full path (https://example.com/path)
      </p>
    </div>
  );
}
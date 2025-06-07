import React from 'react';
import { Input } from '../ui/Input';
import { Globe } from 'lucide-react';

interface RequestUrlInputProps {
  value: string;
  onChange: (url: string) => void;
}

export function RequestUrlInput({ value, onChange }: RequestUrlInputProps) {
  return (
    <div className="space-y-1">
      <Input
        icon={Globe}
        placeholder="https://example.com/path"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-sm text-gray-500">
        Write the full path (https://example.com/path)
      </p>
    </div>
  );
}
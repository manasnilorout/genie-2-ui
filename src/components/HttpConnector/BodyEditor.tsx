import React from 'react';

interface BodyEditorProps {
  value: string;
  onChange: (body: string) => void;
}

export function BodyEditor({ value, onChange }: BodyEditorProps) {
  return (
    <div className="space-y-1">
      <textarea
        className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Request body"
      />
    </div>
  );
}
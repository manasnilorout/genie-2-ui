import React from 'react';
import { Dropdown } from '../ui/Dropdown';

const HTTP_METHODS = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PATCH', value: 'PATCH' },
];

interface MethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
  return (
    <Dropdown
      options={HTTP_METHODS}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-28"
    />
  );
}
import React from 'react';
import { Dropdown } from '../ui/Dropdown';

const CONNECTIONS = [
  { label: 'pipedrive_connection', value: 'pipedrive_connection' },
];

interface ConnectionDropdownProps {
  value: string;
  onChange: (connection: string) => void;
}

export function ConnectionDropdown({ value, onChange }: ConnectionDropdownProps) {
  return (
    <Dropdown
      options={CONNECTIONS}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
}
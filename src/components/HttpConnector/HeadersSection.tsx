import React from 'react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { KeyValueEditor } from './KeyValueEditor';
import { KeyValuePair } from '../../types';

interface HeadersSectionProps {
  headers: KeyValuePair[];
  onChange: (headers: KeyValuePair[]) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function HeadersSection({ headers, onChange, isOpen, onToggle }: HeadersSectionProps) {
  return (
    <CollapsibleSection 
      title="Headers" 
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <KeyValueEditor
        pairs={headers}
        onChange={onChange}
        addButtonText="Add header"
      />
    </CollapsibleSection>
  );
}
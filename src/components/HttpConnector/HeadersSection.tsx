import React from 'react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { KeyValueEditor } from './KeyValueEditor';
import { KeyValuePair } from '../../types';

interface HeadersSectionProps {
  headers: KeyValuePair[];
  onChange: (headers: KeyValuePair[]) => void;
}

export function HeadersSection({ headers, onChange }: HeadersSectionProps) {
  return (
    <CollapsibleSection title="Headers">
      <KeyValueEditor
        pairs={headers}
        onChange={onChange}
        addButtonText="Add header"
      />
    </CollapsibleSection>
  );
}
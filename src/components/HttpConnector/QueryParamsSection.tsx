import React from 'react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { KeyValueEditor } from './KeyValueEditor';
import { KeyValuePair } from '../../types';

interface QueryParamsSectionProps {
  params: KeyValuePair[];
  onChange: (params: KeyValuePair[]) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function QueryParamsSection({ params, onChange, isOpen, onToggle }: QueryParamsSectionProps) {
  return (
    <CollapsibleSection 
      title="Query parameters"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <KeyValueEditor
        pairs={params}
        onChange={onChange}
        addButtonText="Add parameter"
      />
    </CollapsibleSection>
  );
}
import React from 'react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { KeyValueEditor } from './KeyValueEditor';
import { KeyValuePair } from '../../types';

interface QueryParamsSectionProps {
  params: KeyValuePair[];
  onChange: (params: KeyValuePair[]) => void;
}

export function QueryParamsSection({ params, onChange }: QueryParamsSectionProps) {
  return (
    <CollapsibleSection title="Query parameters">
      <KeyValueEditor
        pairs={params}
        onChange={onChange}
        addButtonText="Add parameter"
      />
    </CollapsibleSection>
  );
}
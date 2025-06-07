import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { PlaceholderInput } from '../ui/PlaceholderInput';
import { KeyValuePair } from '../../types';

interface KeyValueEditorProps {
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  addButtonText?: string;
}

export function KeyValueEditor({
  pairs,
  onChange,
  addButtonText = 'Add'
}: KeyValueEditorProps) {
  const handleAdd = () => {
    onChange([...pairs, { key: '', value: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: 'key' | 'value', value: string) => {
    const newPairs = [...pairs];
    newPairs[index] = { ...newPairs[index], [field]: value };
    onChange(newPairs);
  };

  return (
    <div className="space-y-2">
      {pairs.map((pair, index) => (
        <div key={index} className="flex gap-2">
          <PlaceholderInput
            placeholder="Key"
            value={pair.key}
            onChange={(value) => handleChange(index, 'key', value)}
            className="flex-1"
          />
          <PlaceholderInput
            placeholder="Value"
            value={pair.value}
            onChange={(value) => handleChange(index, 'value', value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            onClick={() => handleRemove(index)}
            icon={Trash2}
            aria-label="Remove"
          />
        </div>
      ))}
      <Button
        variant="secondary"
        onClick={handleAdd}
        icon={Plus}
        className="w-full"
      >
        {addButtonText}
      </Button>
    </div>
  );
}
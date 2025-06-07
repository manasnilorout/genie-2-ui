import React, { useState, useEffect } from 'react';
import { PlaceholderEditor } from '../ui/PlaceholderEditor';

interface BodyEditorProps {
  value: string;
  onChange: (body: string) => void;
}

export function BodyEditor({ value, onChange }: BodyEditorProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isJsonValid, setIsJsonValid] = useState(false);

  // Function to check if content is valid JSON and format it
  const formatContent = (content: string) => {
    if (!content.trim()) {
      return content;
    }

    try {
      // Try to parse as JSON
      const parsed = JSON.parse(content);
      setIsJsonValid(true);
      // Return formatted JSON with 2-space indentation
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      // If not valid JSON, keep as-is (could be XML or other format)
      setIsJsonValid(false);
      return content;
    }
  };

  // Update display value when input value changes
  useEffect(() => {
    const formatted = formatContent(value);
    setDisplayValue(formatted);
  }, [value]);

  const handleChange = (newValue: string) => {
    setDisplayValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-1">
      {isJsonValid && (
        <div className="text-xs text-green-600 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          JSON (auto-formatted)
        </div>
      )}
      <PlaceholderEditor
        value={displayValue}
        onChange={handleChange}
        placeholder="Request body (JSON will be auto-formatted)"
        rows={8}
        className="h-32"
      />
    </div>
  );
}
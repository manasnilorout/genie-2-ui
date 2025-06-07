import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { MethodSelector } from './MethodSelector';
import { RequestUrlInput } from './RequestUrlInput';
import { HeadersSection } from './HeadersSection';
import { QueryParamsSection } from './QueryParamsSection';
import { BodyEditor } from './BodyEditor';
import { Button } from '../ui/Button';
import type { HttpRequest, KeyValuePair } from '../../types';

export function HttpConnector() {
  const [request, setRequest] = useState<HttpRequest>({
    method: 'POST',
    url: '',
    headers: {},
    queryParams: {},
    body: ''
  });

  const [headers, setHeaders] = useState<KeyValuePair[]>([]);
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([]);

  const handleSubmit = () => {
    // TODO: Implement request submission
    console.log('Submitting request:', request);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Connector</h2>
        <Button variant="ghost" icon={Settings} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Method
          </label>
          <div className="flex gap-2">
            <MethodSelector
              value={request.method}
              onChange={(method) => setRequest({ ...request, method })}
            />
            <RequestUrlInput
              value={request.url}
              onChange={(url) => setRequest({ ...request, url })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <BodyEditor
            value={request.body || ''}
            onChange={(body) => setRequest({ ...request, body })}
          />
        </div>

        <HeadersSection
          headers={headers}
          onChange={setHeaders}
        />

        <QueryParamsSection
          params={queryParams}
          onChange={setQueryParams}
        />

        <Button
          className="w-full"
          onClick={handleSubmit}
        >
          Send Request
        </Button>
      </div>
    </div>
  );
}
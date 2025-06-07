import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { MethodSelector } from './MethodSelector';
import { RequestUrlInput } from './RequestUrlInput';
import { HeadersSection } from './HeadersSection';
import { QueryParamsSection } from './QueryParamsSection';
import { BodyEditor } from './BodyEditor';
import { Button } from '../ui/Button';
import type { HttpRequest, KeyValuePair } from '../../types';

interface HttpConnectorProps {
  initialConfig?: Partial<HttpRequest>;
}

export function HttpConnector({ initialConfig }: HttpConnectorProps) {
  const [request, setRequest] = useState<HttpRequest>({
    method: 'POST',
    url: '',
    headers: {},
    queryParams: {},
    body: ''
  });

  const [headers, setHeaders] = useState<KeyValuePair[]>([]);
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([]);
  
  // State for controlling section expansion
  const [isHeadersOpen, setIsHeadersOpen] = useState(false);
  const [isQueryParamsOpen, setIsQueryParamsOpen] = useState(false);
  
  // State for highlighting retrieved values
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setRequest(prev => ({
        ...prev,
        ...initialConfig
      }));

      if (initialConfig.headers) {
        const headerPairs = Object.entries(initialConfig.headers).map(([key, value]) => ({
          key,
          value
        }));
        setHeaders(headerPairs);
      }

      if (initialConfig.queryParams) {
        const queryPairs = Object.entries(initialConfig.queryParams).map(([key, value]) => ({
          key,
          value
        }));
        setQueryParams(queryPairs);
      }

      // Auto-expand sections if they have values and highlight the components
      if (initialConfig.headers && Object.keys(initialConfig.headers).length > 0) {
        setIsHeadersOpen(true);
      }
      
      if (initialConfig.queryParams && Object.keys(initialConfig.queryParams).length > 0) {
        setIsQueryParamsOpen(true);
      }

      // Enable highlighting when values are retrieved
      if (initialConfig.method || initialConfig.url || 
          (initialConfig.headers && Object.keys(initialConfig.headers).length > 0) ||
          (initialConfig.queryParams && Object.keys(initialConfig.queryParams).length > 0)) {
        setIsHighlighted(true);
      }
    }
  }, [initialConfig]);

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
          <div className={`flex gap-2 ${isHighlighted ? 'ring-2 ring-blue-500 ring-opacity-50 rounded-md p-2 bg-blue-50' : ''}`}>
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
          isOpen={isHeadersOpen}
          onToggle={setIsHeadersOpen}
        />

        <QueryParamsSection
          params={queryParams}
          onChange={setQueryParams}
          isOpen={isQueryParamsOpen}
          onToggle={setIsQueryParamsOpen}
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
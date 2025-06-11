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
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: string | Record<string, unknown>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Convert headers and queryParams arrays to objects
      const headersObj = headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const queryParamsObj = queryParams.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      // Build URL with query parameters
      const url = new URL(request.url);
      Object.entries(queryParamsObj).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      // Prepare request options
      const options: RequestInit = {
        method: request.method,
        headers: headersObj,
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(request.method) && request.body) {
        options.body = request.body;
      }

      // Make the request
      const response = await fetch(url.toString(), options);
      
      // Get response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Parse response data
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while making the request');
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {response && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  response.status >= 200 && response.status < 300
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {response.status} {response.statusText}
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Response Headers:</h3>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(response.headers, null, 2)}
                </pre>
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-medium text-gray-700">Response Body:</h3>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {typeof response.data === 'string'
                    ? response.data
                    : JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
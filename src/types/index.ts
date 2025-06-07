export interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body?: string;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIParseResponse {
  success: boolean;
  message: string;
  timestamp: string;
  input: string;
  intent: {
    vendor: string;
    action: string;
    parameters: Array<{
      key: string;
      value: string;
    }>;
    confidence: number;
  };
  schema: {
    actionName: string;
    actionType: string;
    baseUrl: string;
    actionUrl: string;
    actionHeaders: Array<{
      key: string;
      value: string;
    }>;
    actionQueryParams?: Array<{
      key: string;
      value: string;
    }>;
    actionBody: Record<string, unknown>;
    actionBodyType: string;
    authConfig: {
      type: string;
      config: Array<{
        key: string;
        value: string;
      }>;
    };
    confidence: number;
  };
}
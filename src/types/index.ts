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
  citations?: Array<string>;
  role: 'user' | 'assistant' | 'thinking';
  timestamp: Date;
  isThinking?: boolean;
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
    actionBody?: {
      actionBody?: Record<string, unknown>;
      actionQueryParams?: Array<{
        key: string;
        value: string;
      }>;
    };
    actionBodyType: string;
    authConfig: {
      type: string;
      config: Array<{
        key: string;
        value: string;
      }>;
    };
    citations: Array<string>;
    confidence: number;
  };
}
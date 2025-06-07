import { useState } from 'react';
import { ChatMessage, AIParseResponse } from '../types';

export const useChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseIntent = async (prompt: string): Promise<AIParseResponse | null> => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3030/api/v1/http/schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AIParseResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error parsing intent:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, onConfigUpdate?: (config: Record<string, unknown>) => void) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const parseResult = await parseIntent(content);
      
      if (parseResult && parseResult.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `I've parsed your request for "${parseResult.intent.action}" with ${parseResult.intent.vendor}. Would you like me to populate the HTTP connector with these details?`,
          role: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        if (onConfigUpdate) {
          const httpConfig = {
            method: parseResult.schema.actionType,
            url: parseResult.schema.baseUrl + parseResult.schema.actionUrl,
            headers: parseResult.schema.actionHeaders.reduce((acc, header) => {
              acc[header.key] = header.value;
              return acc;
            }, {} as Record<string, string>),
            body: JSON.stringify(parseResult.schema.actionBody?.actionBody || {}),
            queryParams: parseResult.schema.actionBody?.actionQueryParams?.reduce((acc, param) => {
              acc[param.key] = param.value;
              return acc;
            }, {} as Record<string, string>),
          };
          onConfigUpdate(httpConfig);
        }
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "I couldn't parse your request. Please try rephrasing it or provide more specific details about the API you want to call.",
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    parseIntent,
  };
};
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { ChatMessage, AIParseResponse } from '../types';

export const useChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef<any>(null);
  const currentThinkingIdRef = useRef<string | null>(null);

  // Initialize websocket connection
  useEffect(() => {
    socketRef.current = io('ws://localhost:3030', {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to websocket');
    });

    socketRef.current.on('log', (data: {
      timestamp: string;
      level: string;
      message: string;
      context?: string;
      promptLength?: number;
      requestId?: string;
      method?: string;
      url?: string;
      userAgent?: string;
      ip?: string;
    }) => {
      // Only show relevant log messages (info level and above, with meaningful context)
      if (data.level === 'info' || data.level === 'warn' || data.level === 'error' || data.level === 'debug') {
        const thinkingId = 'thinking-current';
        currentThinkingIdRef.current = thinkingId;

        // Create a readable message from the log data
        let displayMessage = data.message;
        if (data.context) {
          displayMessage = `[${data.context}] ${data.message}`;
        }

        setMessages(prev => {
          // Remove previous thinking message if it exists
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          
          // Add new thinking message
          const thinkingMessage: ChatMessage = {
            id: thinkingId,
            content: displayMessage,
            role: 'thinking',
            timestamp: new Date(data.timestamp),
            isThinking: true,
          };

          return [...filteredMessages, thinkingMessage];
        });
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from websocket');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const parseIntent = async (prompt: string): Promise<AIParseResponse | null> => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3030/api/v1/http/perplexity/schema', {
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

        // Remove thinking message and add assistant response
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, assistantMessage];
        });
        currentThinkingIdRef.current = null;

        if (onConfigUpdate) {
          const httpConfig = {
            method: parseResult.schema.actionType,
            url: parseResult.schema.baseUrl + parseResult.schema.actionUrl,
            headers: parseResult.schema.actionHeaders.reduce((acc, header) => {
              acc[header.key] = header.value;
              return acc;
            }, {} as Record<string, string>),
            body: JSON.stringify(parseResult.schema.actionBody || {}),
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
        // Remove thinking message and add error response
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, errorMessage];
        });
        currentThinkingIdRef.current = null;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      // Remove thinking message and add error response
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => !msg.isThinking);
        return [...filteredMessages, errorMessage];
      });
      currentThinkingIdRef.current = null;
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    parseIntent,
  };
};
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isThinking = message.role === 'thinking';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] rounded-lg px-4 py-2
          ${isUser 
            ? 'bg-blue-600 text-white' 
            : isThinking 
              ? 'bg-yellow-50 text-yellow-800 border border-yellow-200 animate-pulse break-words whitespace-pre-wrap' 
              : 'bg-gray-100 text-gray-900'
          }
        `}
      >
        {isThinking && (
          <div className="flex items-center gap-2 mb-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs font-medium">Agent thinking...</span>
          </div>
        )}
        <div className="break-words whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
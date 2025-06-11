import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isThinking = message.role === 'thinking';

  const isUrl = (text: string) => {
    try {
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
      return urlPattern.test(text);
    } catch {
      return false;
    }
  };

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
        {isThinking && message.content && (
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
        {message.citations && message.citations.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-500 mb-1">Citations:</div>
            <div className="space-y-1">
              {message.citations.map((citation, index) => (
                isUrl(citation) ? (
                  <a
                    key={index}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-blue-600 hover:text-blue-800 hover:underline truncate"
                  >
                    {citation}
                  </a>
                ) : (
                  <div
                    key={index}
                    className="block text-xs text-gray-600"
                  >
                    {citation}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
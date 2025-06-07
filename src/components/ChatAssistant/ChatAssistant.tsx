import React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatAssistant } from '../../hooks/useChatAssistant';

interface ChatAssistantProps {
  onConfigUpdate?: (config: Record<string, unknown>) => void;
}

export function ChatAssistant({ onConfigUpdate }: ChatAssistantProps) {
  const { messages, sendMessage, isLoading } = useChatAssistant();

  const handleSend = (content: string) => {
    sendMessage(content, onConfigUpdate);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
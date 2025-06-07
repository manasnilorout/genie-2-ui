import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '../../types';

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const handleSend = (content: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    // TODO: Implement chat assistant response
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
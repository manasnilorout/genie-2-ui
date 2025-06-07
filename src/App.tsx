import React from 'react';
import { HttpConnector } from './components/HttpConnector/HttpConnector';
import { ChatAssistant } from './components/ChatAssistant/ChatAssistant';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <HttpConnector />
          </div>
          <div className="w-96 bg-white rounded-lg shadow-sm">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
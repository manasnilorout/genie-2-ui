import { useState } from 'react';
import { HttpConnector } from './components/HttpConnector/HttpConnector';
import { ChatAssistant } from './components/ChatAssistant/ChatAssistant';
import type { HttpRequest } from './types';

function App() {
  const [httpConfig, setHttpConfig] = useState<Partial<HttpRequest>>({});

  const handleConfigUpdate = (config: Partial<HttpRequest>) => {
    setHttpConfig(config);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <HttpConnector initialConfig={httpConfig} />
          </div>
          <div className="w-96 bg-white rounded-lg shadow-sm">
            <ChatAssistant onConfigUpdate={handleConfigUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
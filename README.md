# HTTP Connector UI

A modern React-based HTTP client with an integrated chat assistant for testing and interacting with APIs. Built with TypeScript, Vite, and Tailwind CSS.

## Features

### HTTP Connector
- **HTTP Request Builder**: Comprehensive interface for constructing HTTP requests
- **Method Selection**: Support for common HTTP methods (GET, POST, PUT, DELETE, etc.)
- **URL Input**: Clean input field for entering request URLs
- **Headers Management**: Dynamic key-value editor for custom headers
- **Query Parameters**: Easy-to-use interface for adding URL query parameters
- **Request Body Editor**: Text area for JSON payloads and request bodies
- **One-Click Send**: Submit requests with a single button click

### Chat Assistant
- **Interactive Chat Interface**: Side-by-side chat panel for assistance
- **Message History**: Persistent conversation tracking
- **User-Friendly Input**: Clean message input with send functionality
- **Timestamp Tracking**: Messages include timestamp information

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/
│   ├── HttpConnector/          # HTTP request building components
│   │   ├── HttpConnector.tsx   # Main connector component
│   │   ├── MethodSelector.tsx  # HTTP method dropdown
│   │   ├── RequestUrlInput.tsx # URL input field
│   │   ├── HeadersSection.tsx  # Headers key-value editor
│   │   ├── QueryParamsSection.tsx # Query params editor
│   │   └── BodyEditor.tsx      # Request body editor
│   ├── ChatAssistant/          # Chat interface components
│   │   ├── ChatAssistant.tsx   # Main chat component
│   │   ├── ChatMessage.tsx     # Individual message display
│   │   └── ChatInput.tsx       # Message input component
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Dropdown.tsx
│       └── CollapsibleSection.tsx
├── hooks/                      # Custom React hooks
│   ├── useHttpRequest.ts       # HTTP request logic
│   └── useChatAssistant.ts     # Chat functionality
├── types/                      # TypeScript type definitions
│   └── index.ts               # Shared interfaces
└── utils/                      # Utility functions
    └── httpUtils.ts           # HTTP-related helpers
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd http_connector_ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Making HTTP Requests**:
   - Select your HTTP method from the dropdown
   - Enter the target URL
   - Add any required headers using the Headers section
   - Configure query parameters if needed
   - Add request body content for POST/PUT requests
   - Click "Send Request" to execute

2. **Using the Chat Assistant**:
   - Type messages in the chat input field
   - Press Enter or click Send to submit
   - View conversation history in the chat panel

## Development Status

This project is currently in development. Some features are marked as TODO:
- HTTP request submission implementation
- Chat assistant response logic
- Response display and formatting
- Request history and saving

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
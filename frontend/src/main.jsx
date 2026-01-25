import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingProvider } from "./LoadingContext";
import { ErrorProvider } from './ErrorContext.jsx';
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './SocketProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <ErrorProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ErrorProvider>
    </SocketProvider>
  </StrictMode>,
)

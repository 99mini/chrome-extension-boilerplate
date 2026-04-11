import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import mock from './mock';

import './index.css';

mock();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

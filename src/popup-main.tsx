import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import mock from './mock';
import { PopupApp } from './popup/popup-app';

mock();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>
);

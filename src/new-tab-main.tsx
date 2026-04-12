import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NewTabApp } from './new-tab/new-tab-app';
import mock from './shared/mock';

mock();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <NewTabApp />
  </StrictMode>
);

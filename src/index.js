import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  modifyStore,
  FinalProvider,
} from './features/providers/masterProvider';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <FinalProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </FinalProvider>
);

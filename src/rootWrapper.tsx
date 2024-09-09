import './global.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './sentry2';
import { sentryCreateBrowserRouter } from './sentry2';

export const renderAsReactRoot = () => {
    const rootElement = document.getElementById('root');
    createRoot(rootElement!).render(<App createRouter={sentryCreateBrowserRouter} />);
};

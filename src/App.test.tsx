import React from 'react';
import { createRoot } from 'react-dom/client';
import { it } from 'vitest';

import App from './App';
import { createMemoryRouter } from 'react-router';

it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    root.render(<App createRouter={createMemoryRouter} />);
    root.unmount();
});

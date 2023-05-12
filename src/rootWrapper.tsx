import '@navikt/ds-css';

import './tailwind.css';

import { Modal } from '@navikt/ds-react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

export const renderAsReactRoot = (fnr?: string) => {
    const rootElement = document.getElementById('root');
    Modal.setAppElement(rootElement);
    createRoot(rootElement!).render(<App fnr={fnr} key={'1'} />);
};

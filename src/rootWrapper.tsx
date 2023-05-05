import '@navikt/ds-css';

import './tailwind.css';

import { Modal } from '@navikt/ds-react';
import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

export const renderAsReactRoot = (fnr?: string) => {
    const rootElement = document.getElementById('root');
    Modal.setAppElement(rootElement);
    ReactDOM.render(<App fnr={fnr} key={'1'} />, rootElement as HTMLElement);
};

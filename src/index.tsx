import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import DemoBanner from './mock/demo/DemoBanner';
import NAVSPA from '@navikt/navspa';

if (process.env.REACT_APP_MOCK === 'true') {
    require('./mock');

    const elem = document.createElement('div');
    document.body.append(elem);
    ReactDOM.render(<DemoBanner />, elem);
}

NAVSPA.eksporter('arbeidsrettet-dialog', App);

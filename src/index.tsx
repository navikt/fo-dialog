import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import DemoBanner from './mock/demo/DemoBanner';
import NAVSPA from '@navikt/navspa';
import { erEksternBruker } from './mock/demo/sessionstorage';
import NavFrontendModal from 'nav-frontend-modal';

const modalAlly = document.getElementById('modal-a11y-wrapper');
const root = document.getElementById('root');

NavFrontendModal.setAppElement(modalAlly ? document.getElementById('modal-a11y-wrapper') : root);

if (process.env.REACT_APP_MOCK === 'true') {
    require('./mock');

    const elem = document.createElement('div');
    document.body.append(elem);
    ReactDOM.render(<DemoBanner />, elem);

    const fnr = erEksternBruker() ? undefined : '12345678901';
    const AppWrapper = () => <App fnr={fnr} />;

    NAVSPA.eksporter('arbeidsrettet-dialog', AppWrapper);
} else {
    NAVSPA.eksporter('arbeidsrettet-dialog', App);
}

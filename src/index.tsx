import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import DemoBanner from './mock/demo/DemoBanner';
import NAVSPA from '@navikt/navspa';
import { erEksternBruker } from './mock/demo/sessionstorage';

document.body.addEventListener('keydown', function(e: KeyboardEvent) {
    if (!(e.key === 'Enter' && (e.metaKey || e.ctrlKey))) return;

    const target: EventTarget & HTMLTextAreaElement | null = e.target as EventTarget & HTMLTextAreaElement | null;
    if (target && target.form) {
        target.form.dispatchEvent(new Event('submit'));
    }
});

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

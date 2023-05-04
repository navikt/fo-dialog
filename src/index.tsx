import './polyfill';

import { Modal } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
// This is to size the window correctly
// import throttle from 'lodash.throttle';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { USE_MOCK } from './constants';
import { initAmplitude } from './metrics/amplitude-utils';
import DemoBanner from './mock/demo/DemoBanner';
import { erEksternBruker } from './mock/demo/localstorage';
import { gotoStartTestPage } from './mock/Utils';

// let vh = window.innerHeight * 0.01;
// // Then we set the value in the --vh custom property to the root of the document
// document.documentElement.style.setProperty('--vh', `${vh}px`);
//
// // We listen to the resize event
// window.addEventListener(
//     'resize',
//     throttle(() => {
//         // We execute the same script as before
//         document.documentElement.style.setProperty('--vh', `${vh}px`);
//     }, 100)
// );

const AppWebComponent = ({ fnr }: { fnr: string }) => {
    return React.createElement('dab-dialog', {
        // eslint-disable-next-line
        ['data-fnr']: fnr
    });
};

const exportToNavSpa = () => {
    NAVSPA.eksporter('arbeidsrettet-dialog', AppWebComponent);
    // Denne må lazy importeres fordi den laster inn all css selv inn under sin egen shadow-root
    import('./webcomponentWrapper').then(({ Dialog }) => {
        customElements.define('dab-dialog', Dialog);
    });
};

const renderAsRootApp = (fnr?: string) => {
    const rootElement = document.getElementById('root');
    Modal.setAppElement(rootElement);
    ReactDOM.render(<App fnr={fnr} key={'1'} />, rootElement as HTMLElement);
};

const renderApp = (fnr?: string) => {
    if (['dev-intern', 'prod-intern'].includes(import.meta.env.MODE)) {
        exportToNavSpa();
    } else {
        renderAsRootApp(fnr);
    }
};

if (USE_MOCK) {
    const fnr = erEksternBruker() ? undefined : '12345678901';
    gotoStartTestPage(fnr);

    import('./mock')
        .then(({ default: startWorker }) => startWorker())
        .then(() => {
            const elem = document.createElement('div');
            document.body.appendChild(elem);
            ReactDOM.render(<DemoBanner />, elem);
            renderApp(fnr);
        });
} else {
    initAmplitude();
    renderApp();
}

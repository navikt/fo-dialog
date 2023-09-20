import './polyfill';

import { USE_MOCK } from './constants';
import { initAmplitude } from './metrics/amplitude-utils';
import { erEksternBruker } from './mock/demo/localstorage';
import { gotoStartTestPage } from './mock/Utils';

const exportToNavSpa = () => {
    // Denne må lazy importeres fordi den laster inn all css selv inn under sin egen shadow-root
    import('./webcomponentWrapper').then(({ DabDialog }) => {
        customElements.define('dab-dialog', DabDialog);
    });
};

const renderAsRootApp = (fnr?: string) => {
    import('./rootWrapper').then(({ renderAsReactRoot }) => {
        renderAsReactRoot(fnr);
    });
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
    if (fnr) {
        // const webComponentTag = document.createElement('dab-dialog');
        // webComponentTag.setAttribute('data-fnr', fnr);
        // document.getElementById('root')?.appendChild(webComponentTag);
    }
    gotoStartTestPage(fnr);

    import('./mock').then(({ default: startWorker }) => startWorker()).then(() => renderApp(fnr));
} else {
    initAmplitude();
    renderApp();
}

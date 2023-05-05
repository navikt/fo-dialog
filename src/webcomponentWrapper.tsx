import dsStyles from '@navikt/ds-css/dist/index.css?inline';
import { Modal, Provider as ModalProvider } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
import { React17Adapter } from '@navikt/navspa-react-17-adapter';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppWebComponent from './AppWebComponent';
import tailwindCss from './tailwind.css?inline';

export class DabDialog extends HTMLElement {
    setFnr?: (fnr: string) => void;
    connectedCallback() {
        // Cant mount on shadowRoot, create a extra div for mounting modal
        const shadowDomFirstChild = document.createElement('div');
        // This will be app entry point, need to be outside modal-mount node
        const appRoot = document.createElement('div');
        appRoot.id = 'dialog-root';
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(shadowDomFirstChild);
        shadowDomFirstChild.appendChild(appRoot);

        // Load styles under this shadowDom-node, not root element
        const styleElem = document.createElement('style');
        styleElem.innerHTML = dsStyles + tailwindCss;
        shadowRoot.appendChild(styleElem);

        const fnr = this.getAttribute('data-fnr') ?? undefined;

        console.log('getattribute fnr', fnr);

        ReactDOM.render(
            <ModalProvider appElement={appRoot} rootElement={shadowDomFirstChild}>
                <App key={'1'} fnr={fnr} />
            </ModalProvider>,
            appRoot
        );

        // Mount modal under correct root-node
        Modal.setAppElement(appRoot);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'data-fnr' && this.setFnr) {
            this.setFnr(newValue);
        }
    }
    static get observedAttributes() {
        return ['data-fnr'];
    }
}

NAVSPA.setAdapter(new React17Adapter());
NAVSPA.eksporter('arbeidsrettet-dialog', AppWebComponent);

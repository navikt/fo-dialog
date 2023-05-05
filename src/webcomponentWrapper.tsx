import dsStyles from '@navikt/ds-css/dist/index.css?inline';
import { Modal, Provider as ModalProvider } from '@navikt/ds-react';
import navspa from '@navikt/navspa';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

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

        const root = createRoot(appRoot);
        root.render(
            <ModalProvider appElement={appRoot} rootElement={shadowDomFirstChild}>
                <App key={'1'} fnr={fnr} />
            </ModalProvider>
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
export const NAVSPA = navspa;
export const WebComponentRoot = AppWebComponent;

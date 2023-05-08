import dsStyles from '@navikt/ds-css/dist/index.css?inline';
import { Modal, Provider as ModalProvider } from '@navikt/ds-react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
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

        try {
            const root = createRoot(appRoot);
            console.log(appRoot);
            root.render(
                <ModalProvider appElement={appRoot} rootElement={shadowDomFirstChild}>
                    <App key={'1'} fnr={fnr} />
                </ModalProvider>
            );

            // Mount modal under correct root-node
            Modal.setAppElement(appRoot);
        } catch (e) {
            console.error(e);
        }
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

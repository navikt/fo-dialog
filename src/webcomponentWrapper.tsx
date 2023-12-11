import { Provider as ModalProvider } from '@navikt/ds-react';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import App from './App';
import globalCss from './global.css?inline';
import dialogOversiktStyles from './view/dialogliste/DialogPreview.module.css?inline';
import { AppState } from './view/Provider';
import { getPreloadedStateFromSessionStorage, settFnrILocalstorage } from './utils/appStateUtil';

export class DabDialog extends HTMLElement {
    setFnr?: (fnr: string) => void;
    root: Root | undefined;

    disconnectedCallback() {
        this.root?.unmount();
    }
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
        styleElem.innerHTML = globalCss + dialogOversiktStyles;
        shadowRoot.appendChild(styleElem);

        const fnr = this.getAttribute('data-fnr') ?? undefined;
        let initialState: AppState | undefined = undefined;
        if (fnr) {
            settFnrILocalstorage(fnr);
            initialState = getPreloadedStateFromSessionStorage(fnr);
        }
        try {
            this.root = createRoot(appRoot);
            this.root.render(
                <ModalProvider rootElement={shadowDomFirstChild}>
                    <App initialState={initialState} key={'1'} fnr={fnr} />
                </ModalProvider>
            );
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

import { setupWorker } from 'msw';
import React from 'react';
import { createRoot } from 'react-dom/client';

import DemoBanner from './demo/DemoBanner';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

export default () =>
    worker
        .start({
            serviceWorker: {
                url: `${import.meta.env.BASE_URL}mockServiceWorker.js`
            },
            onUnhandledRequest: (req, print) => {
                const hostBlacklist = ['amplitude.nav.no', 'nav.psplugin.com'];
                const ignoredFileExtensions = ['.ts', '.js', '.tsx', '.jsx', 'css', 'svg', 'png', '.less'];

                const ignore =
                    hostBlacklist.some((route) => req.url.host.includes(route)) ||
                    ignoredFileExtensions.some((fileExtension) => req.url.pathname.endsWith(fileExtension));

                if (ignore) {
                    return;
                }

                print.warning();
            }
        })
        .then(() => {
            const elem = document.createElement('div');
            document.body.appendChild(elem);
            createRoot(elem).render(<DemoBanner />);
        });

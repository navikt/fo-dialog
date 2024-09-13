import { setupServer } from 'msw/node';
import { createRoot } from 'react-dom/client';

import { handlers } from './handlers';
import { opprettDialogEtterRender } from './Dialog';

const server = setupServer(...handlers);
opprettDialogEtterRender();

export default () =>
    server.listen({
        onUnhandledRequest: (req, print) => {
            const hostBlacklist = ['amplitude.nav.no', 'nav.psplugin.com'];
            const ignoredFileExtensions = ['.ts', '.js', '.tsx', '.jsx', 'css', 'svg', 'png', '.less'];

            const ignore =
                hostBlacklist.some((route) => req.url.includes(route)) ||
                ignoredFileExtensions.some((fileExtension) => req.url.split('?')[0].endsWith(fileExtension));

            if (ignore) {
                return;
            }

            print.warning();
        }
    });
// .then(() => {
// const elem = document.createElement('div');
// document.body.appendChild(elem);
// createRoot(elem).render(<DemoBanner />);
// });

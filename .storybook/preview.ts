import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mock/handlers';

// Initialize MSW
initialize();

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        },
        msw: {
            handlers: [handlers]
        }
    },
    loaders: [mswLoader]
    // loaders: []
};

export default preview;

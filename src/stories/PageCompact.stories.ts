import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { rest } from 'msw';
import { FeatureToggle } from '../featureToggle/const';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Example/Page',
    component: Page,
    decorators: [withRouter],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        msw: {
            handlers: {
                featureToggle: [
                    rest.get('/veilarbaktivitet/api/feature', (_, res, ctx) =>
                        res(ctx.json({ [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP]: true }))
                    )
                ]
            }
        }
    }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const CompactMode: Story = {
    argTypes: {
        visAktivitet: {
            name: 'Vis aktivitet',
            options: [false, true],
            type: 'boolean'
        }
    }
};

export const Landing: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {
                path: '/'
            }
        })
    }
};

export const DialogMedAktivitet: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {
                path: '/303'
            }
        })
    }
};

export const DialogUtenAktivitet: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {
                path: '/2'
            }
        })
    }
};

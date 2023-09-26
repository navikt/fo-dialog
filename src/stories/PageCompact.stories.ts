import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { rest } from 'msw';
import { FeatureToggle } from '../featureToggle/const';

const meta = {
    title: 'Example/Page',
    component: Page,
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
    },
    args: {}
};

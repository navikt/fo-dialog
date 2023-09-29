import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { rest } from 'msw';
import { FeatureToggle } from '../featureToggle/const';
import bruker, { eksternbruker } from '../mock/Bruker';

const meta = {
    title: 'App/Default',
    component: Page,
    parameters: {
        chromatic: { delay: 500 },
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        msw: {
            handlers: {
                brukerMock: [
                    rest.get('/veilarboppfolging/api/oppfolging/me', (_, res, ctx) => res(ctx.json(eksternbruker)))
                ]
            }
        }
    }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Landing: Story = {
    args: {
        path: '/',
        erVeileder: false
    }
};

export const DialogMedAktivitet: Story = {
    args: {
        path: '/303',
        erVeileder: false
    }
};

export const DialogUtenAktivitet: Story = {
    args: {
        path: '/2',
        erVeileder: false
    }
};

export const Historisk: Story = {
    args: {
        path: '100',
        erVeileder: false
    }
};

export const NyDialog: Story = {
    args: {
        path: '/ny',
        erVeileder: false
    }
};

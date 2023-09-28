import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { rest } from 'msw';
import { FeatureToggle } from '../featureToggle/const';

const meta = {
    title: 'App/Compact',
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
    },
    args: {
        path: '/'
    },
    argTypes: {
        visAktivitet: {
            name: 'Vis aktivitet',
            options: [false, true],
            type: 'boolean'
        }
    }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// export const CompactMode: Story = {};

export const Landing: Story = {
    args: {
        path: '/',
        erVeileder: true
    }
};

export const MedAktivitetVisAktivitet: Story = {
    args: {
        visAktivitet: true,
        path: '/10',
        erVeileder: true
    }
};

export const MedAktivitetIkkeVisAktivitet: Story = {
    args: {
        visAktivitet: false,
        path: '/10',
        erVeileder: true
    }
};

export const DialogUtenAktivitet: Story = {
    args: {
        path: '/2',
        erVeileder: true
    }
};

export const HistoriskVisAktivitet: Story = {
    args: {
        visAktivitet: true,
        path: '100',
        erVeileder: true
    }
};
export const HistoriskIkkeVisAktivitet: Story = {
    args: {
        visAktivitet: false,
        path: '100',
        erVeileder: true
    }
};

export const NyDialog: Story = {
    args: {
        path: '/ny',
        erVeileder: true
    }
};

import { SimpleRouterWithoutProvider } from './integrationTestSetup';
import DialogOversikt from '../view/dialogliste/DialogOversikt';
import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { gitt } from './mockUtils';
import { afterAll, beforeAll, describe, expect } from 'vitest';

const MemoryRouterMedBareDialogOversikt = () => (
    <SimpleRouterWithoutProvider initialEntries={['/2']}>
        <DialogOversikt />
    </SimpleRouterWithoutProvider>
);

const rootLoaderData = {
    dialoger: Promise.resolve([])
};

describe('Dialog-liste Etiketter', () => {
    beforeAll(() => {
        vi.mock('../routing/loaders', () => ({ useRootLoaderData: () => rootLoaderData }));
    });
    afterAll(() => {
        vi.clearAllMocks();
    });

    describe('For brukere:', () => {
        it('Skal vise venter på svar fra bruker etikett', async () => {
            gitt.bruker().som.harDialogSomVenterPåBruker().som.harBrukerUnderOppfolging();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            waitFor(() => getByText('Venter på svar fra deg'));
        });
        it('Skal IKKE vise venter på svar fra nav etikett', async () => {
            gitt.bruker().som.harDialogSomIkkeErFerdigBehandlet().som.harBrukerUnderOppfolging();
            const { queryByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            expect(queryByText('Venter på svar fra NAV')).not.toBeInTheDocument();
        });
    });

    describe('For veiledere:', () => {
        it('Skal vise venter på svar fra bruker etikett', async () => {
            gitt.bruker().som.harDialogSomVenterPåBruker().som.harBrukerUnderOppfolging();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            waitFor(() => getByText('Venter på svar fra deg'));
        });
        it('Skal IKKE vise venter på svar fra nav etikett', async () => {
            gitt.bruker().som.harDialogSomIkkeErFerdigBehandlet().som.harBrukerUnderOppfolging();
            const { queryByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            expect(queryByText('Venter på svar fra NAV')).not.toBeInTheDocument();
        });
    });
});

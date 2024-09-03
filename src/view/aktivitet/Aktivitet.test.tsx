import { beforeAll, describe, expect } from 'vitest';
import { gitt } from '../../test/mockUtils';
import { behandlingAktivitet, ijobbAktivitet, moteAktivitet } from '../../mock/Aktivitet';
import { SimpleRouterWithoutProvider } from '../../test/integrationTestSetup';
import React from 'react';
import { DialogHeader } from '../dialog/DialogHeader';
import { DialogTrad } from '../dialog/DialogTrad';
import { Aktivitetskort } from './Aktivitetskort';
import { act, render } from '@testing-library/react';

const MemoryRouterMedBareDialogTråd = () => (
    <SimpleRouterWithoutProvider initialEntries={['/2']}>
        <>
            <DialogHeader />
            <div className="flex min-h-0 flex-1">
                <DialogTrad />
                <Aktivitetskort />
            </div>
        </>
    </SimpleRouterWithoutProvider>
);
const rootLoaderData = {
    dialoger: Promise.resolve([]),
    aktiviteter: Promise.resolve([])
};
describe('aktivteter', () => {
    beforeAll(() => {
        vi.mock('../../routing/loaders', () => ({ useRootLoaderData: () => rootLoaderData }));
    });

    it('skal vise behandling', async () => {
        gitt.bruker().som.harDialogMedAktivitet(behandlingAktivitet);
        const { getAllByText } = await act(() => render(<MemoryRouterMedBareDialogTråd />));
        expect(getAllByText('Avtale hos kiropraktor')).toHaveLength(2);
        expect(getAllByText('doktor')).toHaveLength(2);
    });

    it('skal vise ijobbAktivitet', async () => {
        gitt.bruker().som.harDialogMedAktivitet(ijobbAktivitet);
        const { getAllByText } = await act(() => render(<MemoryRouterMedBareDialogTråd />));
        getAllByText('Gode arbeidsforhold');
        getAllByText('DELTID');
        getAllByText('arbeidstid midt på dagen');
    });

    it('skal vise møteaktivitet', async () => {
        gitt.bruker().som.harDialogMedAktivitet(moteAktivitet);
        const { getAllByText } = await act(() => render(<MemoryRouterMedBareDialogTråd />));
        getAllByText(moteAktivitet.beskrivelse!!);
        getAllByText(moteAktivitet.tittel!!);
        // getAllByText(moteAktivitet.tilDato!!);
    });
});

import { act, render, waitFor } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { DialogTrad } from '../view/dialog/DialogTrad';
import DialogListe from '../view/dialogliste/DialogListe';
import DialogOversikt from '../view/dialogliste/DialogOversikt';
import { RouteIds } from '../routing/routes';
import { afterAll, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import { dialoger, gitt } from './mockUtils';

const singleComponentRouter = (component: ReactElement, initialEntries: string[] | undefined = undefined) =>
    createMemoryRouter(
        [
            {
                id: RouteIds.Root,
                path: '*',
                element: component,
                children: [
                    {
                        id: RouteIds.Dialog,
                        path: ':dialogId',
                        element: component
                    }
                ]
            }
        ],
        { initialEntries }
    );
const memoryRouterMedDialogListe = singleComponentRouter(<DialogListe />);
const memoryRouterMedDialogTrad = singleComponentRouter(<DialogTrad />, ['/1']);
const memoryRouterMedDialogOversikt = singleComponentRouter(<DialogOversikt />);
const MemoryRouterMedBareDialogListe = () => <RouterProvider router={memoryRouterMedDialogListe} />;
const MemoryRouterMedBareDialogTrad = () => <RouterProvider router={memoryRouterMedDialogTrad} />;
const MemoryRouterMedBareDialogOversikt = () => <RouterProvider router={memoryRouterMedDialogOversikt} />;

const rootLoaderData = {
    dialoger: Promise.resolve([])
};

describe('<DialogContainer/>', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    test('Bruker uten oppf.perioder og ikke under oppf skjuler store deler av appen', async () => {
        gitt.veileder().som.harIngenDialog().som.harBrukerIkkeUnderOppfolging();
        const { queryByText, getByRole } = render(<MemoryRouterMedBareDialogListe />);
        expect(queryByText('Ny dialog')).toBeNull();
        expect(getByRole('navigation').children.length).toBe(0);
    });
    test('Bruker ikke under oppf. skjuler knapper/checkbox', () => {
        gitt.veileder().som.harDialog().som.harBrukerIkkeUnderOppfolging();
        const { queryByText, getByRole } = render(<MemoryRouterMedBareDialogListe />);
        expect(queryByText('Ny dialog')).toBeNull();
        expect(getByRole('navigation').children.length).toBeGreaterThan(0);
    });
    test('Bruker under oppf, elementer synes', async () => {
        vi.mock('../routing/loaders', () => ({ useRootLoaderData: () => rootLoaderData }));
        gitt.veileder().som.harDialog().som.harBrukerUnderOppfolging();
        const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
        getByText('Ny dialog');
        getByText(dialoger[0].overskrift);
    });
});

describe('<Dialog/>', () => {
    const worker = setupServer(...handlers);
    beforeAll(() => {
        worker.listen({
            onUnhandledRequest: (request, er) => {
                console.error(request, er);
            }
        });
    });
    afterAll(() => {
        vi.clearAllMocks;
        worker.close();
    });

    test('Bruker ikke under oppf. skjuler dialogcontroller og viser fortsatt henvendelser', async () => {
        gitt.veileder().som.harDialog().som.harBrukerIkkeUnderOppfolging();
        const { queryByRole, getByLabelText, queryByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        expect(queryByRole('form')).toBeNull();
        await waitFor(() => getByLabelText('Meldinger'));
        expect(queryByLabelText('Venter på svar fra NAV')).toBeDisabled();
        expect(queryByLabelText('Venter på svar fra bruker')).toBeDisabled();
    });
    test('Bruker under oppf. viser komponenter i Dialog', async () => {
        gitt.veileder().som.harDialog().som.harBrukerUnderOppfolging();
        const { getByText, getByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        await waitFor(() => getByLabelText('Ny melding'));
        await waitFor(() => getByLabelText('Meldinger'));
        await waitFor(() => getByText('Venter på svar fra NAV'));
    });
    test('Veileder skal kunne fjerne "Venter på svar fra NAV" på brukere som er under oppf. men reservert i KRR og dialog venter på svar', async () => {
        gitt.veileder().som.harDialogSomVenterPåNav().som.harBrukerUnderOppfølgingMenReservertIKRR();
        const { queryByRole, getByLabelText, queryByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        expect(queryByRole('form')).toBeNull();
        await waitFor(() => getByLabelText('Meldinger'));
        expect(queryByLabelText('Venter på svar fra NAV')).not.toBeDisabled();
        expect(queryByLabelText('Venter på svar fra bruker')).toBeDisabled();
    });
    test('Veileder skal kunne endre "Venter på svar fra Bruker" på bruker under oppf. men reservet i KRR og dialog ikke er ferdig behandlet', async () => {
        gitt.veileder().som.harDialogSomIkkeErFerdigBehandlet().som.harBrukerUnderOppfølgingMenReservertIKRR();
        const { queryByRole, getByLabelText, queryByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        expect(queryByRole('form')).toBeNull();
        await waitFor(() => getByLabelText('Meldinger'));
        expect(queryByLabelText('Venter på svar fra NAV')).toBeDisabled();
        expect(queryByLabelText('Venter på svar fra bruker')).not.toBeDisabled();
    });
    test('Veileder skal ikke kunne endre "Venter på svar fra Bruker" eller "Venter på svar fra NAV" på bruker under oppf. reservet i KRR hvis ferdigBehandlet og ikke venter på svar', async () => {
        gitt.veileder().som.harDialog().som.harBrukerUnderOppfølgingMenReservertIKRR();
        const { queryByRole, getByLabelText, queryByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        expect(queryByRole('form')).toBeNull();
        await waitFor(() => getByLabelText('Meldinger'));
        expect(queryByLabelText('Venter på svar fra NAV')).toBeDisabled();
        expect(queryByLabelText('Venter på svar fra bruker')).toBeDisabled();
    });
    test('Brukere skal ikke kunne se "Venter på svar fra Bruker" eller "Venter på svar fra NAV"', async () => {
        gitt.bruker().som.harDialog();
        const { queryByRole, getByLabelText, queryByLabelText } = render(<MemoryRouterMedBareDialogTrad />);
        expect(queryByRole('form')).toBeNull();
        await waitFor(() => getByLabelText('Meldinger'));
        expect(queryByLabelText('Venter på svar fra NAV')).not.toBeInTheDocument();
        expect(queryByLabelText('Venter på svar fra bruker')).not.toBeInTheDocument();
    });
});

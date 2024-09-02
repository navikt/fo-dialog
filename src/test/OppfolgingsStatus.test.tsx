import { createMemoryRouter, RouterProvider } from 'react-router';
import { RouteIds } from '../routing/routes';
import AppBody from '../view/AppBody';
import { describe } from 'vitest';
import React from 'react';
import IkkeValgtDialogMelding from '../view/dialog/IkkeValgtDialogMelding';
import { gitt } from './mockUtils';
import { act, render } from '@testing-library/react';

const singleComponentRouter = (initialEntries: string[] | undefined = undefined) =>
    createMemoryRouter(
        [
            {
                id: RouteIds.Root,
                path: '*',
                element: <AppBody />,
                children: [
                    {
                        id: RouteIds.Dialog,
                        path: ':dialogId',
                        element: (
                            <div className="flex min-h-0 flex-1">
                                <IkkeValgtDialogMelding />
                            </div>
                        )
                    }
                ]
            }
        ],
        { initialEntries }
    );
const MemoryRouterMedBareDialogOversikt = () => <RouterProvider router={singleComponentRouter(['/'])} />;

const rootLoaderData = {
    dialoger: Promise.resolve([])
};

describe('Statusadvarsler', () => {
    describe('Oppfølgingsadvarsler', () => {
        describe('Aldri vært under oppfølging', () => {
            it('veileder ser advarsel når bruker ikke er under oppfølging', async () => {
                gitt.veileder().som.harIngenDialog().som.harBrukerSomAldriHarVærtUnderOppfolging();
                const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
                getByText('Denne brukeren har ikke vært og er ikke under arbeidrettet oppfølging.');
            });

            it('bruker ser advarsel når bruker ikke er under oppfølging', async () => {
                gitt.bruker().som.harIngenDialog().som.harBrukerSomAldriHarVærtUnderOppfolging();
                vi.mock('../routing/loaders', () => ({ useRootLoaderData: () => rootLoaderData }));
                const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
                getByText('Du må være registrert hos NAV for å ha digital dialog med veileder.');
            });
        });

        describe('Ikke lenger under oppfølging', () => {
            it('veileder ser advarsel når bruker ikke er under oppfølging', async () => {
                gitt.veileder().som.harIngenDialog().som.harBrukerIkkeLengerErUnderOppfolging();
                const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
                getByText('Bruker er ikke under oppfølging og kan ikke sende meldinger');
            });

            it('bruker ser advarsel når bruker ikke er under oppfølging', async () => {
                gitt.bruker().som.harIngenDialog().som.harBrukerIkkeLengerErUnderOppfolging();
                vi.mock('../routing/loaders', () => ({ useRootLoaderData: () => rootLoaderData }));
                const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
                getByText(
                    'Du er ikke lenger registrert hos NAV. Hvis du fortsatt skal få oppfølging fra NAV og ha dialog med veileder må du være registrert.'
                );
            });
        });
    });

    describe('KRR advarsler', () => {
        it('veileder ser advarsel når bruker er under oppf. men reservert i KRR', async () => {
            gitt.veileder().som.harIngenDialog().som.harBrukerUnderOppfølgingMenReservertIKRR();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText('Du kan ikke kontakte denne brukeren digitalt.');
        });

        it('bruker ser advarsel når bruker er under oppf. men reservert i KRR', async () => {
            gitt.bruker().som.harIngenDialog().som.harBrukerUnderOppfølgingMenReservertIKRR();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText(
                'For å ta i bruk den digitale dialogen med din veileder, må du fjerne reservasjonen din mot digital kommunikasjon.'
            );
        });
    });

    describe('Manuell advarsler', () => {
        it('veileder ser advarsel når bruker er under oppf. men manuell', async () => {
            gitt.veileder().som.harIngenDialog().som.harBrukerUnderOppfølgingMenManuell();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText('Du kan ikke kontakte denne brukeren digitalt.');
        });

        it('bruker ser advarsel når bruker er under oppf. men manuell', async () => {
            gitt.bruker().som.harIngenDialog().som.harBrukerUnderOppfølgingMenManuell();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText('Du har ikke digital oppfølging fra NAV. Du kan derfor ikke ha digital dialog med veileder');
        });
    });

    describe('Kan ikke varsles', () => {
        it('veileder ser advarsel når bruker er under oppf. men ikke kan varsler (krr-attributt)', async () => {
            gitt.veileder().som.harIngenDialog().som.harBrukerUnderOppfølgingMenKanIkkeVarsles();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText('Du kan ikke kontakte denne brukeren digitalt.');
        });

        it('bruker ser advarsel når bruker er under oppf. men ikke kan varsles (krr-attributt)', async () => {
            gitt.bruker().som.harIngenDialog().som.harBrukerUnderOppfølgingMenKanIkkeVarsles();
            const { getByText } = await act(() => render(<MemoryRouterMedBareDialogOversikt />));
            getByText(/Du kan ikke varsles om meldinger. Dette er en feil/);
        });
    });
});

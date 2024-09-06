import { beforeAll, describe } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import React from 'react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mock/handlers';
import { dialogRoutes } from '../../routing/routes';
import { Provider } from '../Provider';
import { ijobbAktivitet } from '../../mock/Aktivitet';

const dialogId = '303';
const fnr = undefined; // Brukerkontekst
// Be careful to not create router before mockserver is running,
// calling createMemoryRouter will create the component and fire the loaders
const memoryRouter = () =>
    createMemoryRouter(dialogRoutes(fnr), {
        initialEntries: [`/`]
    });

const server = setupServer(...handlers);

describe('DialogTrad', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

    //  Close server after all tests
    afterAll(() => server.close());

    // Reset handlers after each test `important for test isolation`
    afterEach(() => server.resetHandlers());

    it('should display dialog-state from backend', async () => {
        const { getByLabelText, getByText } = await act(() =>
            render(
                <Provider visAktivitetDefault={false} fnr={fnr} erVeileder={!!fnr}>
                    <RouterProvider router={memoryRouter()} />
                </Provider>
            )
        );
        const dialogTittel = 'Jobb jeg har nå: LALALA';
        await waitFor(() => getByText(dialogTittel));
        await act(async () => getByText(dialogTittel).click());
        await waitFor(async () => getByLabelText('Skriv om arbeid og oppfølging', { selector: 'textarea' }));
        getByText('Er du fornøyd med oppgfølgingen?');
        getByText('Sånn passe.');
    });
});

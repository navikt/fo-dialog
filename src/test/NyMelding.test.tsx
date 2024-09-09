import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll } from 'vitest';
import { setupIntegrationTest } from './integrationTestSetup';

const fnr = '0123456789';
const { App, worker } = setupIntegrationTest(fnr);

describe('Ny melding', () => {
    beforeAll(() => {
        worker.listen({
            onUnhandledRequest: (request, er) => {
                console.error(request, er);
            }
        });
    });
    afterAll(() => {
        vi.clearAllMocks();
        worker.close();
    });

    it('når veileder sender en melding skal den dukke opp i chatten', async () => {
        const { getByLabelText, getByText } = await act(() => render(<App />));
        await waitFor(() => getByLabelText('Meldinger'));
        const input = getByLabelText('Skriv om arbeid og oppfølging');
        fireEvent.change(input, {
            target: { value: 'Dette er en ny melding' }
        });
        const sendKnapp = getByText('Send');
        act(() => sendKnapp.click());
        await waitFor(() => getByText('Dette er en ny melding'));
    });
});

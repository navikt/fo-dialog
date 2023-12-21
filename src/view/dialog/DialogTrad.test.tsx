import { beforeAll, describe } from 'vitest';
import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import React from 'react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mock/handlers';
import { dialogRoutes } from '../../routes';
import App from '../../App';

const dialogId = '123';

const memoryRouter = createMemoryRouter(
    dialogRoutes,
    // [
    //     {
    //         path: '/:dialogId',
    //         element: <DialogTrad />
    //     },
    //     {
    //         path: '/',
    //         element: <DefaultRoute />
    //     }
    // ],
    {
        initialEntries: [`/${dialogId}`]
    }
);

const server = setupServer(...handlers);

const MockContext = () => {
    return <RouterProvider router={memoryRouter} />;
};

describe('DialogTrad', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

    //  Close server after all tests
    afterAll(() => server.close());

    // Reset handlers after each test `important for test isolation`
    afterEach(() => server.resetHandlers());

    it('should display state from backend if no kladd', async () => {
        const { getByRole } = await act(async () => render(<App />));
        getByRole('textbox');
    });

    it('should display kladd and not backend state if kladd exists', () => {});

    it('should display kladd event when updating state from backend', () => {});
});

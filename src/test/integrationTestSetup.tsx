import { createMemoryRouter, RouterProvider } from 'react-router';
import { dialogRoutes } from '../routing/routes';
import React from 'react';
import { Provider } from '../view/Provider';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';

export const setupIntegrationTest = (fnr: string | undefined) => {
    const ProviderAndRouter = fullRouterAndProvider(fnr, ['/2']);
    return {
        worker: setupServer(...handlers), // TODO: Handlers should mock
        App: () => <ProviderAndRouter />
    };
};

export const fullRouterAndProvider = (fnr: string | undefined, initialEntries: string[] | undefined = undefined) => {
    return () => (
        <Provider erVeileder={fnr !== undefined}>
            <AllRoutesInMemory initialEntries={initialEntries} fnr={fnr} />
        </Provider>
    );
};

const AllRoutesInMemory = ({
    fnr,
    initialEntries
}: {
    fnr: string | undefined;
    initialEntries: string[] | undefined;
}) => {
    const router = createMemoryRouter(dialogRoutes(fnr), { initialEntries });
    return <RouterProvider router={router} />;
};

import path from 'path';

import cx from 'classnames';
import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import { stripTrailingSlash } from './api/UseApiBasePath';
import { USE_HASH_ROUTER, erInternFlate } from './constants';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { Aktivitetskort } from './view/aktivitet/Aktivitetskort';
import AppBody from './view/AppBody';
import Dialog from './view/dialog/Dialog';
import DialogInfoMelding from './view/dialog/DialogInfoMelding';
import NyDialog from './view/dialog/NyDialog';
import { Provider, useFnrContext } from './view/Provider';
import StatusAdvarsel from './view/statusAdvarsel/StatusAdvarsel';

interface Props {
    fnr?: string;
    enhet?: string;
}

const dialogRoutes = [
    {
        path: '/',
        element: <AppBody />,
        children: [
            {
                path: 'ny',
                element: (
                    <>
                        <NyDialog />
                        <div className="border-l border-border-divider"></div>
                    </>
                )
            },
            {
                path: ':dialogId',
                element: (
                    <>
                        <Dialog />
                        <Aktivitetskort />
                    </>
                )
            },
            {
                path: '',
                element: <DialogInfoMelding />
            }
        ]
    }
];

const Routes = ({ children }: { children?: React.ReactNode }) => {
    const fnr = useFnrContext();
    if (USE_HASH_ROUTER) {
        const hashRouter = createHashRouter(dialogRoutes);
        return <RouterProvider router={hashRouter} />;
    }
    let basename = fnr ?? '';
    if (!erInternFlate) basename = stripTrailingSlash(import.meta.env.BASE_URL + (fnr ?? ''));
    const browserRouter = createBrowserRouter(dialogRoutes, { basename });
    return <RouterProvider router={browserRouter} />;
};

const App = (props: Props) => {
    const { fnr } = props;
    return (
        <div
            className={cx('flex flex-col', {
                'h-[calc(100vh-180px)]': erInternFlate,
                'h-[calc(100vh-72px)] md:h-[calc(100vh-80px)]': !erInternFlate
            })}
        >
            <Provider fnr={fnr} erVeileder={!!fnr}>
                <StatusAdvarsel />
                <UppdateEventHandler />
                <Routes />
            </Provider>
        </div>
    );
};

export default App;

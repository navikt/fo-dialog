import path from 'path';

import cx from 'classnames';
import React from 'react';
import { Navigate, RouterProvider, useParams } from 'react-router';
import { createBrowserRouter, createHashRouter, useSearchParams } from 'react-router-dom';

import { stripTrailingSlash } from './api/UseApiBasePath';
import { USE_HASH_ROUTER, erInternFlate } from './constants';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { Aktivitetskort } from './view/aktivitet/Aktivitetskort';
import AppBody from './view/AppBody';
import Dialog from './view/dialog/Dialog';
import DialogInfoMelding from './view/dialog/DialogInfoMelding';
import NyDialog from './view/dialog/NyDialog';
import { Provider } from './view/Provider';
import StatusAdvarsel from './view/statusAdvarsel/StatusAdvarsel';

interface Props {
    fnr?: string;
    enhet?: string;
}

const RedirectToDialogWithoutFnr = () => {
    const params = useParams();
    const [queryParams, _] = useSearchParams();
    if (params.dialogId === 'ny') {
        return <Navigate replace to={`/ny?aktivitetId=` + queryParams.get('aktivitetId')} />;
    }
    return <Navigate replace to={`/` + params.dialogId} />;
};

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
                        <Aktivitetskort />
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
            },
            {
                path: ':fnr/:dialogId',
                element: <RedirectToDialogWithoutFnr />
            }
        ]
    }
];

const Routes = () => {
    if (USE_HASH_ROUTER) {
        const hashRouter = createHashRouter(dialogRoutes);
        return <RouterProvider router={hashRouter} />;
    }
    let basename = stripTrailingSlash(import.meta.env.BASE_URL);
    if (erInternFlate) basename = `/`;
    const browserRouter = createBrowserRouter(dialogRoutes, { basename });
    return <RouterProvider router={browserRouter} />;
};

const App = (props: Props) => {
    const { fnr } = props;
    return (
        <div
            className={cx('flex flex-col', {
                'h-[calc(100vh-180px)] min-h-[calc(100vh-180px)]': erInternFlate,
                'h-[calc(100vh-80px)] min-h-[calc(100vh-72px)]': !erInternFlate
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

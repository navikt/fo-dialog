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
    visAktivitetDefault?: boolean;
}

const RedirectToDialogWithoutFnr = () => {
    // /:fnr/:dialogId -> /:dialogId
    const params = useParams();
    return <Navigate replace to={`/` + params.dialogId} />;
};
const RedirectToNyDialogWithoutFnr = () => {
    // Handle route /:fnr/ny?aktivitetId=<id> -> /ny?aktivitetId=<id>
    const [queryParams, _] = useSearchParams();
    const aktivitetId = queryParams.get('aktivitetId');
    const queryPart = aktivitetId ? '?aktivitetId=' + aktivitetId : '';
    return <Navigate replace to={`/ny${queryPart}`} />;
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
                path: ':fnr/ny',
                element: <RedirectToNyDialogWithoutFnr />
            },
            {
                path: ':fnr/:dialogId',
                element: <RedirectToDialogWithoutFnr />
            },
            {
                path: '*',
                element: <Navigate to={'/'} />
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
    console.log(props);
    const { fnr, visAktivitetDefault } = props;
    return (
        <Provider visAktivitetDefault={visAktivitetDefault} fnr={fnr} erVeileder={!!fnr}>
            <StatusAdvarsel />
            <UppdateEventHandler />
            <div
                className={cx('flex', {
                    'max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)]': erInternFlate,
                    'max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)]': !erInternFlate
                })}
            >
                <Routes />
            </div>
        </Provider>
    );
};

export default App;

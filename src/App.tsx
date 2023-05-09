import cx from 'classnames';
import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { stripTrailingSlash } from './api/UseApiBasePath';
import { USE_HASH_ROUTER, erInternFlate } from './constants';
import { PageViewMetricCollector } from './metrics/PageViewMetricCollector';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { Aktivitetskort } from './view/aktivitet/Aktivitetskort';
import AppBody from './view/AppBody';
import Dialog from './view/dialog/Dialog';
import DialogInfoMelding from './view/dialog/DialogInfoMelding';
import NyDialog from './view/dialog/NyDialog';
import { EventHandler } from './view/EventHandler';
import { Provider } from './view/Provider';
import StatusAdvarsel from './view/statusAdvarsel/StatusAdvarsel';

interface Props {
    fnr?: string;
    enhet?: string;
}

const Router = ({ children }: { children?: React.ReactNode }) => {
    if (USE_HASH_ROUTER) {
        return <HashRouter>{children}</HashRouter>;
    }
    let basename = stripTrailingSlash(import.meta.env.BASE_URL);
    return <BrowserRouter basename={erInternFlate ? '' : basename}>{children}</BrowserRouter>;
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
            <Router>
                <EventHandler />
                <Provider fnr={fnr} erVeileder={!!fnr}>
                    <StatusAdvarsel />
                    <Routes>
                        <Route path={fnr ? '/:fnr' : ''} element={<AppBody />}>
                            <Route
                                path={`ny`}
                                element={
                                    <>
                                        <NyDialog />
                                        <div className="border-l border-border-divider"></div>
                                    </>
                                }
                            />
                            <Route
                                path={`:dialogId`}
                                element={
                                    <>
                                        <Dialog />
                                        <Aktivitetskort />
                                    </>
                                }
                            />
                            <Route index element={<DialogInfoMelding />} />
                        </Route>
                    </Routes>
                    <UppdateEventHandler />
                </Provider>
                <PageViewMetricCollector />
            </Router>
        </div>
    );
};

export default App;

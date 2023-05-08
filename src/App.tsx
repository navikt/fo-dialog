import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { USE_HASH_ROUTER } from './constants';
import { PageViewMetricCollector } from './metrics/PageViewMetricCollector';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { stripTrailingSlash } from './utils/UseApiBasePath';
import AppBody from './view/AppBody';
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
    const basename = stripTrailingSlash(import.meta.env.BASE_URL);
    return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
};

const App = (props: Props) => {
    const { fnr } = props;

    return (
        <div className="flex min-w-full min-h-screen flex-col">
            <Router>
                <EventHandler />
                <Provider fnr={fnr} erVeileder={!!fnr}>
                    <StatusAdvarsel />

                    <AppBody />
                    {/*<Routes>*/}
                    {/*    <Route path="/*" element={<AppBody />}></Route>*/}
                    {/*</Routes>*/}
                    <UppdateEventHandler />
                </Provider>
                <PageViewMetricCollector />
            </Router>
        </div>
    );
};

export default App;

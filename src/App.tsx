import '@navikt/ds-css';

import './tailwind.css';

import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { USE_HASH_ROUTER } from './constants';
import TimeoutModal from './felleskomponenter/timeoutmodal/TimeoutModal';
import { PageViewMetricCollector } from './metrics/PageViewMetricCollector';
import { UppdateEventHandler } from './utils/UpdateEvent';
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

    return <BrowserRouter>{children}</BrowserRouter>;
};

const App = (props: Props) => {
    const { fnr } = props;

    return (
        <Router>
            <div className="flex min-w-full min-h-screen flex-col">
                <EventHandler />
                <Provider fnr={fnr} erVeileder={!!fnr}>
                    <StatusAdvarsel />
                    <AppBody />
                    <UppdateEventHandler />
                </Provider>
                <TimeoutModal hidden={!!fnr} fnr={fnr} />
            </div>
            <PageViewMetricCollector />
        </Router>
    );
};

export default App;

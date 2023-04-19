import classNames from 'classnames';
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { USE_HASH_ROUTER } from '../constants';
import TimeoutModal from '../felleskomponenter/timeoutmodal/TimeoutModal';
import { PageViewMetricCollector } from '../metrics/PageViewMetricCollector';
import { UppdateEventHandler } from '../utils/UpdateEvent';
import AppBody from './AppBody';
import { EventHandler } from './EventHandler';
import { Provider } from './Provider';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';

interface Props {
    fnr?: string;
    enhet?: string;
}

function Router({ children }: { children?: React.ReactNode }) {
    if (USE_HASH_ROUTER) {
        return <HashRouter>{children}</HashRouter>;
    }

    return <BrowserRouter>{children}</BrowserRouter>;
}

function App(props: Props) {
    const { fnr } = props;
    const wrapperClass = fnr ? '' : 'flex width-full';
    const appstyle = fnr ? 'min-h-120' : 'relative flex flex-col flex-1 overflow-hidden itemst-center';

    return (
        <Router>
            <div className={classNames('h-[calc(100vh-80px)]', wrapperClass)}>
                <div className={appstyle}>
                    <EventHandler />
                    <Provider fnr={fnr} erVeileder={!!fnr}>
                        <StatusAdvarsel />
                        <AppBody />
                        <UppdateEventHandler />
                    </Provider>
                    <TimeoutModal hidden={!!fnr} fnr={fnr} />
                </div>
            </div>
            <PageViewMetricCollector />
        </Router>
    );
}

export default App;

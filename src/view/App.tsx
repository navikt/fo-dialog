import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import TimeoutModal from '../felleskomponenter/timeoutmodal/TimeoutModal';
import { PageViewMetricCollector } from '../metrics/PageViewMetricCollector';
import { UppdateEventHandler } from '../utils/UpdateEvent';
import styles from './App.module.less';
import AppBody from './AppBody';
import { EventHandler } from './EventHandler';
import { Provider } from './Provider';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { getBasename } from './utils/utils';

interface Props {
    fnr?: string;
    enhet?: string;
}

function Router({ children }: { children?: React.ReactNode }) {
    if (import.meta.env.VITE_USE_HASH_ROUTER === 'true') {
        return <HashRouter>{children}</HashRouter>;
    }

    return <BrowserRouter>{children}</BrowserRouter>;
}

function App(props: Props) {
    const { fnr } = props;
    const wraperClass = fnr ? styles.konteinerInside : styles.konteinerUtside;
    const appstyle = fnr ? styles.appInside : styles.app;

    return (
        <Router>
            <div className={wraperClass}>
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

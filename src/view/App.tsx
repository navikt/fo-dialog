import React from 'react';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { AppBanner } from './banner/AppBanner';
import styles from './App.module.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import { EventHandler } from './EventHandler';
import AppBody from './AppBody';
import TimeoutModal from '../felleskomponenter/timeoutmodal/TimeoutModal';
import { UppdateEventHandler } from '../utils/UpdateEvent';

interface Props {
    fnr?: string;
}

function App(props: Props) {
    const apiBasePath = props.fnr ? '' : process.env.PUBLIC_URL;
    const basepath = props.fnr ? `/veilarbpersonflatefs/${props.fnr}` : process.env.PUBLIC_URL;
    const wraperClass = props.fnr ? styles.konteinerInside : styles.konteinerUtside;
    const appstyle = props.fnr ? styles.appInside : styles.app;

    return (
        <Router basename={basepath}>
            <div className={wraperClass}>
                <div className={appstyle}>
                    <EventHandler />
                    <AppBanner hidden={!!props.fnr} />
                    <Provider fnr={props.fnr} apiBasePath={apiBasePath}>
                        <StatusAdvarsel />
                        <AppBody />
                        <UppdateEventHandler />
                    </Provider>
                    <TimeoutModal hidden={!!props.fnr} apiBasePath={apiBasePath} />
                </div>
            </div>
        </Router>
    );
}

export default App;

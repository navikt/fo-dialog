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
    enhet?: string;
}

function App(props: Props) {
    const { fnr } = props;
    const basename = fnr ? `/veilarbpersonflatefs/${fnr}` : process.env.PUBLIC_URL;
    const wraperClass = fnr ? styles.konteinerInside : styles.konteinerUtside;
    const appstyle = fnr ? styles.appInside : styles.app;

    return (
        <Router basename={basename}>
            <div className={wraperClass}>
                <div className={appstyle}>
                    <EventHandler />
                    <AppBanner hidden={!!fnr} />
                    <Provider fnr={fnr}>
                        <StatusAdvarsel />
                        <AppBody />
                        <UppdateEventHandler />
                    </Provider>
                    <TimeoutModal hidden={!!fnr} fnr={fnr} />
                </div>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TimeoutModal from '../felleskomponenter/timeoutmodal/TimeoutModal';
import { UppdateEventHandler } from '../utils/UpdateEvent';
import styles from './App.module.less';
import AppBody from './AppBody';
import { EventHandler } from './EventHandler';
import { Provider } from './Provider';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { getContextPath } from './utils/utils';

interface Props {
    fnr?: string;
    enhet?: string;
}

function App(props: Props) {
    const { fnr } = props;
    const basename = fnr ? `${getContextPath()}/${fnr}` : process.env.PUBLIC_URL;
    const wraperClass = fnr ? styles.konteinerInside : styles.konteinerUtside;
    const appstyle = fnr ? styles.appInside : styles.app;

    return (
        <Router basename={basename}>
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
        </Router>
    );
}

export default App;

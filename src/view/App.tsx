import React from 'react';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { AppBanner } from './banner/AppBanner';
import styles from './App.module.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import AppBody from './AppBody';

interface Props {
    fnr?: string;
}

function App(props: Props) {
    const baspath = props.fnr ? `/veilarbpersonflatefs/${props.fnr}` : process.env.PUBLIC_URL;

    return (
        <Router basename={baspath}>
            <div className={styles.app}>
                <AppBanner hidden={!!props.fnr} />
                <Provider fnr={props.fnr}>
                    <StatusAdvarsel />
                    <AppBody />
                </Provider>
            </div>
        </Router>
    );
}

export default App;

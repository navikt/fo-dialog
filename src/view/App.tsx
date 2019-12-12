import React from 'react';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { AppBanner } from './banner/AppBanner';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import AppBody from './AppBody';

interface Props {
    fnr?: string;
}

function App(props: Props) {
    return (
        <Router>
            <div className="app">
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

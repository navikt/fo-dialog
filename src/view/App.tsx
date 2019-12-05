import React from 'react';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import { AppBanner } from './banner/AppBanner';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import AppBody from './AppBody';

function App() {
    return (
        <Router>
            <div className="app">
                <AppBanner />
                <Provider>
                    <StatusAdvarsel />
                    <AppBody />
                </Provider>
            </div>
        </Router>
    );
}

export default App;

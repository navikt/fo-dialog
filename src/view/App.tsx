import React from 'react';
import StatusFeilmeldinger from './statusFeilmeldinger/StatusFeilmeldinger';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import DialogContainer from './DialogContainer';
import { AppBanner } from './banner/AppBanner';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app">
                <AppBanner />
                <Provider>
                    <StatusFeilmeldinger />
                    <DialogContainer />
                </Provider>
            </div>
        </Router>
    );
}

export default App;

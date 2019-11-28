import React from 'react';
import AlertStripeContainer from './alertstriper/AlertStripeContainer';
import { AppBanner } from './banner/AppBanner';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import DialogContainer from './DialogContainer';

function App() {
    return (
        <Router>
            <div className="app">
                <Provider>
                    <AppBanner />
                    <AlertStripeContainer />
                    <DialogContainer />
                </Provider>
            </div>
        </Router>
    );
}

export default App;

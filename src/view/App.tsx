import React from 'react';
import DialogOversikt from './dialogoversikt/DialogOversikt';
import { AlertStripeContainer } from './AlertStripeContainer';
import { AppBanner } from './banner/AppBanner';
import AktivitetContainer from './aktivitet/AktivitetContainer';
import Routes from './Routes';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';

function App() {
    return (
        <Router>
            <div className="app">
                <Provider>
                    <AppBanner cls={'dialogbanner'} />
                    <AlertStripeContainer />
                    <div className={'app__body'}>
                        <DialogOversikt />
                        <Routes className="dialog-container" />
                        <AktivitetContainer />
                    </div>
                </Provider>
            </div>
        </Router>
    );
}

export default App;

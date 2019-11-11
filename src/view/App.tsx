import React from 'react';
import DialogOversikt from './dialogoversikt/DialogOversikt';
import AlertStripeContainer from './alertstirper/AlertStripeContainer';
import { AppBanner } from './banner/AppBanner';
import AktivitetContainer from './aktivitet/AktivitetContainer';
import Routes from './Routes';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './Provider';
import HidenIfBrukerAldriUnderOppfolging from './HidenIfBrukerAldriUnderOppfolging';

function App() {
    return (
        <Router>
            <div className="app">
                <Provider>
                    <AppBanner />
                    <AlertStripeContainer />
                    <HidenIfBrukerAldriUnderOppfolging>
                        <DialogOversikt />
                        <Routes />
                        <AktivitetContainer />
                    </HidenIfBrukerAldriUnderOppfolging>
                </Provider>
            </div>
        </Router>
    );
}

export default App;

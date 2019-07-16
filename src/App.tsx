import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './Context';
import { DialogBanner } from './view/DialogBanner';
import { DialogOverview } from './view/DialogOverview';
import Dialog from './view/Dialog';
import { DialogNew } from './view/DialogNew';
import { AlertStripeContainer } from './view/AlertStripeContainer';

import './App.less';

function App() {
    return (
        <Router>
            <div className="app">
                <DialogBanner />
                <Provider>
                    {(bruker, oppfolgingData, dialoger) => (
                        <>
                            <AlertStripeContainer />
                            <div className="app__body ">
                                <DialogOverview dialogData={dialoger.data!} />
                                <Switch>
                                    <Route exact path="/" component={Dialog} />
                                    <Route path="/ny" component={DialogNew} />
                                    <Route path="/:dialogId" component={Dialog} />
                                </Switch>
                            </div>
                        </>
                    )}
                </Provider>
            </div>
        </Router>
    );
}

export default App;

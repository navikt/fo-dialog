import React from 'react';
import { BrowserRouter as Router, matchPath, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Provider } from './Context';
import { DialogOverview } from './view/DialogOverview';
import Dialog from './view/Dialog';
import DialogNew from './view/DialogNew';
import { AlertStripeContainer } from './view/AlertStripeContainer';

import './App.less';
import classNames from 'classnames';
import { DialogBanner } from './view/DialogBanner';

function Routing() {
    return (
        <Router>
            <div className="app">
                <Provider>
                    <AppWithRouting />
                </Provider>
            </div>
        </Router>
    );
}

export default Routing;

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

function App(props: Props) {
    const harDialogId = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const skalViseNyDialog = !!matchPath(props.location.pathname, '/ny');
    const skalViseDialog = !!(harDialogId && !skalViseNyDialog);

    const appbodycls = classNames('app__body', {
        'app__body--dialogvisning': skalViseDialog,
        'app__body--nydialogvisning': skalViseNyDialog
    });

    return (
        <>
            <DialogBanner />
            <AlertStripeContainer />
            <div className={appbodycls}>
                <DialogOverview />
                <Switch>
                    <Route exact path="/" component={Dialog} />
                    <Route path="/ny" component={DialogNew} />
                    <Route path="/:dialogId" component={Dialog} />
                </Switch>
            </div>
        </>
    );
}

const AppWithRouting = withRouter(App);

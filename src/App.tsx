import React from 'react';
import { BrowserRouter as Router, matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import { Provider } from './Context';
import { DialogOverview } from './view/DialogOverview';
import { AlertStripeContainer } from './view/AlertStripeContainer';

import './App.less';
import classNames from 'classnames';
import { DialogBanner } from './view/DialogBanner';
import AktivitetContainer from './view/AktivitetContainer';
import DialogContainer from './view/DialogContainer';

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
                <DialogContainer className="dialog-container" />
                <AktivitetContainer />
            </div>
        </>
    );
}

const AppWithRouting = withRouter(App);

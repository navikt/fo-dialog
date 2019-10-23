import React from 'react';
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import { DialogOversikt } from './dialogoversikt/DialogOversikt';
import { AlertStripeContainer } from './AlertStripeContainer';
import classNames from 'classnames';
import { AppBanner } from './banner/AppBanner';
import AktivitetContainer from './aktivitet/AktivitetContainer';
import Routes from './Routes';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from "./Provider";

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

//TODO: Rydde her
function App(props: Props) {
    const harDialogId = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const skalViseNyDialog = !!matchPath(props.location.pathname, '/ny');
    const skalViseDialog = !!(harDialogId && !skalViseNyDialog);
    const skalViseTom = matchPath(props.location.pathname, '/');

    const dialogbannercls = classNames('dialogbanner', { 'dialogbanner--dialogvisning': skalViseDialog });
    const appbodycls = classNames('app__body', {
        'app__body--emptyState': skalViseTom,
        'app__body--dialogvisning': skalViseDialog,
        'app__body--nydialogvisning': skalViseNyDialog
    });

    return (
        <>
            <AppBanner cls={dialogbannercls} />
            <AlertStripeContainer />
            <div className={appbodycls}>
                <DialogOversikt />
                <Routes className="dialog-container" />
                <AktivitetContainer />
            </div>
        </>
    );
}

const AppWithRouting = withRouter(App);

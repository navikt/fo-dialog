import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router';

import { useUserInfoContext } from '../BrukerProvider';
import { InfoOmDialogSide } from '../info/InfoOmDialogSide';
import { useFnrContext } from '../Provider';
import Dialog from './Dialog';
import styles from './DialogContainer.module.less';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    const bruker = useUserInfoContext();
    const cls = classNames(styles.dialogContainer, { [styles.brukerDialogContainer]: bruker?.erBruker });

    const fnr = useFnrContext();

    return (
        <div className={cls}>
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/informasjon`} component={InfoOmDialogSide} />
                <Route path={`${fnr ? `/${fnr}` : ''}/ny`} component={NyDialog} />
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} component={Dialog} />
                <Route path={`${fnr ? `/${fnr}` : '/'}`} component={DialogInfoMelding} />
            </Switch>
        </div>
    );
}
export default DialogContainer;

import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router';

import { useUserInfoContext } from '../BrukerProvider';
import { InfoOmDialogSide } from '../info/InfoOmDialogSide';
import Dialog from './Dialog';
import styles from './DialogContainer.module.less';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    const bruker = useUserInfoContext();
    const cls = classNames(styles.dialogContainer, { [styles.brukerDialogContainer]: bruker?.erBruker });

    return (
        <div className={cls}>
            <Switch>
                <Route path="/informasjon" component={InfoOmDialogSide} />
                <Route path="/ny" component={NyDialog} />
                <Route path="/:dialogId" component={Dialog} />
                <Route path="/" component={DialogInfoMelding} />
            </Switch>
        </div>
    );
}
export default DialogContainer;

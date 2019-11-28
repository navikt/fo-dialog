import { Route, Switch } from 'react-router';
import Dialog from './dialog/Dialog';
import DialogNew from './dialog/NyDialog';
import React from 'react';
import DialogInfoMelding from './dialog/DialogInfoMelding';
import styles from './DialogOversikt.module.less';

function DialogOversikt() {
    return (
        <div className={styles.dialogContainer}>
            <Switch>
                <Route exact path="/" component={DialogInfoMelding} />
                <Route path="/ny" component={DialogNew} />
                <Route path="/:dialogId" component={Dialog} />
            </Switch>
        </div>
    );
}
export default DialogOversikt;

import { Route, Switch } from 'react-router';
import Dialog from './Dialog';
import DialogNew from './NyDialog';
import React from 'react';
import DialogInfoMelding from './DialogInfoMelding';
import styles from './DialogContainer.module.less';

function DialogContainer() {
    return (
        <div className={styles.dialogContainer}>
            <Switch>
                <Route path="/ny" component={DialogNew} />
                <Route path="/:dialogId" component={Dialog} />
                <Route path="/" component={DialogInfoMelding} />
            </Switch>
        </div>
    );
}
export default DialogContainer;

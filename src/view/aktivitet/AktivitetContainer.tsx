import React from 'react';
import { Route, Switch } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import styles from './AktivitetContainer.module.less';

function AktivitetContainer() {
    return (
        <div className={styles.aktivitetContainer}>
            <Switch>
                <Route path="/:dialogId" component={Aktivitetskort} />
            </Switch>
        </div>
    );
}

export default AktivitetContainer;

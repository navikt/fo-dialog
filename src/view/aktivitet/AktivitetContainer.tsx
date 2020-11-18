import React from 'react';
import { Route, Switch } from 'react-router';

import styles from './AktivitetContainer.module.less';
import { Aktivitetskort } from './Aktivitetskort';

function AktivitetContainer() {
    return (
        <div className={styles.aktivitetContainer}>
            <Switch>
                <Route path="/ny" component={Aktivitetskort} />
                <Route path="/:dialogId" component={Aktivitetskort} />
            </Switch>
        </div>
    );
}

export default AktivitetContainer;

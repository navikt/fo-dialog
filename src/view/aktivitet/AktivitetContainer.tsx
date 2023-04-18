import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import styles from './AktivitetContainer.module.less';
import { Aktivitetskort } from './Aktivitetskort';

function AktivitetContainer() {
    const fnr = useFnrContext();
    return (
        <div className={styles.aktivitetContainer}>
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/ny`} component={Aktivitetskort} />
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} component={Aktivitetskort} />
            </Switch>
        </div>
    );
}

export default AktivitetContainer;

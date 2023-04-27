import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import { Aktivitetskort } from './Aktivitetskort';

function AktivitetContainer() {
    const fnr = useFnrContext();
    return (
        // <div className="col-span-1 border-l border-border-divider h-[calc(100vh-80px)] overflow-y-scroll">
        <div
            className={classNames(
                'hidden lg:flex',
                'w-full max-w-[30rem] border-l border-border-divider overflow-y-hidden'
            )}
        >
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/ny`} component={Aktivitetskort} />
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} component={Aktivitetskort} />
            </Switch>
        </div>
    );
}

export default AktivitetContainer;

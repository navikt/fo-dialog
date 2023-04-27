import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import DialogOversikt from './DialogOversikt';

export default function DialogOversiktContainer() {
    const fnr = useFnrContext();
    return (
        <Switch>
            <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId?`} component={DialogOversikt} />
        </Switch>
    );
}

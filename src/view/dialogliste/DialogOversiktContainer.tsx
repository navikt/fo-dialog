import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import DialogOversikt from './DialogOversikt';

export default function DialogOversiktContainer() {
    const fnr = useFnrContext();
    return (
        <div className="col-span-1">
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId?`} component={DialogOversikt} />
            </Switch>
        </div>
    );
}

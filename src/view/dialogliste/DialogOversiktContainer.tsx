import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import DialogOversikt from './DialogOversikt';

export default function DialogOversiktContainer() {
    const fnr = useFnrContext();
    return (
        <div className="col-span-1 h-[calc(100vh-80px)] overflow-y-scroll">
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId?`} component={DialogOversikt} />
            </Switch>
        </div>
    );
}

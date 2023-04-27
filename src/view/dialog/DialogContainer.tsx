import React from 'react';
import { Route, Switch } from 'react-router';

import { useFnrContext } from '../Provider';
import Dialog from './Dialog';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    const fnr = useFnrContext();

    return (
        <Switch>
            <Route path={`${fnr ? `/${fnr}` : ''}/ny`} component={NyDialog} />
            <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} component={Dialog} />
            <Route path={`${fnr ? `/${fnr}` : '/'}`} component={DialogInfoMelding} />
        </Switch>
    );
}
export default DialogContainer;

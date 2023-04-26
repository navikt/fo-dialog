import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router';

import { useUserInfoContext } from '../BrukerProvider';
import { useFnrContext } from '../Provider';
import Dialog from './Dialog';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    const bruker = useUserInfoContext();

    const fnr = useFnrContext();

    return (
        <div
            className={classNames('w-full bg-white overflow-auto flex overflow-y-hidden h-screen', {
                // [styles.brukerDialogContainer]: bruker?.erBruker
            })}
        >
            <Switch>
                <Route path={`${fnr ? `/${fnr}` : ''}/ny`} component={NyDialog} />
                <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} component={Dialog} />
                <Route path={`${fnr ? `/${fnr}` : '/'}`} component={DialogInfoMelding} />
            </Switch>
        </div>
    );
}
export default DialogContainer;

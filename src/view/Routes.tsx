import { Route, Switch } from 'react-router';
import Dialog from './dialog/Dialog';
import DialogNew from './dialog/NyDialog';
import React from 'react';
import DialogInfoMelding from './dialog/DialogInfoMelding';

function Routes(props: { className: string }) {
    return (
        <div className={props.className}>
            <Switch>
                <Route exact path="/" component={DialogInfoMelding} />
                <Route path="/ny" component={DialogNew} />
                <Route path="/:dialogId" component={Dialog} />
            </Switch>
        </div>
    );
}
export default Routes;

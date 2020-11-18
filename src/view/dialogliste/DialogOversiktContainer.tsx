import React from 'react';
import { Route, Switch } from 'react-router';

import DialogOversikt from './DialogOversikt';

export default function DialogOversiktContainer() {
    return (
        <Switch>
            <Route path="/:dialogId?" component={DialogOversikt} />
        </Switch>
    );
}

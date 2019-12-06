import { Route, Switch } from 'react-router';
import DialogListe from './DialogListe';
import React from 'react';

export default function DialogListeContainer() {
    return (
        <Switch>
            <Route path="/:dialogId?" component={DialogListe} />
        </Switch>
    );
}

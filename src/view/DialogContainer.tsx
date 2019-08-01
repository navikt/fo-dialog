import { Route, Switch } from 'react-router';
import Dialog from './Dialog';
import DialogNew from './DialogNew';
import React from 'react';

function DialogContainer(props: { className: string }) {
    return (
        <div className={props.className}>
            <Switch>
                <Route exact path="/" component={Dialog} />
                <Route path="/ny" component={DialogNew} />
                <Route path="/:dialogId" component={Dialog} />
            </Switch>
        </div>
    );
}
export default DialogContainer;

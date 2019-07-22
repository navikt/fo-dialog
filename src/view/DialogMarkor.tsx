import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps<{ dialogId?: string }> {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;
    toggleVenterPaSvar(venterPaSvar: boolean): void;
    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
}

export function DialogMarkor(props: Props) {
    return (
        <div className="checkbox-block">
            <Checkbox
                label="Venter på svar fra NAV"
                checked={!props.ferdigBehandlet}
                className="checkbox-block__item"
                onChange={() => props.toggleFerdigBehandlet(!props.ferdigBehandlet)}
            />
            <Checkbox
                label="Venter på svar fra bruker"
                checked={props.venterPaSvar}
                className="checkbox-block__item"
                onChange={() => props.toggleVenterPaSvar(!props.venterPaSvar)}
            />
        </div>
    );
}

export default withRouter(DialogMarkor);

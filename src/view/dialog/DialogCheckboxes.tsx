import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';

interface Props {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;
    toggleVenterPaSvar(venterPaSvar: boolean): void;
    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
    disabled: boolean;
}

export function DialogCheckboxes(props: Props) {
    return (
        <div className="checkbox-block">
            <Checkbox
                label="Venter på svar fra NAV"
                checked={!props.ferdigBehandlet}
                className="checkbox-block__item"
                disabled={props.disabled}
                onChange={() => props.toggleFerdigBehandlet(!props.ferdigBehandlet)}
            />
            <Checkbox
                label="Venter på svar fra bruker"
                checked={props.venterPaSvar}
                className="checkbox-block__item"
                disabled={props.disabled}
                onChange={() => props.toggleVenterPaSvar(!props.venterPaSvar)}
            />
        </div>
    );
}

export default visibleIfHoc(DialogCheckboxes);

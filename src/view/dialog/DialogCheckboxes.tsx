import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';

import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../DialogProvider';
import { dataOrUndefined, useOppfolgingContext } from '../Provider';

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

interface ManagedProps {
    dialog: DialogData;
    visible: boolean;
}

export default function ManagedDialogCheckboxes(props: ManagedProps) {
    const dialogContext = useDialogContext();
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    const { visible, dialog } = props;

    if (!visible) {
        return null;
    }

    const toggleFerdigBehandlet = (ferdigBehandlet: boolean) => {
        dialogContext.setFerdigBehandlet(dialog, ferdigBehandlet).then(dialogContext.hentDialoger);
    };
    const toggleVenterPaSvar = (venterPaSvar: boolean) => {
        dialogContext.setVenterPaSvar(dialog, venterPaSvar).then(dialogContext.hentDialoger);
    };
    const disabled = dialog.historisk || !oppfolgingData?.underOppfolging;

    return (
        <DialogCheckboxes
            disabled={disabled}
            toggleFerdigBehandlet={toggleFerdigBehandlet}
            toggleVenterPaSvar={toggleVenterPaSvar}
            ferdigBehandlet={dialog.ferdigBehandlet}
            venterPaSvar={dialog.venterPaSvar}
        />
    );
}

import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';

import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../DialogProvider';
import { dataOrUndefined, useOppfolgingContext } from '../Provider';
import styles from './DialogCheckboxes.module.less';

interface Props {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;
    toggleVenterPaSvar(venterPaSvar: boolean): void;
    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
    disabled: boolean;
}

const DialogCheckboxes = (props: Props) => (
    <div className={styles.checkboxBlock}>
        <Checkbox
            label="Venter på svar fra NAV"
            checked={!props.ferdigBehandlet}
            className={styles.checkboxItem}
            disabled={props.disabled}
            onChange={() => props.toggleFerdigBehandlet(!props.ferdigBehandlet)}
        />
        <Checkbox
            label="Venter på svar fra bruker"
            checked={props.venterPaSvar}
            className={styles.checkboxItem}
            disabled={props.disabled}
            onChange={() => props.toggleVenterPaSvar(!props.venterPaSvar)}
        />
    </div>
);

interface ManagedProps {
    dialog: DialogData;
    visible: boolean;
}

const ManagedDialogCheckboxes = (props: ManagedProps) => {
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
};

export default ManagedDialogCheckboxes;

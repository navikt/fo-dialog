import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';

import { Status } from '../../api/typer';
import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../DialogProvider';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined } from '../Provider';
import styles from './DialogCheckboxes.module.less';

interface Props {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;
    toggleVenterPaSvar(venterPaSvar: boolean): void;
    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
    disabled: boolean;
    values: ('ferdigBehandlet' | 'venterPaSvar')[];
    loading: boolean;
}

const DialogCheckboxes = ({
    values,
    ferdigBehandlet,
    toggleFerdigBehandlet,
    toggleVenterPaSvar,
    loading,
    venterPaSvar,
    disabled
}: Props) => (
    <div className={styles.checkboxBlock}>
        <CheckboxGroup legend={'Filter'} value={values}>
            <Checkbox
                value={'ferdigBehandlet'}
                className={styles.checkboxItem}
                disabled={disabled || loading}
                onChange={() => toggleFerdigBehandlet(!ferdigBehandlet)}
            >
                Venter på svar fra NAV
            </Checkbox>
            <Checkbox
                value={'venterPaSvar'}
                className={styles.checkboxItem}
                disabled={disabled || loading}
                onChange={() => toggleVenterPaSvar(!venterPaSvar)}
            >
                Venter på svar fra bruker
            </Checkbox>
        </CheckboxGroup>
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

    const values = [
        !dialog.ferdigBehandlet ? ('ferdigBehandlet' as const) : undefined,
        dialog.venterPaSvar ? ('venterPaSvar' as const) : undefined
    ].filter((it) => !!it);

    const laster = dialogContext.status === Status.PENDING || dialogContext.status === Status.RELOADING;

    return (
        <DialogCheckboxes
            values={values}
            disabled={disabled}
            loading={laster}
            toggleFerdigBehandlet={toggleFerdigBehandlet}
            toggleVenterPaSvar={toggleVenterPaSvar}
            ferdigBehandlet={dialog.ferdigBehandlet}
            venterPaSvar={dialog.venterPaSvar}
        />
    );
};

export default ManagedDialogCheckboxes;

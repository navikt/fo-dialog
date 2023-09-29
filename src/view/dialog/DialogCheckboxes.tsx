import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { Status } from '../../api/typer';
import { notEmpty } from '../../utils/TypeHelper';
import { useDialogContext } from '../DialogProvider';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined } from '../Provider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { useUserInfoContext } from '../BrukerProvider';

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
}: Props) => {
    const compactMode = useCompactMode();

    return (
        <div className="mb-2 pl-1">
            <CheckboxGroup legend={'Filter'} hideLegend value={values}>
                <div className="flex">
                    <Checkbox
                        value={'ferdigBehandlet'}
                        size="small"
                        className={classNames({ 'pr-4': compactMode, 'pr-8': !compactMode })}
                        disabled={disabled || loading}
                        onChange={() => toggleFerdigBehandlet(!ferdigBehandlet)}
                    >
                        Venter på svar fra NAV
                    </Checkbox>
                    <Checkbox
                        value={'venterPaSvar'}
                        size="small"
                        className="pr-8"
                        disabled={disabled || loading}
                        onChange={() => toggleVenterPaSvar(!venterPaSvar)}
                    >
                        Venter på svar fra bruker
                    </Checkbox>
                </div>
            </CheckboxGroup>
        </div>
    );
};

const ManagedDialogCheckboxes = () => {
    const visible = useUserInfoContext()?.erVeileder || false;
    const dialog = useSelectedDialog();
    const dialogContext = useDialogContext();
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!visible || !dialog) {
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
    ].filter(notEmpty);

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

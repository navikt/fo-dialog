import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { Status } from '../../api/typer';
import { notEmpty } from '../../utils/TypeHelper';
import { useDialogContext } from '../DialogProvider';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined, useFnrContext } from '../Provider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { useUserInfoContext } from '../BrukerProvider';
import { useHentDialoger } from '../dialogProvider/dialogStore';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

interface Props {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;
    toggleVenterPaSvar(venterPaSvar: boolean): void;
    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
    ferdigBehandletDisabled: boolean;
    venterPaSvarDisabled: boolean;
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
    venterPaSvarDisabled,
    ferdigBehandletDisabled
}: Props) => {
    return (
        <div className="mb-2 pl-1">
            <CheckboxGroup legend={'Filter'} hideLegend value={values}>
                <div className="flex">
                    <Checkbox
                        value={'ferdigBehandlet'}
                        size="small"
                        className="pr-4"
                        disabled={ferdigBehandletDisabled || loading}
                        onChange={() => toggleFerdigBehandlet(!ferdigBehandlet)}
                    >
                        Venter på svar fra NAV
                    </Checkbox>
                    <Checkbox
                        value={'venterPaSvar'}
                        size="small"
                        className="pr-8"
                        disabled={venterPaSvarDisabled || loading}
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
    const fnr = useFnrContext();
    const hentDialoger = useHentDialoger();
    const dialogContext = useDialogContext();
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!visible || !dialog) {
        return null;
    }

    const toggleFerdigBehandlet = (ferdigBehandlet: boolean) => {
        dialogContext.setFerdigBehandlet(dialog, ferdigBehandlet).then(() => hentDialoger(fnr));
    };
    const toggleVenterPaSvar = (venterPaSvar: boolean) => {
        dialogContext.setVenterPaSvar(dialog, venterPaSvar).then(() => hentDialoger(fnr));
    };

    const kansendeMelding = useKansendeMelding();
    const burdeKunneSetteFerdigBehandlet = !dialog.ferdigBehandlet && !kansendeMelding;
    const burdeKunneFjerneVenterPaSvar = dialog.venterPaSvar && !kansendeMelding;
    const ikkeUnderOppfolging = !oppfolgingData?.underOppfolging;
    const venterPaSvarDisabled = (!kansendeMelding || dialog.historisk) && !burdeKunneFjerneVenterPaSvar;
    const ferdigBehandletDisabled = (!kansendeMelding || dialog.historisk) && !burdeKunneSetteFerdigBehandlet;

    const values = [
        !dialog.ferdigBehandlet ? ('ferdigBehandlet' as const) : undefined,
        dialog.venterPaSvar ? ('venterPaSvar' as const) : undefined
    ].filter(notEmpty);

    const laster = dialogContext.status === Status.PENDING || dialogContext.status === Status.RELOADING;

    return (
        <DialogCheckboxes
            values={values}
            ferdigBehandletDisabled={ferdigBehandletDisabled}
            venterPaSvarDisabled={venterPaSvarDisabled}
            loading={laster}
            toggleFerdigBehandlet={toggleFerdigBehandlet}
            toggleVenterPaSvar={toggleVenterPaSvar}
            ferdigBehandlet={dialog.ferdigBehandlet}
            venterPaSvar={dialog.venterPaSvar}
        />
    );
};

export default ManagedDialogCheckboxes;

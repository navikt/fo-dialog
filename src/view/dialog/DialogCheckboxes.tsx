import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { Status } from '../../api/typer';
import { notEmpty } from '../../utils/TypeHelper';
import { useDialogContext } from '../DialogProvider';
import { useFnrContext } from '../Provider';
import { useUserInfoContext } from '../BrukerProvider';
import { useHentDialoger } from '../dialogProvider/dialogStore';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { DialogData } from '../../utils/Typer';

interface Props {
    toggleFerdigBehandlet(ferdigBehandler: boolean): void;

    toggleVenterPaSvar(venterPaSvar: boolean): void;

    ferdigBehandlet: boolean;
    venterPaSvar: boolean;
    ferdigBehandletDisabled: boolean;
    venterPaSvarDisabled: boolean;
    values: ('ferdigBehandlet' | 'venterPaSvar')[];
    loading: boolean;
    isNyopprettet: boolean;
}

export const DialogCheckboxes = ({
    values,
    ferdigBehandlet,
    toggleFerdigBehandlet,
    toggleVenterPaSvar,
    loading,
    venterPaSvar,
    venterPaSvarDisabled,
    ferdigBehandletDisabled,
    isNyopprettet
}: Props) => {
    return (
        <div className="mb-2 pl-1">
            <CheckboxGroup legend={'Filter'} hideLegend value={values}>
                <div className="flex">
                    {!isNyopprettet && (
                        <Checkbox
                            value={'ferdigBehandlet'}
                            size="small"
                            className="pr-4"
                            disabled={ferdigBehandletDisabled || loading}
                            onChange={() => toggleFerdigBehandlet(!ferdigBehandlet)}
                        >
                            Venter på svar fra Nav
                        </Checkbox>
                    )}
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

export const ManagedDialogCheckboxes = ({ dialog }: { dialog: DialogData }) => {
    const visible = useUserInfoContext()?.erVeileder || false;
    const fnr = useFnrContext();
    const hentDialoger = useHentDialoger();
    const dialogContext = useDialogContext();
    const erNyopprettetDialogTrad = dialog == undefined;

    const toggleFerdigBehandlet = (ferdigBehandlet: boolean) => {
        !erNyopprettetDialogTrad &&
            dialogContext.setFerdigBehandlet(dialog, ferdigBehandlet).then(() => hentDialoger(fnr));
    };
    const toggleVenterPaSvar = (venterPaSvar: boolean) => {
        !erNyopprettetDialogTrad && dialogContext.setVenterPaSvar(dialog, venterPaSvar).then(() => hentDialoger(fnr));
    };

    const kansendeMelding = useKansendeMelding();
    const burdeKunneSetteFerdigBehandlet = !erNyopprettetDialogTrad && !dialog.ferdigBehandlet && !kansendeMelding;
    const burdeKunneFjerneVenterPaSvar = !erNyopprettetDialogTrad && dialog.venterPaSvar && !kansendeMelding;
    const venterPaSvarDisabled =
        (!kansendeMelding || (!erNyopprettetDialogTrad && dialog.historisk)) && !burdeKunneFjerneVenterPaSvar;
    const ferdigBehandletDisabled =
        (!kansendeMelding || (!erNyopprettetDialogTrad && dialog.historisk)) && !burdeKunneSetteFerdigBehandlet;

    const values = [
        !erNyopprettetDialogTrad && !dialog.ferdigBehandlet ? ('ferdigBehandlet' as const) : undefined,
        !erNyopprettetDialogTrad && dialog.venterPaSvar ? ('venterPaSvar' as const) : undefined
    ].filter(notEmpty);

    const laster = dialogContext.status === Status.PENDING || dialogContext.status === Status.RELOADING;

    if (!visible) return null;
    return (
        <DialogCheckboxes
            values={values}
            ferdigBehandletDisabled={ferdigBehandletDisabled}
            venterPaSvarDisabled={venterPaSvarDisabled}
            loading={laster}
            toggleFerdigBehandlet={toggleFerdigBehandlet}
            toggleVenterPaSvar={toggleVenterPaSvar}
            ferdigBehandlet={dialog ? dialog.ferdigBehandlet : false}
            venterPaSvar={dialog ? dialog.venterPaSvar : false}
            isNyopprettet={erNyopprettetDialogTrad}
        />
    );
};

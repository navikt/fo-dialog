import React, { FormEvent, useState } from 'react';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import HenvendelseInput from '../component/HenvendelseInput';
import { fetchData } from '../utils/fetch';
import { useDialogContext, useUserInfoContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { hasData } from '@nutgaard/use-fetch';

interface Props extends RouteComponentProps<{ dialogId?: string }> {
    dialog: DialogData;
}

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const dialoger = useDialogContext();
    const melding = useFieldState('', validerMelding);
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog ? valgtDialog.ferdigBehandlet : true);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog ? valgtDialog.venterPaSvar : false);

    const toggleFerdigBehandlet = (nyFerdigBehandletVerdi: boolean) => {
        setFerdigBehandlet(nyFerdigBehandletVerdi);
        fetchData<DialogData>(
            `/veilarbdialog/api/dialog/${valgtDialog!.id}/ferdigbehandlet/${nyFerdigBehandletVerdi}`,
            {
                method: 'put'
            }
        );
        dialoger.rerun();
    };
    const toggleVenterPaSvar = (nyVenterPaSvarVerdi: boolean) => {
        setVenterPaSvar(nyVenterPaSvarVerdi);
        fetchData<DialogData>(`/veilarbdialog/api/dialog/${valgtDialog!.id}/venter_pa_svar/${nyVenterPaSvarVerdi}`, {
            method: 'put'
        });
        dialoger.rerun();
    };

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        melding.validate();
        var dialg: DialogData = props.dialog;
        if (melding.input.feil === undefined) {
            const body = JSON.stringify({
                tekst: melding.input.value,
                dialogId: dialg.id,
                overskrift: dialg.overskrift
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'POST', body }).then(
                function(response) {
                    melding.setValue('');
                    console.log('Posted endret dialog!', response);
                    dialoger.rerun();
                    props.history.push('/' + response.id);
                },
                function(error) {
                    console.log('Failed posting endret dialog!', error);
                    //TODO inform with a user friendly message
                }
            );
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <HenvendelseInput melding={melding} />
            </form>
            <DialogCheckboxesVisible
                toggleFerdigBehandlet={toggleFerdigBehandlet}
                toggleVenterPaSvar={toggleVenterPaSvar}
                ferdigBehandlet={ferdigBehandlet}
                venterPaSvar={venterPaSvar}
                visible={bruker!.erVeileder}
            />
        </>
    );
}
const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);

export default withRouter(DialogInputBoxVisible);

import React, { FormEvent, useState } from 'react';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import HenvendelseInput from '../component/HenvendelseInput';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import DialogMarkor from './DialogMarkor';

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
    const dialoger = useDialogContext();
    const melding = useFieldState('', validerMelding);
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialoger.data!.find(dialog => dialog.id === dialogId);

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog ? valgtDialog.ferdigBehandlet : false);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog ? valgtDialog.venterPaSvar : false);

    const toggleFerdigBehandlet = (update: boolean) => {
        setFerdigBehandlet(update);
        fetchData<DialogData>(`/veilarbdialog/api/dialog/${valgtDialog!.id}/ferdigbehandlet/${ferdigBehandlet}`, {
            method: 'put'
        });
    };
    const toggleVenterPaSvar = (update: boolean) => {
        setVenterPaSvar(update);
        fetchData<DialogData>(`/veilarbdialog/api/dialog/${valgtDialog!.id}/venter_pa_svar/${venterPaSvar}`, {
            method: 'put'
        });
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
                    dialoger.refetch();
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
            <DialogMarkor
                toggleFerdigBehandlet={toggleFerdigBehandlet}
                toggleVenterPaSvar={toggleVenterPaSvar}
                ferdigBehandlet={ferdigBehandlet}
                venterPaSvar={venterPaSvar}
            />
        </>
    );
}
const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);

export default withRouter(DialogInputBoxVisible);

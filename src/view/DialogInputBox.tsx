import React, { FormEvent } from 'react';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import HenvendelseInput from '../component/HenvendelseInput';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps<{}> {}

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

interface Props {
    dialog: DialogData;
}

export function DialogInputBox(props: Props) {
    const dialoger = useDialogContext();
    const melding = useFieldState('', validerMelding);

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
        <form onSubmit={handleSubmit} noValidate>
            <HenvendelseInput melding={melding} />
        </form>
    );
}
const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);

export default withRouter(DialogInputBoxVisible);

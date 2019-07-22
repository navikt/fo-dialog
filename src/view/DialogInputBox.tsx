import React, { FormEvent } from 'react';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import HenvendelseInput from '../component/HenvendelseInput';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

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
    var submitfeil: boolean = false;

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
                    submitfeil = true;
                }
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <HenvendelseInput melding={melding} />
            <AlertStripeFeilVisible visible={submitfeil}>
                Det skjedde en alvorlig feil. Prøv igjen senere
            </AlertStripeFeilVisible>
        </form>
    );
}
const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);
const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

export default withRouter(DialogInputBoxVisible);

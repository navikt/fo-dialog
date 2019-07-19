import React, { FormEvent, useEffect, useState } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import useFieldState from '../utils/useFieldState';
import { DialogData, NyDialogMeldingData } from '../utils/typer';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import HenvendelseInput from '../component/HenvendelseInput';

import './dialognew.less';
import './Dialog.less';

interface Props extends RouteComponentProps<{}> {}

function validerTema(tema: string): string | null {
    if (tema.trim().length === 0) {
        return 'Tema må ha innhold.';
    } else {
        return null;
    }
}
function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

export function useNyDialogFormstatus(): String[] {
    const [NyDialogFormIsValid, setNyDialogFormValid] = useState();
    useEffect(() => {
        function validerNyDialog(nyDialogData: NyDialogMeldingData): String[] {
            var formErrors: String[] = [];
            var temaError = nyDialogData.overskrift === undefined ? null : validerTema(nyDialogData.overskrift);
            var meldingError = validerMelding(nyDialogData.tekst);
            if (temaError !== null) {
                formErrors.push(temaError);
            }
            if (meldingError !== null) {
                formErrors.push(meldingError);
            }
            if (formErrors.length === 0 && temaError === null && meldingError === null) {
                setNyDialogFormValid(['']);
            } else {
                setNyDialogFormValid(formErrors);
            }
            return formErrors;
        }
    });
    return NyDialogFormIsValid;
}

function DialogNew(props: Props) {
    const tema = useFieldState('', validerTema);
    const melding = useFieldState('', validerMelding);
    const dialoger = useDialogContext();
    const [NyDialogFormIsValid, setNyDialogFormValid] = useState();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        tema.validate();
        melding.validate();
        if (tema.input.feil === undefined && melding.input.feil === undefined) {
            const body = JSON.stringify({
                overskrift: tema.input.value,
                tekst: melding.input.value
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'post', body }).then(
                function(response) {
                    console.log('Posted the new dialog!', response);
                    dialoger.refetch();
                    props.history.push('/' + response.id);
                },
                function(error) {
                    console.log('Failed posting the new dialog!', error);
                    setNyDialogFormValid(['Failed establishing the new dialog!']);
                }
            );
        }
    }

    return (
        <div className="dialog-new">
            <form onSubmit={handleSubmit} noValidate>
                <Innholdstittel className="dialog-new__tittel">Ny Dialog</Innholdstittel>
                <Normaltekst className="dialog-new__infotekst">
                    Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.
                </Normaltekst>
                <Input className="dialog-new__temafelt" label={'Tema:'} placeholder="Skriv her" {...tema.input} />
                <HenvendelseInput melding={melding} />
            </form>
        </div>
    );
}

export default withRouter(DialogNew);

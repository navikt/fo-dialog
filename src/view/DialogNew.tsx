import React, { FormEvent } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { fetchData } from '../utils/fetch';
import {useDialogContext} from "../Context";
import {RouteComponentProps, withRouter} from "react-router";

import './Dialog.less';

interface Props extends RouteComponentProps<{  }> {}

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

function DialogNew(props:Props) {
    const tema = useFieldState('', validerTema);
    const melding = useFieldState('', validerMelding);
    const dialoger = useDialogContext();

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
                    props.history.push("/"+response.id);
                },
                function(error) {
                    console.log('Failed posting the new dialog!', error);
                    //TODO inform with a user friendly message
                }
            );
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <Innholdstittel>Ny Dialog</Innholdstittel>
                <Normaltekst>
                    Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.
                </Normaltekst>
                <Input label={'Hva er tema for dialogen?'} placeholder="Skriv her" {...tema.input} />
                <div className="skriv-melding">
                    <Textarea
                        label="Skriv en melding til brukeren"
                        placeholder="Skriv her"
                        {...melding.input}
                        // TODO Lag PR til nav-frontend som fikser textarea sin onChange. Burde bruke `React.ChangeEvent` fremfor dagens `React.SyntheticEvent`.
                        onChange={melding.input.onChange as any}
                    />
                    <Hovedknapp htmlType={'submit'} title="Send">
                        Send
                    </Hovedknapp>
                </div>
            </form>
        </>
    );
}

export default withRouter(DialogNew);
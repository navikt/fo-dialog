import React, { FormEvent } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import { fetchData } from '../utils/fetch';

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

function defaultTellerTekst(antallTegn: number, maxLength: number): React.ReactNode {
    const difference = antallTegn - maxLength;
    const remainingLetters = maxLength - antallTegn;

    if (remainingLetters > 1000) {
        return null;
    }

    const ariaAttrs: any = {};
    if (antallTegn > maxLength) {
        ariaAttrs['aria-live'] = 'assertive';
        return <span {...ariaAttrs}>Du har {difference} tegn for mye</span>;
    }
    if (remainingLetters === 5 || remainingLetters === 10 || remainingLetters === 0) {
        ariaAttrs['aria-live'] = 'polite';
    }
    return <span {...ariaAttrs}>Du har {remainingLetters} tegn igjen</span>;
}

interface Props {
    dialog: DialogData;
}

export function DialogInputBox(props: Props) {
    const melding = useFieldState('', validerMelding);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        melding.validate();
        var dialg: DialogData = props.dialog;
        if (melding.input.feil === undefined) {
            const body = JSON.stringify({
                tekst: melding.input.value,
                overskrift: dialg.overskrift
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'POST', body }).then(
                function(response) {
                    console.log('Posted endret dialog!', response);
                    //TODO refresh page with the changed dialog
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
            <div className="skriv-melding">
                <Textarea
                    label="Skriv en melding om arbeid og oppfølging"
                    placeholder="Skriv en melding om arbeid og oppfølging"
                    textareaClass="meldingsfelt"
                    id="meldingIn"
                    name="NyMelding"
                    {...melding.input}
                    onChange={melding.input.onChange as any}
                    maxLength={5000}
                    tellerTekst={defaultTellerTekst}
                />
                <Hovedknapp
                    htmlType={"submit"}
                    title="Send"
                >Send
                </Hovedknapp>
            </div>
        </form>

    )
}

export const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);


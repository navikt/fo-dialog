import React, { FormEvent } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import { DialogMarkor } from './DialogMarkor';

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
            fetch('/veilarbdialog/api/dialog/ny', {
                method: 'POST',
                body: JSON.stringify({
                    tekst: melding.input.value,
                    dialogId: dialg.id,
                    overskrift: dialg.overskrift
                })
            });
        }
    }

    return (
        <>
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
                    <Hovedknapp htmlType={'submit'} title="Send">
                        Send
                    </Hovedknapp>
                </div>
            </form>
            <DialogMarkor dialog={props.dialog} />
        </>
    );
}

export const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);

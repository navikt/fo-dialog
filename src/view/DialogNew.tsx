import React, {FormEvent} from "react";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Input, Textarea} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import useFieldState from "../utils/useFieldState";

import './Dialog.less';

function validerMelding(melding: string): string | null {
    if (melding.length === 0) {
        return "Melding må ha innhold.";
    } else if (melding.length < 10) {
        return "Meldingen må være lengre enn 10 tegn.";
    } else {
        return null;
    }
}

export function DialogNew() {
    const tema = useFieldState('', value => {
        return value.length === 0 ? 'Tema må ha innhold.' : null;
    });
    const melding = useFieldState('', validerMelding);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        tema.validate();
        melding.validate();

        if (tema.input.feil || melding.input.feil) {
            console.log('Det skjedde en feil', tema, melding);
        } else {
            console.log("Submitted Succesfully", {tema: tema.input.value, melding: melding.input.value});
        }
    }


    return (<>
        <form onSubmit={handleSubmit} noValidate>
            <Innholdstittel>Ny Dialog</Innholdstittel>
            <Normaltekst>Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få
                svar i løpet av noen dager.</Normaltekst>
            <Input
                label={'Hva er tema for dialogen?'}
                placeholder="Skriv her"
                {...tema.input}
            />
            <div className="skriv-melding">
                <Textarea
                    label='Skriv en melding til brukeren'
                    placeholder="Skriv her"
                    {...melding.input}
                    // TODO Lag PR til nav-frontend som fikser textarea sin onChange. Burde bruke `React.ChangeEvent` fremfor dagens `React.SyntheticEvent`.
                    onChange={melding.input.onChange as any}
                />
                <Hovedknapp
                    htmlType={"submit"}
                    title="Send"
                >
                    Send
                </Hovedknapp>
            </div>
        </form>
    </>);
}

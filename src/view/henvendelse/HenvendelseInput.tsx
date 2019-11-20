import React from 'react';
import Textarea from '../../felleskomponenter/textarea/Textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FieldState } from '../../utils/UseFieldState';

interface Props {
    melding: FieldState;
    submitting: boolean;
}

function defaultTellerTekst(antallTegn: number, maxLength: number) {
    const difference = maxLength - antallTegn;

    if (difference > 1000) {
        return null;
    }

    return (
        <span aria-live="polite">
            {difference >= 0 && `Du har ${difference} tegn igjen`}
            {difference < 0 && `Du har ${Math.abs(difference)} tegn for mye`}
        </span>
    );
}

function HenvendelseInput(props: Props) {
    return (
        <div className="skriv-melding">
            <Textarea
                label="Skriv en melding om arbeid og oppfølging"
                placeholder="Skriv en melding om arbeid og oppfølging"
                textareaClass="autosizing-textarea"
                id="meldingIn"
                name="NyMelding"
                {...props.melding.input}
                onChange={props.melding.input.onChange as any}
                maxLength={5000}
                tellerTekst={defaultTellerTekst}
                disabled={props.submitting}
            />
            <Hovedknapp title="Send" autoDisableVedSpinner spinner={props.submitting}>
                Send
            </Hovedknapp>
        </div>
    );
}

export default HenvendelseInput;

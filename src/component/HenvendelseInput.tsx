import React from 'react';
import Textarea from './nav-frontend-textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FieldState } from '../utils/useFieldState';

interface Props {
    melding: FieldState;
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

function HenvendelseInput(props: Props) {
    return (
        <div className="skriv-melding">
            <Textarea
                label="Skriv en melding om arbeid og oppfølging"
                placeholder="Skriv en melding om arbeid og oppfølging"
                textareaClass="meldingsfelt"
                id="meldingIn"
                name="NyMelding"
                {...props.melding.input}
                onChange={props.melding.input.onChange as any}
                maxLength={5000}
                tellerTekst={defaultTellerTekst}
            />
            <Hovedknapp htmlType={'submit'} title="Send">
                Send
            </Hovedknapp>
        </div>
    );
}

export default HenvendelseInput;

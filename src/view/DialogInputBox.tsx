import React, {useState} from "react";
import {Textarea} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {visibleIfHoc} from "../component/hoc/visibleIfHoc";

function sendeNyMelding (props: { tekst: string }) {
    console.log(props);
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

export function DialogInputBox(){
    const [value, setValue] =  useState('');

    return (
        <div className="skriv-melding" >
            <Textarea
                label='Skriv en melding om arbeid og oppfølging'
                placeholder="Skriv en melding om arbeid og oppfølging"
                textareaClass='meldingsfelt'
                id='meldingIn'
                name='NyMelding'
                onChange={(event) => setValue((event.target as HTMLInputElement).value)}
                value={value}
                maxLength={5000}
                tellerTekst={defaultTellerTekst}
            />
            <Hovedknapp
                title="Send"
                onClick={() => sendeNyMelding({tekst: value})}
            >Send
            </Hovedknapp>
        </div>
    )
}

export const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);



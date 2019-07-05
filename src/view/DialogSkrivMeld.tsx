import React, {useState} from "react";
import {Textarea} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";

function sendeNyMelding (props: { tekst: string }) {
    console.log(props);
}

export function DialogSkrivMeld(){
    const [value, setValue] =  useState('');

    return (
        <div className="skriv-melding" >
            <Textarea
                label='Skriv en melding til brukeren'
                placeholder="Skriv her .."
                textareaClass='meldingsfelt'
                id='meldingIn'
                name='NyMelding'
                onChange={(event) => setValue((event.target as HTMLInputElement).value)}
                value={value} />
            <Hovedknapp
                title="Send"
                onClick={() => sendeNyMelding({tekst: value})}
            >Send
            </Hovedknapp>
        </div>
    )
}



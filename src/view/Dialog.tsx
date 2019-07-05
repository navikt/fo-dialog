import React, {useState} from "react";
import {DialogData} from "../utils/typer";
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import {HoyreChevron} from "nav-frontend-chevron";
import {Checkbox, Textarea} from "nav-frontend-skjema";
import {HenvendelseList} from "./HenvendelseList";
import {Hovedknapp} from "nav-frontend-knapper";

import './Dialog.less';

interface Props {
    dialog: DialogData | null;
}

export function Dialog(props: Props) {
    const [value, setValue] =  useState('');

    if (props.dialog !== null) {
        return (
            <div className="dialog">
                <Lenke href="/dialog">
                    <Undertittel>
                        Aktivitet: {props.dialog.aktivitetId}
                        <HoyreChevron/>
                    </Undertittel>
                </Lenke>
                <div className="checkbox-block">
                    <Checkbox
                        label='Venter på svar fra NAV'
                        checked={!props.dialog.venterPaSvar}
                        className="checkbox-block__item"
                    />
                    <Checkbox
                        label='Venter på svar fra bruker'
                        checked={props.dialog.venterPaSvar}
                        className="checkbox-block__item"
                    />
                </div>

                <HenvendelseList henvendelseDataList={props.dialog.henvendelser}/>

                <div className="skriv-melding">
                    <Textarea
                        label='Skriv en melding til brukeren'
                        placeholder="Skriv her .."
                        textareaClass='meldingsfelt'
                        id='meldingIn'
                        name='NyMelding'
                        onChange={(event) => setValue((event.target as HTMLInputElement).value)}
                        value={value}
                    />
                    <Hovedknapp title="Send"
                                onClick={() => sendeNyMelding({tekst: value})}
                    >Send</Hovedknapp>
                </div>
            </div>)
    } else {
        return (
            <div className="dialog">
                <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
            </div>
        )

    }
}

function sendeNyMelding (props: { tekst: string }) {
    console.log(props);
}
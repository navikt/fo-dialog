import React, {useState} from "react";
import {DialogData} from "../utils/typer";
import Lenke from "nav-frontend-lenker";
import {Undertittel} from "nav-frontend-typografi";
import {HoyreChevron} from "nav-frontend-chevron";
import {Checkbox, Textarea} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {HenvendelseList} from "./HenvendelseList";
import './Dialog.less';

interface Props {
    dialog: DialogData;
}

export function Showdialog(props: Props) {
    const [value, setValue] =  useState('');

    return <div className="arbeidsrettet__dialog--detail">
        <div className="arbeidsrettet__dialog--top">
            <Lenke href="/dialog">
                <Undertittel>
                    Aktivitet: {props.dialog.aktivitetId}
                    <HoyreChevron stor type={'høyre'}/>
                </Undertittel>
            </Lenke>
            <div className="arbeidsrettet__dialog--venter-pa">
                <div className="arbeidsrettet__dialog--venter-pa-item">
                    <Checkbox
                        id='navHarBallen'
                        label='Venter på svar fra NAV'
                        checked={!props.dialog.venterPaSvar}
                        className="arbeidsrettet__dialog--venter-pa-item-checkbox"
                    />
                </div>
                <div className="arbeidsrettet__dialog--venter-pa-item">
                    <Checkbox
                        id='brukerHarBallen'
                        label='Venter på svar fra bruker'
                        checked={props.dialog.venterPaSvar}
                        className="arbeidsrettet__dialog--venter-pa-item-checkbox"
                    />
                </div>
            </div>

        <div className="arbeidsrettet__dialog--henvendelseList"> {props.dialog.henvendelser === undefined? null :<HenvendelseList henvendelseDataList={props.dialog.henvendelser}/>}</div>

        <div className="arbeidsrettet__dialog--skriv-melding">
            <Textarea
                label='Skriv en melding til brukeren'
                placeholder="Skriv her .."
                textareaClass='arbeidsrettet__dialog--meldingsfelt'
                id='meldingIn'
                name='NyMelding'
                onChange={(event) => setValue((event.target as HTMLInputElement).value)}
                value={value}
            />
            <Hovedknapp title="Send"
                        onClick={() => sendeNyMelding({tekst: value})}
            >Send</Hovedknapp>
        </div>
    </div>

</div>
}

function sendeNyMelding (props: { tekst: string }) {
    console.log(props);
}

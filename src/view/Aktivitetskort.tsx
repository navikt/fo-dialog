import React from 'react';
import {DialogData} from "../utils/typer";
import {Normaltekst} from "nav-frontend-typografi";

interface Props {
    dialog: DialogData | null;
}

export function Aktivitetskort(props: Props) {
    if (props.dialog){
        return (
            <div className="aktivitetkort">
                <Normaltekst>
                    Aktivitet: {props.dialog.aktivitetId}   Frist: 24.12.  Arbeidsgiver: Julenissen
                </Normaltekst>
            </div>)
    }
    return null
}
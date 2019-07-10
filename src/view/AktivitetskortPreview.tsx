import React from "react";
import {DialogData} from "../utils/typer";
import {Normaltekst} from "nav-frontend-typografi";


interface Props {
    dialog: DialogData | null;
}

export function AktivitetskortPreview(props: Props) {
    if (props.dialog){
        return (
            <div className="dialog__aktivitetskortpreview">
            <Normaltekst>
                Aktivitet: {props.dialog.aktivitetId}   Frist: 24.12.  Arbeidsgiver: Julenissen
            </Normaltekst>
            </div>)
    }
    return null
}
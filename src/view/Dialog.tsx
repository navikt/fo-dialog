import React from "react";
import './Dialog.less';
import {DialogData} from "../utils/typer";
import {Innholdstittel} from "nav-frontend-typografi";
import {Showdialog} from "./Showdialog";

interface Props {
    dialog: DialogData | null;
}

export function Dialog(props: Props) {
    if (props.dialog !== null) {
        return (
            <Showdialog dialog={props.dialog}/>
        )
    } else {
        return (
            <div className="dialog">
                <div className="dialog-top">
                    <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
                </div>
            </div>
        )

    }
}

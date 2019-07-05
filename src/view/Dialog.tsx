import React from "react";
import {DialogData} from "../utils/typer";
import {Innholdstittel} from "nav-frontend-typografi";
import {HenvendelseList} from "./HenvendelseList";
import {DialogCheckboxes} from "./DialogCheckboxes";
import {DialogSkrivMeld} from "./DialogSkrivMeld";

import './Dialog.less';

interface Props {
    dialog: DialogData | null;
}

export function Dialog(props: Props) {
    if (props.dialog !== null) {
        return (
            <div className="dialog">
                <DialogCheckboxes dialog={props.dialog}/>
                <HenvendelseList henvendelseDataList={props.dialog.henvendelser}/>
                <DialogSkrivMeld/>
            </div>)
    } else {
        return (
            <div className="dialog">
                <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
            </div>
        )
    }
}

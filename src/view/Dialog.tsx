import React from "react";
import {DialogData} from "../utils/typer";
import {Innholdstittel} from "nav-frontend-typografi";
import {HenvendelseList} from "./HenvendelseList";
import {DialogHeader} from "./DialogHeader";
import {DialogInputBox} from "./DialogInputBox";

import './Dialog.less';

interface Props {
    dialog: DialogData | null;
}

export function Dialog(props: Props) {
    if (props.dialog !== null) {
        return (
            <div className="dialog">
                <DialogHeader dialog={props.dialog}/>
                <HenvendelseList henvendelseDataList={props.dialog.henvendelser}/>
                <DialogInputBox/>
            </div>)
    } else {
        return (
            <div className="dialog">
                <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
            </div>
        )
    }
}

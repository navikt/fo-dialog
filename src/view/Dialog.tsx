import React from "react";
import {DialogData} from "../utils/typer";
import {Innholdstittel} from "nav-frontend-typografi";
import {HenvendelseList} from "./HenvendelseList";
import {DialogInputBox} from "./DialogInputBox";

import './Dialog.less';

import {visibleIfHoc} from "../component/hoc/visibleIfHoc";
import {useOppfolgingContext} from "../Context";
import {DialogHeader} from "./DialogHeader";

interface Props {
    dialog: DialogData | null;
}

const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);

export function Dialog(props: Props) {
    const oppfolgingData = useOppfolgingContext();

    if (props.dialog !== null) {
        return (
            <div className="dialog">
                <DialogHeader dialog={props.dialog}/>
                <HenvendelseList henvendelseDataList={props.dialog.henvendelser}/>
                <DialogInputBoxVisible visible={oppfolgingData!.underOppfolging}/>
            </div>)
    } else {
        return (
            <div className="dialog">
                <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
            </div>
        )
    }
}

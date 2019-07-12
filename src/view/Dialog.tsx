import React from "react";
import {DialogData} from "../utils/typer";

import {HenvendelseList} from "./HenvendelseList";
import {DialogHeader} from "./DialogHeader";
import {DialogInputBoxVisible} from "./DialogInputBox";
import {useOppfolgingContext} from "../Context";
import './Dialog.less';
import {RouteComponentProps, withRouter} from "react-router";
import {Aktivitetskort} from "./Aktivitetskort";
import {AktivitetskortPreview} from "./AktivitetskortPreview";
import {Innholdstittel} from "nav-frontend-typografi";

interface Props extends RouteComponentProps<{ dialogId?: string; }> {
    dialogData: DialogData[];
}

function Dialog(props: Props) {

    const oppfolgingData = useOppfolgingContext();
    const dialogId = props.match.params.dialogId;
    const valgtDialog = props.dialogData.find((dialog) => dialog.id === dialogId);

    if (!valgtDialog) {
        return (
            <div className="dialog">
                <Innholdstittel> Ingen Valgt Dialog</Innholdstittel>
            </div>
        );
    }

    return (
        <>
            <div className="dialog">
                <AktivitetskortPreview dialog={valgtDialog}/>
                <DialogHeader dialog={valgtDialog}/>
                <HenvendelseList henvendelseDataList={valgtDialog.henvendelser}/>
                <DialogInputBoxVisible  dialog={valgtDialog} visible={oppfolgingData!.underOppfolging}/>
            </div>
            <Aktivitetskort dialog={valgtDialog}/>
        </>
    );
}

export default withRouter(Dialog);